/* Post-build SEO step (runs after `vite build`).

   The site is a single-page React app, so without this every URL would serve
   the same <head>. This writes dist/<route>/index.html for each page with its
   own title, description, canonical and share tags already in the HTML —
   so search engines and link previews (WhatsApp, LinkedIn, X) see the right
   content without running JavaScript — plus a 404 page and sitemap.xml.
   All values come from src/lib/seo.js. */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROUTES, NOT_FOUND, SITE_NAME, abs } from '../src/lib/seo.js';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const template = readFileSync(join(DIST, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function headFor(path, meta) {
  const url = abs(path);
  const img = abs(meta.image);
  return [
    '<!--seo:start-->',
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    meta.noindex ? '' : `<link rel="canonical" href="${url}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    '<meta property="og:locale" content="en_IN" />',
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    '<meta property="og:image:width" content="1024" />',
    '<meta property="og:image:height" content="1360" />',
    '<meta property="og:image:alt" content="Electrocine LED lighting" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    '<!--seo:end-->',
  ]
    .filter(Boolean)
    .join('\n');
}

const swapHead = (html, block) => html.replace(/<!--seo:start[\s\S]*?<!--seo:end-->/, block);

let written = 0;
for (const [path, meta] of Object.entries(ROUTES)) {
  const out = path === '/' ? join(DIST, 'index.html') : join(DIST, path.slice(1), 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, swapHead(template, headFor(path, meta)));
  written++;
}
writeFileSync(join(DIST, '404.html'), swapHead(template, headFor('/404', NOT_FOUND)));

const today = new Date().toISOString().slice(0, 10);
const priority = { '/': '1.0', '/products': '0.9', '/about': '0.6', '/contact': '0.7' };
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(ROUTES)
  .map((p) => `  <url>\n    <loc>${abs(p)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p === '/products' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${priority[p] || '0.5'}</priority>\n  </url>`)
  .join('\n')}
</urlset>
`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

console.log(`seo: ${written} pages + 404.html + sitemap.xml written to dist/`);
