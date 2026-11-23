import { useEffect, useId, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATS, CAT_IMG, MODELS, PRODUCTS, origOf, srcSetOf } from '../data/catalog.js';
import { useApp, Icon } from '../lib/ui.jsx';
import { SETTINGS } from '../App.jsx';
import ModelCard from '../components/ModelCard.jsx';
import PageHead from '../components/PageHead.jsx';

const WATT_MAX = 120;
const SORTS = [
  { id: 'featured', label: 'Catalogue order' },
  { id: 'watt-asc', label: 'Wattage — low to high' },
  { id: 'watt-desc', label: 'Wattage — high to low' },
  { id: 'lumens', label: 'Light output — highest' },
];
const CAT_NAME = Object.fromEntries(CATS.map((c) => [c.id, c.name]));
const FAMILIES = [{ id: 'all', name: 'Full range', img: null }, ...CATS.map((c) => ({ ...c, img: CAT_IMG[c.id] }))];
const modelsIn = (id) => MODELS.filter((m) => id === 'all' || m.cat === id).length;
const skusIn = (id) => PRODUCTS.filter((p) => id === 'all' || p.cat === id).length;
const wattRange = (id) => {
  const w = PRODUCTS.filter((p) => id === 'all' || p.cat === id).map((p) => p.watt);
  return `${Math.min(...w)}–${Math.max(...w)} W`;
};

const lm = (p) => parseInt(p.lumens, 10) || 0;
const plural = (n, word, withCount = false) => `${withCount ? n + ' ' : ''}${word}${n === 1 ? '' : 's'}`;
const sorters = {
  featured: null,
  'watt-asc': (a, b) => a.watt - b.watt,
  'watt-desc': (a, b) => b.watt - a.watt,
  lumens: (a, b) => lm(b) - lm(a),
};
const thumb = (src) => (src && src.startsWith('/cat/hd/') ? { src: origOf(src), srcSet: srcSetOf(src) } : { src });

export default function Products() {
  const navigate = useNavigate();
  const { openDetail, priceOf, pendingCat, clearPendingCat } = useApp();
  const wattId = useId();
  const searchId = useId();

  const [cat, setCat] = useState('all');
  const [mount, setMount] = useState('all');
  const [wattMax, setWattMax] = useState(WATT_MAX);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [view, setView] = useState(SETTINGS.productView === 'table' ? 'table' : 'gallery');

  // A category picked elsewhere (nav mega-menu, home index, footer) lands here.
  useEffect(() => {
    if (pendingCat) {
      setCat(pendingCat);
      setMount('all');
      setWattMax(WATT_MAX);
      setQuery('');
      clearPendingCat();
    }
  }, [pendingCat, clearPendingCat]);

  const mounts = useMemo(() => ['all', ...Array.from(new Set(PRODUCTS.map((p) => p.mount))).sort()], []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter(
      (p) =>
        (cat === 'all' || p.cat === cat) &&
        (mount === 'all' || p.mount === mount) &&
        p.watt <= wattMax &&
        (!q || `${p.name} ${p.code} ${p.mount} ${CAT_NAME[p.cat]} ${p.dim}`.toLowerCase().includes(q))
    );
    return sorters[sort] ? [...list].sort(sorters[sort]) : list;
  }, [cat, mount, wattMax, query, sort]);

  const models = useMemo(() => {
    const keep = new Set(filtered.map((p) => p.code));
    const list = MODELS.map((m) => ({ model: m, variants: m.variants.filter((v) => keep.has(v.code)) })).filter((x) => x.variants.length);
    if (sort === 'watt-asc') list.sort((a, b) => a.variants[0].watt - b.variants[0].watt);
    if (sort === 'watt-desc') list.sort((a, b) => b.variants.at(-1).watt - a.variants.at(-1).watt);
    if (sort === 'lumens') list.sort((a, b) => Math.max(...b.variants.map(lm)) - Math.max(...a.variants.map(lm)));
    return list;
  }, [filtered, sort]);

  const resetFilters = () => {
    setCat('all');
    setMount('all');
    setWattMax(WATT_MAX);
    setQuery('');
  };

  const active = [
    mount !== 'all' && { k: 'mount', label: `Mounting: ${mount}`, clear: () => setMount('all') },
    wattMax < WATT_MAX && { k: 'watt', label: `Up to ${wattMax} W`, clear: () => setWattMax(WATT_MAX) },
    query.trim() && { k: 'q', label: `“${query.trim()}”`, clear: () => setQuery('') },
  ].filter(Boolean);

  const family = FAMILIES.find((f) => f.id === cat);
  const go = (to) => () => {
    navigate(to);
    window.scrollTo(0, 0);
  };

  return (
    <main id="main" className="inner">
      <PageHead
        here="Products"
        kicker="LED Lighting Series · price list w.e.f. July 2024"
        title={cat === 'all' ? <>The full <em>range.</em></> : family.name}
        aside={
          <dl className="ph-facts">
            <div>
              <dd>{modelsIn(cat)}</dd>
              <dt>Fittings</dt>
            </div>
            <div>
              <dd>{skusIn(cat)}</dd>
              <dt>SKUs</dt>
            </div>
            <div>
              <dd>{wattRange(cat)}</dd>
              <dt>Wattage span</dt>
            </div>
          </dl>
        }
      >
        {/* family tabs wrap onto more lines rather than scrolling sideways */}
        <div className="fam-tabs" role="group" aria-label="Product family">
          {FAMILIES.map((f) => (
            <button key={f.id} type="button" className="fam-tab" aria-pressed={cat === f.id} onClick={() => setCat(f.id)}>
              {f.img ? (
                <img {...thumb(f.img)} alt="" loading="eager" />
              ) : (
                <span className="fam-tab-all" aria-hidden="true">
                  ✦
                </span>
              )}
              <span className="fam-tab-name">{f.name}</span>
              <span className="fam-tab-count">{modelsIn(f.id)}</span>
            </button>
          ))}
        </div>
      </PageHead>

      {/* ── filter bar ── */}
      <div className="filters">
        <div className="container">
          <div className="filters-bar">
            <div className="filters-search">
              <label htmlFor={searchId} className="visually-hidden">
                Search the catalogue
              </label>
              <Icon path='<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path>' size={18} />
              <input
                id={searchId}
                type="search"
                placeholder="Search name, code or size — e.g. BLPR, 600×600"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <label className="filters-field">
              <span>Mounting</span>
              <select value={mount} onChange={(e) => setMount(e.target.value)}>
                {mounts.map((m) => (
                  <option key={m} value={m}>
                    {m === 'all' ? 'Any' : m}
                  </option>
                ))}
              </select>
            </label>
            <div className="filters-field filters-watt">
              <label htmlFor={wattId}>
                Up to <strong>{wattMax} W</strong>
              </label>
              <input
                id={wattId}
                className="range"
                type="range"
                min="6"
                max={WATT_MAX}
                step="1"
                value={wattMax}
                onChange={(e) => setWattMax(Number(e.target.value))}
                aria-valuetext={`Up to ${wattMax} watts`}
              />
            </div>
            <label className="filters-field">
              <span>Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="filters-view" role="group" aria-label="Layout">
              <button aria-pressed={view === 'gallery'} onClick={() => setView('gallery')}>
                Gallery
              </button>
              <button aria-pressed={view === 'table'} onClick={() => setView('table')}>
                Spec table
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="container results">
        <div className="results-status">
          <p aria-live="polite">
            <strong>{view === 'gallery' ? models.length : filtered.length}</strong>{' '}
            {view === 'gallery' ? plural(models.length, 'fitting') : plural(filtered.length, 'SKU')}
            {view === 'gallery' && models.length > 0 && <> · {plural(filtered.length, 'wattage option', true)}</>}
            {cat !== 'all' && <> in {family.name}</>}
          </p>
          {active.length > 0 && (
            <ul className="results-active">
              {active.map((a) => (
                <li key={a.k}>
                  <button type="button" onClick={a.clear} aria-label={`Remove filter ${a.label}`}>
                    {a.label} <span aria-hidden="true">×</span>
                  </button>
                </li>
              ))}
              <li>
                <button type="button" className="results-clear" onClick={resetFilters}>
                  Clear all
                </button>
              </li>
            </ul>
          )}
        </div>

        {filtered.length === 0 && (
          <div className="results-empty">
            <p className="results-empty-title">No fitting matches that combination.</p>
            <p>Widen the wattage range, clear the search or the mounting filter. Custom wattages are produced against order.</p>
            <button className="btn btn-dark" onClick={resetFilters}>
              Clear all filters
            </button>
          </div>
        )}

        {view === 'gallery' && models.length > 0 && (
          <ul className="model-grid">
            {models.map(({ model, variants }, i) => (
              <li key={model.key} className={i === 0 && models.length > 2 ? 'model-grid-feature' : undefined}>
                <ModelCard model={model} variants={variants} feature={i === 0 && models.length > 2} />
              </li>
            ))}
          </ul>
        )}

        {view === 'table' && filtered.length > 0 && (
          <div className="sheet">
            <table className="sheet-table">
              <caption className="visually-hidden">{filtered.length} products. Select a row for full specifications.</caption>
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Code</th>
                  <th scope="col" className="num">
                    Watt
                  </th>
                  <th scope="col" className="num">
                    Min. lumens
                  </th>
                  <th scope="col" className="num">
                    Dimension
                  </th>
                  <th scope="col" className="num">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.code + p.dim} onClick={() => openDetail(p)}>
                    <th scope="row">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetail(p);
                        }}
                      >
                        <span className="sheet-thumb" aria-hidden="true">
                          <img {...thumb(p.img)} alt="" loading="lazy" />
                        </span>
                        {p.name}
                      </button>
                    </th>
                    <td className="sheet-code break-word">{p.code}</td>
                    <td className="num strong">{p.watt}</td>
                    <td className="num">{p.lumens}</td>
                    <td className="num">{p.dim}</td>
                    <td className="num strong">{priceOf(p)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <aside className="custom-band">
          <div>
            <p className="t-kicker" style={{ color: 'var(--accent-light)' }}>
              Made to order
            </p>
            <h2>
              Need a wattage that isn&rsquo;t <em>listed?</em>
            </h2>
            <p>Custom wattages, colour temperatures and housings are produced against order, with the same declared spec sheet.</p>
          </div>
          <button className="btn btn-light" onClick={go('/contact')}>
            Ask the technical desk <span className="btn-arrow">→</span>
          </button>
        </aside>
      </section>
    </main>
  );
}
