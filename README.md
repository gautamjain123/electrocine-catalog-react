# Electrocine Industries — LED Lighting Series (React)

React port of the `Electrocine.dc.html` prototype from the *LED Product Catalog Prototype*
design project. Same content, same visual language, same interactions — rebuilt as a
routed React app instead of a single `dc-runtime` component.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Structure

| Path | Contains |
| --- | --- |
| `src/data/catalog.js` | All catalogue content — 52 SKUs, 6 families, spec sets, FAQs, testimonials, timeline, icons |
| `src/lib/ui.jsx` | `useBreakpoint`, `useReveal`, `useCounters`, `useInView`, `Hov` (hover styles), `Corners`, `Icon`, app context |
| `src/App.jsx` | Routing + the shared state the prototype kept in one component (toast, modal, enquiry prefill) |
| `src/components/` | `Nav`, `Footer`, `ProductModal`, `Toast` |
| `src/pages/` | `Home`, `Products`, `About`, `Contact` |

## How the prototype's constructs were translated

| Prototype | React |
| --- | --- |
| `<sc-if>` / `<sc-for>` | Conditional rendering and `.map()` |
| `style-hover="…"` | CSS `:hover` classes behind `@media (hover: hover)` |
| `this.state.page` + `nav()` | `react-router-dom` routes (`/`, `/products`, `/about`, `/contact`, 404) |
| `measure()` / `bp` | CSS media queries — no JS breakpoints at all |
| `revealAll()` + 2600 ms fallback | `useReveal()` — same observer, same fallback |
| `runCounters()` | `useInView()` + `useCounters()` |
| `dangerouslySetInnerHTML` on `<svg>` | `<Icon path={…} />` |
| `data-props` panel | `SETTINGS` in `src/App.jsx` |

## Responsiveness

Layout lives in `src/styles/app.css`, mobile-first and fluid — **no JS breakpoints**.
The original bucketed every width into three JS buckets (720/1080), which put a 1079px
desktop window on the phone layout and pushed the menu button off-screen at 320px.

Breakpoints: **480 · 640 · 768 · 1024 · 1280**. The desktop nav takes over at 1024.
Gutters, section rhythm and type all use `clamp()`, so widths between breakpoints are
handled continuously rather than snapping.

Verified with an automated sweep — every route at **320 / 360 / 480 / 768 / 1024 / 1079 /
1280 / 1440 / 1920** — asserting zero horizontal overflow, a reachable nav, no touch
target under 28px, and no broken images. All clean.

Key rules worth knowing about:

- `.g > * { min-width: 0 }` — grid items default to `min-width:auto` and refuse to
  shrink below their content, which is what pushed the spec tables past the viewport.
- `.table-scroll` — wide tables scroll inside their own box instead of the page.
- `.input { font-size: 16px }` — anything smaller makes iOS Safari zoom on focus.
- Hover effects sit behind `@media (hover: hover)` so they don't stick after a tap.

## Production readiness

- **Accessibility** — skip link, one `<h1>` per page, landmarks, labelled breadcrumbs,
  `aria-pressed` on filters, `aria-expanded`/`aria-controls` on the FAQ and drawer,
  live regions for the toast and result count, visible focus rings, and 28px+ targets.
- **Modal** — `role="dialog"`, `aria-modal`, focus trap, background scroll lock, Escape
  to close, focus restored to the element that opened it.
- **Forms** — real `<form>` elements, so Enter submits; `aria-invalid`, `role="alert"`
  errors, `autoComplete` tokens, focus moved to the first invalid field.
- **Keyboard** — product cards and table rows are real buttons; the mega menu opens on
  `:focus-within`.
- **Resilience** — error boundary per route, 404 route, `prefers-reduced-motion` honoured.
- **SEO/meta** — per-route `<title>`, description, Open Graph, theme-color, favicon.

## Settings

`src/App.jsx` exports `SETTINGS`, standing in for the design tool's props panel:

- **`showPrices`** — `true` here. The design-tool default was `false`, which renders every
  price as "On request". Flipped because the catalogue data carries real ex-works rates and
  this build has no props panel to reveal them. Set to `false` for the prototype's default.
- **`motion`** — `'reduced'` drops the floating hero cards' drift animation.
- **`productView`** — initial catalogue layout, before the user picks Grid / Spec table.

## Product imagery — 7 aliased plates

Seven source images could not be retrieved: each exceeds the design asset API's 256 KiB
read cap, and their alternate crops (`img/pNN_K.png`) are the same oversized files. Each is
aliased in `src/data/catalog.js` to the closest fitting in the same family, so the catalogue
renders complete with no broken images.

| Missing | Used for | Aliased to |
| --- | --- | --- |
| `p03` | Slim recess panel | `p04` — surface panel |
| `p05` | T8/T5 tube, batten | `p21` — linear profile |
| `p06` | Backlit panel, recess | `p08` — designer backlit panel |
| `p07` | Backlit panel, surface | `p08` — designer backlit panel |
| `p09` | Flood light | `p11` — wall pack |
| `p18` | Spike / garden spot | `p12` — inground |
| `p23` | Hexagon pendant | `p22` — suspended profile |

The other 14 plates are the genuine catalogue photographs. To restore any of the seven:
drop the real PNG into `public/cat/` and point its `IMG` entry back at its own filename.

## Known placeholders

Carried over from the prototype, all flagged in the UI: certificate numbers, the company
timeline years, the telephone number, and the works address / map embed.
