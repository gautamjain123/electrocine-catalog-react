/* ============================================================================
   SEO — one source of truth for every page's search and share metadata.

   Used twice:
     1. at runtime (applySeo) — keeps <head> correct as the visitor navigates;
     2. at build time (scripts/seo-pages.mjs) — writes a static HTML file per
        route with these tags already in it, so crawlers and link previews
        (WhatsApp, LinkedIn, X) see the right title, description and image
        without running JavaScript.
   Change SITE_URL if the site is deployed somewhere else.
   ========================================================================= */

export const SITE_URL = 'https://www.electrocineindustries.com';
export const SITE_NAME = 'Electrocine Industries';
export const DEFAULT_IMAGE = '/ig/post-spark-post-top.jpg'; // 1024×1360, a real product poster
export const LOGO_URL = '/uploads/logo_assets-1785825947280.png';

export const ROUTES = {
  '/': {
    title: 'Electrocine Industries — LED Lights Manufacturer in India | Panels, Street & Flood Lights',
    description:
      'Indian manufacturer of LED luminaires: panel lights, battens, downlights, street and flood lights, landscape and decorative fittings. Declared lumen, efficacy (>130 lm/W) and IP ratings, BIS registered. Request a price list.',
    image: DEFAULT_IMAGE,
    breadcrumb: null,
  },
  '/products': {
    title: 'LED Lighting Products & Price List — Panels, Street, Flood, Landscape | Electrocine',
    description:
      'Browse 140+ LED lighting SKUs from Electrocine Industries — panel lights, battens, COB downlights, street lights, flood lights, high bays, bollards and post-top lanterns — with wattage, lumens, size and ex-works price.',
    image: DEFAULT_IMAGE,
    breadcrumb: 'Products',
  },
  '/about': {
    title: 'About Electrocine Industries — Indian LED Luminaire Manufacturer',
    description:
      'Electrocine Industries designs, builds and documents LED luminaires in India: die-cast and CRCA bodies, named LED and driver components, and spec sheets that match the test report.',
    image: DEFAULT_IMAGE,
    breadcrumb: 'Company',
  },
  '/contact': {
    title: 'Request an LED Lighting Quotation — Electrocine Industries',
    description:
      'Send wattages, quantities and delivery location for a stamped LED lighting price list. Distributor, dealer and government tender enquiries answered within one working day.',
    image: DEFAULT_IMAGE,
    breadcrumb: 'Contact',
  },
};

export const NOT_FOUND = {
  title: 'Page not found — Electrocine Industries',
  description: 'The page you were looking for is not in the Electrocine catalogue.',
  image: DEFAULT_IMAGE,
  noindex: true,
};

export const abs = (path) => (path.startsWith('http') ? path : SITE_URL + (path.startsWith('/') ? path : '/' + path));

/* Structured data (schema.org) */
export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: 'Electrocine',
  url: SITE_URL + '/',
  logo: abs(LOGO_URL),
  description: 'Manufacturer of LED luminaires in India — panels, battens, downlights, street and flood, landscape and decorative lighting.',
  email: 'electrocine_hk@yahoo.co.in',
  sameAs: ['https://www.instagram.com/electrocine/'],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: '+91-99997-15850',
      email: 'electrocine_hk@yahoo.co.in',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  ],
});

export const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL + '/',
  inLanguage: 'en-IN',
  publisher: { '@id': `${SITE_URL}/#organization` },
});

export const breadcrumbLd = (path, label) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' },
    { '@type': 'ListItem', position: 2, name: label, item: abs(path) },
  ],
});

/* Product list for /products. Offers only where the catalogue carries a real
   rupee price — "P.O.R" items are listed without one rather than invented. */
export const productListLd = (models) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Electrocine LED Lighting Series',
  numberOfItems: models.length,
  itemListElement: models.map((m, i) => {
    const priced = m.variants.map((v) => parseInt(String(v.price).replace(/[^\d]/g, ''), 10)).filter((n) => Number.isFinite(n) && n > 0);
    const product = {
      '@type': 'Product',
      name: m.name,
      image: abs(m.img),
      brand: { '@type': 'Brand', name: 'Electrocine' },
      manufacturer: { '@id': `${SITE_URL}/#organization` },
      category: m.catName,
      sku: m.variants[0].code,
      description: `${m.name} — ${m.variants.map((v) => `${v.watt} W`).join(', ')}${m.variants[0].ip ? `, ${m.variants[0].ip}` : ''}.`,
    };
    if (priced.length) {
      product.offers = {
        '@type': 'AggregateOffer',
        priceCurrency: 'INR',
        lowPrice: Math.min(...priced),
        highPrice: Math.max(...priced),
        offerCount: priced.length,
        availability: 'https://schema.org/InStock',
      };
    }
    return { '@type': 'ListItem', position: i + 1, item: product };
  }),
});

/* ── runtime ── */
function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}
function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}
function setJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function applySeo(pathname, extraLd) {
  const known = ROUTES[pathname];
  const meta = known || NOT_FOUND;
  const url = abs(pathname === '/' ? '/' : pathname);
  document.title = meta.title;
  setMeta('name', 'description', meta.description);
  setMeta('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
  setLink('canonical', url);
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', SITE_NAME);
  setMeta('property', 'og:locale', 'en_IN');
  setMeta('property', 'og:title', meta.title);
  setMeta('property', 'og:description', meta.description);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:image', abs(meta.image));
  setMeta('property', 'og:image:alt', 'Electrocine LED lighting');
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', meta.title);
  setMeta('name', 'twitter:description', meta.description);
  setMeta('name', 'twitter:image', abs(meta.image));
  setJsonLd('ld-breadcrumb', known?.breadcrumb ? breadcrumbLd(pathname, known.breadcrumb) : null);
  setJsonLd('ld-page', extraLd || null);
}
