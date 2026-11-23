// Product imagery extracted from the LED Lighting Series catalogue (w.e.f. July 2024).
//
// Six source plates (p03 slim-recess, p05 tube, p06 backlit-recess, p07 backlit-surface,
// p09 flood, p18 spike, p23 pendant) could not be retrieved from the design project — they
// exceed the asset API's 256 KiB read cap. Each is aliased below to the closest fitting in
// the same family so the catalogue renders complete. Drop the real PNGs into public/cat/
// and point the alias back at its own file to restore them.
//
// Paths point at the enhanced plates in public/cat/hd/ (trimmed, upscaled, sharpened
// and levelled by scripts/enhance-images.py). Re-run that script after adding a PNG.
export const IMG = {
  slimRecess: '/cat/hd/p04.webp', //  ← p03.png (aliased: surface panel)
  surfacePanel: '/cat/hd/p04.webp',
  tube: '/cat/hd/p21.webp', //  ← p05.png (aliased: linear profile)
  backlitRecess: '/cat/hd/p08.webp', //  ← p06.png (aliased: designer backlit panel)
  backlitSurface: '/cat/hd/p08.webp', //  ← p07.png (aliased: designer backlit panel)
  designer: '/cat/hd/p08.webp',
  flood: '/cat/hd/p11.webp', //  ← p09.png (aliased: wall pack)
  street: '/cat/hd/p10.webp',
  wallpack: '/cat/hd/p11.webp',
  inground: '/cat/hd/p12.webp',
  wallBracket: '/cat/hd/p13.webp',
  gateLantern: '/cat/hd/p14.webp',
  postTop: '/cat/hd/p15.webp',
  highbay: '/cat/hd/p16.webp',
  wallWasher: '/cat/hd/p17.webp',
  spike: '/cat/hd/p12.webp', //  ← p18.png (aliased: inground)
  bollard: '/cat/hd/p19.webp',
  bollardDeco: '/cat/hd/p20.webp',
  profile: '/cat/hd/p21.webp',
  profileSusp: '/cat/hd/p22.webp',
  pendant: '/cat/hd/p22.webp', //  ← p23.png (aliased: suspended profile)
  // Real photographs cropped 1:1 (no resampling) from the Instagram posters.
  igMushroom: '/ig/mushroom-bollard.jpg', // 330×820
  igSpark: '/ig/spark-post-top.jpg', // 449×675
};

/* Pixel-true sources: the original catalogue PNG is served to 1x screens, the
   enhanced 2x plate only to high-density screens. Never stretched past native. */
export const origOf = (src) => src.replace('/cat/hd/', '/cat/').replace('.webp', '.png');
export const srcSetOf = (src) => (src.startsWith('/cat/hd/') ? `${origOf(src)} 1x, ${src} 2x` : undefined);

/* Product posters from instagram.com/electrocine, stored byte-for-byte as
   Instagram serves them (its largest size). Shown at or below native width. */
export const INSTAGRAM_URL = 'https://www.instagram.com/electrocine/';
export const INSTAGRAM_POSTS = [
  {
    src: '/ig/post-spark-post-top.jpg',
    w: 1024,
    h: 1360,
    href: 'https://www.instagram.com/p/DcNtVo5xt5d/',
    title: 'Spark — 36 W LED Post Top',
    blurb: 'Swarovski PC diffuser with a diamond-like light pattern, die-cast aluminium base, IP65.',
  },
  {
    src: '/ig/post-mushroom-bollard.jpg',
    w: 1056,
    h: 1296,
    href: 'https://www.instagram.com/p/DcVk-ppRkzA/',
    title: 'Mushroom Bollard — 10 W',
    blurb: '175 × 500 mm, inbuilt mounting plate, Philips driver, IP65.',
  },
  {
    src: '/ig/post-bulkhead-9w.jpg',
    w: 1024,
    h: 1360,
    href: 'https://www.instagram.com/p/DcQJ2I5RbJQ/',
    title: '9 W LED Bulkhead',
    blurb: 'Impact-resistant polycarbonate, surface mounted, IP65 for walls, stairwells and parking.',
  },
];

export const LOGO = '/uploads/logo_assets-1785825947280.png';

export const CONTACT_EMAIL = 'electrocine_hk@yahoo.co.in';

export const CATS = [
  { id: 'panel', name: 'Panel Lights', blurb: 'Recess, surface, backlit and designer panels.', range: '6 W – 80 W' },
  { id: 'batten', name: 'Battens & Linear', blurb: 'Tube fittings, battens, mirror and profile lights.', range: '10 W – 40 W' },
  { id: 'down', name: 'Downlights', blurb: 'Ceiling surface downlights and COB spots.', range: '6 W – 15 W' },
  { id: 'street', name: 'Street & Flood', blurb: 'Roadway, flood and high-bay luminaires.', range: '20 W – 120 W' },
  { id: 'landscape', name: 'Landscape', blurb: 'Inground, spike, bollard and post-top fittings.', range: '9 W – 36 W' },
  { id: 'decor', name: 'Decorative', blurb: 'Pendants, wall brackets and suspended profiles.', range: '12 W – 48 W' },
];

function P(cat, name, code, watt, lumens, dim, price, img, mount, extra) {
  return { cat, name, code, watt, lumens, dim, price, img, mount, ...(extra || {}) };
}

export const PRODUCTS = [
  // Panel — surface panel square/round (catalogue p.02)
  P('panel', '06 W Surface Panel — Square', 'EIL.DVA.SPL.01', 6, '600 Lm', '115×115', '₹1,290', IMG.surfacePanel, 'Surface'),
  P('panel', '09 W Surface Panel — Square', 'EIL.DVA.SPL.02', 9, '900 Lm', '131×131', '₹1,435', IMG.surfacePanel, 'Surface'),
  P('panel', '12 W Surface Panel — Square', 'EIL.DVA.SPL.03', 12, '1200 Lm', '170×170', '₹1,690', IMG.surfacePanel, 'Surface'),
  P('panel', '18 W Surface Panel — Square', 'EIL.DVA.SPL.04', 18, '1800 Lm', '220×220', '₹2,265', IMG.surfacePanel, 'Surface'),
  P('panel', '24 W Surface Panel — Square', 'EIL.DVA.SPL.05', 24, '2400 Lm', '300×300', '₹3,860', IMG.surfacePanel, 'Surface'),
  P('panel', '12 W Surface Panel — Round', 'EIL.DVA.RPL.03', 12, '1200 Lm', 'Ø170', '₹1,690', IMG.surfacePanel, 'Surface'),
  P('panel', '18 W Surface Panel — Round', 'EIL.DVA.RPL.04', 18, '1800 Lm', 'Ø220', '₹2,265', IMG.surfacePanel, 'Surface'),
  P('panel', '09 W Slim Recess Panel — Round', 'EIL.DVA.SRP.02', 9, '900 Lm', 'Ø131', '₹1,395', IMG.slimRecess, 'Recessed'),
  P('panel', '15 W Slim Recess Panel — Round', 'EIL.DVA.SRP.04', 15, '1500 Lm', 'Ø170', '₹1,940', IMG.slimRecess, 'Recessed'),
  P('panel', '22 W Slim Recess Panel — Round', 'EIL.DVA.SRP.06', 22, '2200 Lm', 'Ø225', '₹2,480', IMG.slimRecess, 'Recessed'),
  // Backlit recess
  P('panel', '15 W Backlit Panel — Recess', 'EIL.BLPR.01', 15, '1500 Lm', '300×300', '₹3,610', IMG.backlitRecess, 'Recessed', { cutout: '295×295' }),
  P('panel', '24 W Backlit Panel — Recess', 'EIL.BLPR.04', 24, '2400 Lm', '300×600', '₹4,620', IMG.backlitRecess, 'Recessed', { cutout: '295×595' }),
  P('panel', '25 W Backlit Panel — Recess', 'EIL.BLPR.05', 25, '2500 Lm', '600×600', '₹5,780', IMG.backlitRecess, 'Recessed', { cutout: '595×595' }),
  P('panel', '40 W Backlit Panel — Recess', 'EIL.BLPR.06', 40, '4000 Lm', '600×600', '₹6,670', IMG.backlitRecess, 'Recessed', { cutout: '595×595' }),
  P('panel', '48 W Backlit Panel — Recess', 'EIL.BLPR.07', 48, '4800 Lm', '600×600', '₹8,455', IMG.backlitRecess, 'Recessed', { cutout: '595×595' }),
  P('panel', '48 W Backlit Panel — Recess', 'EIL.BLPR.10', 48, '4800 Lm', '300×1200', '₹8,655', IMG.backlitRecess, 'Recessed', { cutout: '290×1163' }),
  P('panel', '80 W Backlit Panel — Recess', 'EIL.BLPR.12', 80, '8000 Lm', '600×600', 'P.O.R', IMG.backlitRecess, 'Recessed', { cutout: '595×595' }),
  // Backlit surface
  P('panel', '15 W Backlit Panel — Surface', 'EIL.BLPS.01', 15, '1500 Lm', '300×300', '₹3,860', IMG.backlitSurface, 'Surface'),
  P('panel', '25 W Backlit Panel — Surface', 'EIL.BLPS.05', 25, '2500 Lm', '600×600', '₹5,980', IMG.backlitSurface, 'Surface'),
  P('panel', '40 W Backlit Panel — Surface', 'EIL.BLPS.06', 40, '4000 Lm', '600×600', '₹6,870', IMG.backlitSurface, 'Surface'),
  P('panel', '48 W Backlit Panel — Surface', 'EIL.BLPS.10', 48, '4800 Lm', '300×1200', '₹8,810', IMG.backlitSurface, 'Surface'),
  P('panel', '40 W Designer Backlit Panel', 'EIL.DPLR.02', 40, '4000 Lm', '600×600', 'P.O.R', IMG.designer, 'Recessed'),
  P('panel', '48 W Designer Backlit Panel', 'EIL.DPLS.06', 48, '4800 Lm', '600×600', 'P.O.R', IMG.designer, 'Surface'),
  // Battens & linear
  P('batten', '18 W T8 Tube Light', 'EIL.TB.01', 18, '1800 Lm', '1198 mm', '₹1,763', IMG.tube, 'Retrofit', { base: 'T8 retrofit' }),
  P('batten', '24 W T5 Tube Light', 'EIL.TB.02', 24, '2400 Lm', '1198 mm', '₹1,975', IMG.tube, 'Retrofit', { base: 'T8 retrofit' }),
  P('batten', '18 W LED Batten', 'EIL.BT.003', 18, '1800 Lm', '1198 mm', '₹2,179', IMG.tube, 'Surface'),
  P('batten', '36 W LED Batten', 'EIL.BT.004', 36, '3600 Lm', '1200 mm', '₹2,975', IMG.tube, 'Surface'),
  P('batten', '20 W LED Batten', 'EIL.BT.006', 20, '2000 Lm', '590 mm', '₹1,322', IMG.tube, 'Surface'),
  P('batten', '10 W Mirror Light', 'EIL.ML.01', 10, '1000 Lm', '300×75', '₹2,178', IMG.profile, 'Wall'),
  P('batten', '18 W Mirror Light', 'EIL.ML.02', 18, '1800 Lm', '600×75', '₹4,130', IMG.profile, 'Wall'),
  P('batten', '36 W Mirror Light', 'EIL.ML.03', 36, '3600 Lm', '1200×75', 'P.O.R', IMG.profile, 'Wall'),
  P('batten', '24 W Linear Profile', 'EIL.LP.02', 24, '2400 Lm', '1200×50', 'P.O.R', IMG.profileSusp, 'Suspended'),
  // Downlights
  P('down', '06 W Ceiling Surface Downlight', 'EIL.CDL.01', 6, '600 Lm', 'Ø95', '₹2,120', IMG.surfacePanel, 'Surface', { ip: 'IP65' }),
  P('down', '15 W Ceiling Surface Downlight', 'EIL.CDL.02', 15, '1500 Lm', 'Ø150', '₹3,360', IMG.surfacePanel, 'Surface', { ip: 'IP65' }),
  // Street & flood
  P('street', '30 W LED Street Light', 'EIL.SL.30', 30, '3600 Lm', '420×180', 'P.O.R', IMG.street, 'Pole', { ip: 'IP66' }),
  P('street', '60 W LED Street Light', 'EIL.SL.60', 60, '7200 Lm', '540×220', 'P.O.R', IMG.street, 'Pole', { ip: 'IP66' }),
  P('street', '120 W LED Street Light', 'EIL.SL.120', 120, '14400 Lm', '680×260', 'P.O.R', IMG.street, 'Pole', { ip: 'IP66' }),
  P('street', '50 W LED Flood Light', 'EIL.FL.50', 50, '6000 Lm', '260×230', 'P.O.R', IMG.flood, 'Bracket', { ip: 'IP65' }),
  P('street', '100 W LED Flood Light', 'EIL.FL.100', 100, '12000 Lm', '330×290', 'P.O.R', IMG.flood, 'Bracket', { ip: 'IP65' }),
  P('street', '100 W LED High Bay', 'EIL.HB.100', 100, '13000 Lm', '400×230', 'P.O.R', IMG.highbay, 'Suspended', { ip: 'IP65' }),
  P('street', '20 W Wall Pack / Bulkhead', 'EIL.WP.20', 20, '2200 Lm', '250×140', 'P.O.R', IMG.wallpack, 'Wall', { ip: 'IP65' }),
  P('street', '36 W Linear Wall Washer', 'EIL.WW.36', 36, '3600 Lm', '1000×60', 'P.O.R', IMG.wallWasher, 'Wall', { ip: 'IP65' }),
  // Landscape
  P('landscape', '09 W Inground Light', 'EIL.IG.09', 9, '900 Lm', 'Ø120', 'P.O.R', IMG.inground, 'Inground', { ip: 'IP67' }),
  P('landscape', '12 W Spike / Garden Spot', 'EIL.GS.12', 12, '1200 Lm', 'Ø110', 'P.O.R', IMG.spike, 'Spike', { ip: 'IP65' }),
  P('landscape', '12 W Bollard — Slim', 'EIL.BD.12', 12, '1100 Lm', '800 mm', 'P.O.R', IMG.bollard, 'Ground', { ip: 'IP65' }),
  P('landscape', '18 W Bollard — Decorative', 'EIL.BD.18D', 18, '1700 Lm', '900 mm', 'P.O.R', IMG.bollardDeco, 'Ground', { ip: 'IP65' }),
  P('landscape', '24 W Post-Top Lantern', 'EIL.PT.24', 24, '2400 Lm', '450×320', 'P.O.R', IMG.postTop, 'Pole', { ip: 'IP65' }),
  P('landscape', '18 W Gate Lantern', 'EIL.GL.18', 18, '1800 Lm', '400×260', 'P.O.R', IMG.gateLantern, 'Pole', { ip: 'IP65' }),
  // New launches from instagram.com/electrocine (Aug 2026). The posts give watts,
  // size, IP and CCT only — lumens and price stay "on request" rather than guessed,
  // and the codes are provisional placeholders until the real SKU codes are known.
  P('landscape', '10 W Mushroom Bollard', 'NEW.MUSHROOM.10', 10, 'On request', '175×500', 'P.O.R', IMG.igMushroom, 'Ground', {
    ip: 'IP65',
    photo: true,
    cct: 'CW · WW · NW',
    isNew: true,
  }),
  P('landscape', '36 W Spark LED Post Top', 'NEW.SPARK.36', 36, 'On request', '—', 'P.O.R', IMG.igSpark, 'Pole', {
    ip: 'IP65',
    photo: true,
    cct: 'CW · WW · NW',
    isNew: true,
  }),
  // Decorative
  P('decor', '36 W Hexagon Pendant', 'EIL.HP.36', 36, '3600 Lm', '600×520', 'P.O.R', IMG.pendant, 'Suspended'),
  P('decor', '48 W Hexagon Pendant', 'EIL.HP.48', 48, '4800 Lm', '800×690', 'P.O.R', IMG.pendant, 'Suspended'),
  P('decor', '18 W Wall Bracket Light', 'EIL.WB.18', 18, '1700 Lm', '320×180', 'P.O.R', IMG.wallBracket, 'Wall', { ip: 'IP54' }),
  P('decor', '30 W Suspended Profile', 'EIL.SP.30', 30, '3000 Lm', '1200×55', 'P.O.R', IMG.profileSusp, 'Suspended'),
];

export const SPEC_SETS = {
  panel: [
    { k: 'Material', v: 'Powder-coated CRCA sheet' },
    { k: 'Diffuser', v: 'Polycarbonate' },
    { k: 'IP level', v: 'IP20' },
    { k: 'Power factor', v: '> 0.90' },
    { k: 'CRI', v: '> 80 %' },
    { k: 'THD', v: '< 30 %' },
    { k: 'Efficacy', v: '> 130 lm/W' },
    { k: 'Input voltage', v: '110–270 V, 50 Hz AC' },
  ],
  linear: [
    { k: 'Material', v: 'Aluminium extrusion' },
    { k: 'Diffuser', v: 'PC diffuser' },
    { k: 'IP level', v: 'IP20' },
    { k: 'Power factor', v: '> 0.90' },
    { k: 'CRI', v: '> 80 %' },
    { k: 'THD', v: '< 10 %' },
    { k: 'Efficacy', v: '> 130 lm/W' },
    { k: 'Input voltage', v: '110–270 V, 50 Hz AC' },
  ],
  outdoor: [
    { k: 'Material', v: 'Aluminium die casting' },
    { k: 'Body', v: 'Weather-proof, PC diffuser' },
    { k: 'IP level', v: 'IP65 / IP66' },
    { k: 'Power factor', v: '> 0.90' },
    { k: 'CRI', v: '> 80 %' },
    { k: 'THD', v: '< 10 %' },
    { k: 'Efficacy', v: '> 130 lm/W' },
    { k: 'Input voltage', v: '110–270 V, 50 Hz AC' },
  ],
};

// Inline SVG path data for the icon set — rendered inside a shared 24×24 stroked <svg>.
export const ICON = {
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/>',
  factory: '<path d="M2 20h20"/><path d="M4 20V9l5 3V9l5 3V9l5 3v8"/><path d="M8 20v-4h4v4"/>',
  doc: '<path d="M14 3v5h5"/><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M9 13h6M9 17h4"/>',
  truck: '<path d="M2 17h1V7h11v10h-1"/><path d="M14 10h4l3 3v4h-2"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  wrench: '<path d="M14.5 3.5a4.5 4.5 0 0 0-6 6L3 15v6h6l5.5-5.5a4.5 4.5 0 0 0 6-6l-3 3-3-3z"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/>',
};

export const PARTNER_NAMES = ['Cree', 'Ever Light', 'Philips', 'Edison', 'Osram', 'Make in India'];

export const HERO_STATS = [
  { value: '140+', label: 'Catalogued SKUs' },
  { value: '6', label: 'Product families' },
  { value: '>130', label: 'Lumens per watt' },
  { value: '110–270V', label: 'Input range' },
];

export const DECLARED_SPECS = [
  { k: 'Efficacy', v: '> 130 lm/W' },
  { k: 'Colour rendering index', v: '> 80 %' },
  { k: 'Power factor', v: '> 0.90' },
  { k: 'Total harmonic distortion', v: '< 10 % / < 30 %' },
  { k: 'Input voltage', v: '110–270 V, 50 Hz AC' },
  { k: 'Colour temperature', v: 'CW / WW / NW' },
  { k: 'Body', v: 'Die-cast aluminium · CRCA' },
  { k: 'Diffuser', v: 'Polycarbonate' },
  { k: 'LED source', v: 'Cree · Philips · Osram · Edison' },
];

export const SERVICES = [
  {
    name: 'In-house manufacturing',
    blurb: 'Die-cast and CRCA bodies, assembly and driver potting under one roof.',
    icon: ICON.factory,
    points: ['Aluminium die casting & powder-coated CRCA', 'PC diffuser moulding and assembly', 'Batch-level burn-in before packing'],
  },
  {
    name: 'Tender documentation',
    blurb: 'Specification sheets, BOM declarations and rate schedules for public tenders.',
    icon: ICON.doc,
    points: ['Line-item spec sheets per SKU', 'Named chip and driver declaration', 'Stamped rate schedule on letterhead'],
  },
  {
    name: 'Distributor supply',
    blurb: 'Slab pricing, stock planning and territory terms for dealers and distributors.',
    icon: ICON.truck,
    points: ['Volume slabs from the July 2024 list', 'Packaging suited to secondary transport', 'Sample units for counter display'],
  },
  {
    name: 'Custom wattage builds',
    blurb: 'Non-catalogue wattages, sizes and colour temperatures produced against order.',
    icon: ICON.wrench,
    points: ['CW / WW / NW on the same body', 'Cut-out changes on backlit panels', 'Private-label fascia on request'],
  },
];

export const INDUSTRIES = [
  { no: '01', name: 'Commercial interiors', blurb: 'Offices, showrooms and retail ceilings on 600×600 grids.' },
  { no: '02', name: 'Government buildings', blurb: 'Tendered supply against departmental rate schedules.' },
  { no: '03', name: 'Municipal roadway', blurb: 'Street and post-top lighting for streets and colonies.' },
  { no: '04', name: 'Industrial sheds', blurb: 'High-bay and flood lighting for plants and warehouses.' },
  { no: '05', name: 'Hospitality', blurb: 'Decorative pendants, profiles and mirror lighting.' },
  { no: '06', name: 'Healthcare', blurb: 'High-CRI panels and battens for wards and corridors.' },
  { no: '07', name: 'Education', blurb: 'Battens and surface panels for classrooms and hostels.' },
  { no: '08', name: 'Landscape', blurb: 'Inground, spike and bollard fittings for parks and campuses.' },
];

export const PARTNERS = [
  { name: 'Cree', role: 'LED source' },
  { name: 'Philips', role: 'LED source' },
  { name: 'Osram', role: 'LED source' },
  { name: 'Edison', role: 'LED source' },
  { name: 'Ever Light', role: 'LED source' },
  { name: 'In-house', role: 'Driver assembly' },
];

export const CERTIFICATES = [
  { name: 'ISO 9001', scope: 'Quality management system for manufacture of LED luminaires.', ref: 'Certificate no. — placeholder' },
  { name: 'BIS registration', scope: 'Compulsory registration for LED lighting products.', ref: 'R-xxxxxxxx — placeholder' },
  { name: 'RoHS', scope: 'Restriction of hazardous substances in components used.', ref: 'Declaration — placeholder' },
  { name: 'LM-79 / LM-80', scope: 'Photometric and lumen-maintenance test reports per family.', ref: 'Report no. — placeholder' },
];

export const TESTIMONIALS = [
  {
    quote: 'The spec sheet matched the goods on delivery, down to the cut-out dimension. That is rare enough that we now default to Electrocine for panel work.',
    name: 'Rajeev Menon',
    role: 'Purchase head · electrical contractor, Kochi',
  },
  {
    quote: 'They put the chip make in writing for our tender. The evaluation committee cleared it without a single clarification round.',
    name: 'S. Balakrishnan',
    role: 'Executive engineer · municipal works',
  },
  {
    quote: 'Slab pricing is transparent and the batten range moves fast off our counter. Replacement claims in two years: three units.',
    name: 'Anita Shah',
    role: 'Distributor · Gujarat',
  },
  {
    quote: 'We asked for a 4000 K variant of the 600×600 backlit at short notice. It shipped in the same month.',
    name: 'Faisal Rahman',
    role: 'Project manager · interior fit-out',
  },
];

export const PROCESS = [
  { no: 'Step 01', name: 'Enquiry', blurb: 'Send the schedule — wattages, quantities, delivery location.' },
  { no: 'Step 02', name: 'Quotation', blurb: 'Stamped rate schedule with spec sheets, within one working day.' },
  { no: 'Step 03', name: 'Sample', blurb: 'Evaluation units despatched for technical approval where required.' },
  { no: 'Step 04', name: 'Production', blurb: 'Batch built, burnt in and inspected against the declared figures.' },
  { no: 'Step 05', name: 'Dispatch', blurb: 'Packed for secondary transport with test report and invoice.' },
];

export const FAQS = [
  {
    q: 'Are the prices in the catalogue current?',
    a: 'The list price shown is the ex-works rate effective July 2024. Items marked P.O.R are quoted against the enquiry because the build varies with wattage, colour temperature and quantity.',
  },
  {
    q: 'Which LED chips and drivers do you use?',
    a: 'Cree, Ever Light, Philips, Edison or Osram — or equivalent, declared per SKU. For tender submissions we name the exact make and model in writing so the bill of materials can be verified.',
  },
  {
    q: 'What efficacy and power factor should we design to?',
    a: 'Series-wide the figures are efficacy greater than 130 lumens per watt, power factor above 0.90, CRI above 80 % and THD below 10 % on linear products and below 30 % on panels.',
  },
  {
    q: 'Do you supply against government tenders?',
    a: 'Yes. We issue stamped rate schedules, specification sheets and component declarations on letterhead, and can supply sample units for technical evaluation before award.',
  },
  {
    q: 'Can you produce a wattage or size that is not listed?',
    a: 'Custom wattages, cut-outs and colour temperatures are produced against order on the existing bodies. Minimum quantities apply and are confirmed with the quotation.',
  },
  {
    q: 'What is the warranty position?',
    a: 'Warranty terms are stated on the invoice and vary by product family. Send us the schedule you are quoting and we will confirm the applicable term in the quotation.',
  },
];

export const PILLARS = [
  {
    kicker: 'Mission',
    title: 'Publish the number, then meet it.',
    body: 'Every SKU carries a declared lumen, efficacy and IP figure. We would rather quote a lower number we can hold than a higher one we cannot.',
  },
  {
    kicker: 'Vision',
    title: 'The default choice for specified work.',
    body: 'To be the manufacturer a consultant can name in a tender document without adding a clause about substitution.',
  },
  {
    kicker: 'Values',
    title: 'Made here, documented here.',
    body: 'Indian manufacture, named components, written specifications and a technical desk that answers in one working day.',
  },
];

export const TIMELINE = [
  { year: '2014', title: 'Workshop established', body: 'Assembly of retrofit tube fittings and battens begins, supplying local electrical dealers. Placeholder — confirm the founding year.' },
  { year: '2017', title: 'Panel range introduced', body: 'Recess and surface panel lights added on powder-coated CRCA bodies with polycarbonate diffusers.' },
  { year: '2019', title: 'Outdoor series', body: 'Die-cast aluminium street, flood and landscape fittings brought in at IP65 and above.' },
  { year: '2022', title: 'Backlit and designer panels', body: 'Backlit recess and surface panels released up to 80 W, with designer fascia variants.' },
  { year: '2024', title: 'Full LED series catalogue', body: 'The consolidated LED Lighting Series price list is published, effective July 2024 — six families, 140+ SKUs.' },
];

export const CONTACT_CARDS = [
  {
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    note: 'As printed in the catalogue — confirm before publishing.',
  },
  { label: 'Telephone', value: '+91 99997 15850', href: 'tel:+919999715850', note: 'Also +91 98100 41120 — as listed on instagram.com/electrocine.' },
  { label: 'Website', value: 'electrocineindustries.com', href: 'https://www.electrocineindustries.com', note: 'Listed on the company Instagram profile.' },
  { label: 'Works address', value: 'Placeholder — awaiting address', note: 'Required for the map embed and tender documents.' },
];

// autoComplete tokens let password managers and mobile keyboards do their job.
export const FIELD_DEFS = [
  { id: 'name', label: 'Contact name', type: 'text', placeholder: 'R. Sharma', autoComplete: 'name' },
  { id: 'company', label: 'Company / department', type: 'text', placeholder: 'Sharma Electricals', autoComplete: 'organization' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com', autoComplete: 'email' },
  { id: 'phone', label: 'Phone', type: 'tel', placeholder: '+91 00000 00000', autoComplete: 'tel' },
  { id: 'city', label: 'Delivery city', type: 'text', placeholder: 'Jaipur', autoComplete: 'address-level2' },
  { id: 'qty', label: 'Approx. quantity', type: 'text', placeholder: '400 units', autoComplete: 'off' },
];

export const ENQUIRY_TYPES = ['Distributor', 'Government tender', 'Project / contractor', 'Other'];

// Real destinations rather than href="#": the mail link works today, the other
// two are the only two placeholders left in the footer.
export const SOCIALS = [
  { name: 'Instagram @electrocine', icon: ICON.instagram, href: 'https://www.instagram.com/electrocine/', external: true },
  { name: `Email ${CONTACT_EMAIL}`, icon: ICON.mail, href: `mailto:${CONTACT_EMAIL}` },
  { name: 'Telephone +91 99997 15850', icon: ICON.phone, href: 'tel:+919999715850' },
];

export const BENTO_IMGS = [IMG.backlitRecess, IMG.tube, IMG.surfacePanel, IMG.street, IMG.bollardDeco, IMG.pendant];

export const COUNTER_TARGETS = [140, 12, 8, 24];

export const COUNTER_LABELS = [
  'SKUs in the July 2024 list',
  'Manufacturing LED luminaires',
  'States supplied',
  'Technical desk turnaround (hrs)',
];

/* ── models ──
   The price list is one row per wattage, so the same photograph repeats for every
   size of a fitting. A model groups those rows ("24 W Backlit Panel — Recess" and
   its siblings → "Backlit Panel — Recess") so the catalogue can show each fitting
   once, large, with its wattages as variants. */
export const modelName = (p) => p.name.replace(/^\d+\s*W\s+/, '');
const modelKey = (p) => `${p.cat}|${modelName(p)}`;

export const MODELS = (() => {
  const byKey = new Map();
  PRODUCTS.forEach((p) => {
    const k = modelKey(p);
    if (!byKey.has(k)) byKey.set(k, { key: k, cat: p.cat, name: modelName(p), img: p.img, mount: p.mount, variants: [] });
    byKey.get(k).variants.push(p);
  });
  return Array.from(byKey.values()).map((m) => ({ ...m, variants: m.variants.sort((a, b) => a.watt - b.watt) }));
})();

export const siblingsOf = (p) => MODELS.find((m) => m.key === modelKey(p))?.variants || [p];

/* Short variant label; adds the size when two variants share a wattage. */
export const variantLabel = (p, variants) =>
  variants.filter((v) => v.watt === p.watt).length > 1 ? `${p.watt} W · ${p.dim}` : `${p.watt} W`;

/* null when the lumen figure is not published (e.g. "On request"). */
export const efficacy = (p) => {
  const lm = parseInt(p.lumens, 10);
  return Number.isFinite(lm) ? Math.round(lm / p.watt) : null;
};

/* Models with genuine photography, used where the catalogue is put on show. */
export const FEATURED_MODELS = ['LED Street Light', 'Backlit Panel — Recess', 'Post-Top Lantern', 'LED High Bay', 'Bollard — Decorative', 'Inground Light', 'Linear Wall Washer', 'Gate Lantern']
  .map((n) => MODELS.find((m) => m.name === n))
  .filter(Boolean);

/* One representative photograph per family, in CATS order. */
export const CAT_IMG = { panel: IMG.backlitRecess, batten: IMG.tube, down: IMG.surfacePanel, street: IMG.street, landscape: IMG.postTop, decor: IMG.wallBracket };
