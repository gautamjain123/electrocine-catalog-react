import { useEffect, useId, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATS, PRODUCTS } from '../data/catalog.js';
import { useApp, Corners, Icon, GridLines } from '../lib/ui.jsx';
import { SETTINGS } from '../App.jsx';

export default function Products() {
  const navigate = useNavigate();
  const { openDetail, priceOf, pendingCat, clearPendingCat } = useApp();
  const wattId = useId();

  const [cat, setCat] = useState('all');
  const [mount, setMount] = useState('all');
  const [wattMax, setWattMax] = useState(120);
  const [view, setView] = useState(SETTINGS.productView);

  // A category picked elsewhere (nav mega-menu, home bento, footer) lands here.
  useEffect(() => {
    if (pendingCat) {
      setCat(pendingCat);
      setMount('all');
      setWattMax(120);
      clearPendingCat();
    }
  }, [pendingCat, clearPendingCat]);

  const mounts = useMemo(() => ['all', ...Array.from(new Set(PRODUCTS.map((p) => p.mount))).sort()], []);

  const filtered = useMemo(
    () => PRODUCTS.filter((p) => (cat === 'all' || p.cat === cat) && (mount === 'all' || p.mount === mount) && p.watt <= wattMax),
    [cat, mount, wattMax]
  );

  const resetFilters = () => {
    setCat('all');
    setMount('all');
    setWattMax(120);
  };

  const filterNote = cat === 'all' ? '' : ' in ' + (CATS.find((c) => c.id === cat)?.name || '');

  return (
    <main id="main">
      <section
        className="on-dark"
        style={{ position: 'relative', overflow: 'hidden', background: 'var(--navy)', color: 'var(--bg)', paddingBlock: 'clamp(40px,6vw,60px) clamp(32px,5vw,46px)' }}
      >
        <GridLines />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-60%',
            left: '40%',
            width: '46vw',
            height: '46vw',
            borderRadius: '50%',
            filter: 'blur(100px)',
            opacity: 0.36,
            background: 'radial-gradient(circle,#5980a6,transparent 68%)',
            animation: 'aurora 22s ease-in-out infinite',
          }}
        />
        <div className="container" style={{ position: 'relative' }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: 22 }}>
            <ol style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(242,242,243,.5)', listStyle: 'none', margin: 0, padding: 0 }}>
              <li>
                <button
                  onClick={() => {
                    navigate('/');
                    window.scrollTo(0, 0);
                  }}
                  className="crumb"
                >
                  Home
                </button>
              </li>
              <li aria-hidden="true">/</li>
              <li style={{ color: 'var(--accent-light)' }} aria-current="page">
                Products
              </li>
            </ol>
          </nav>
          <h1 className="t-h1" style={{ fontSize: 'clamp(34px,5.5vw,64px)', lineHeight: 1, margin: '0 0 14px' }}>
            LED Lighting Series
          </h1>
          <p className="t-body" style={{ color: 'rgba(242,242,243,.68)', maxWidth: '62ch', margin: 0 }}>
            Prices are ex-works and effective July 2024. P.O.R denotes price on request. All dimensions in millimetres.
          </p>
        </div>
      </section>

      <section className="container" style={{ paddingBlock: 'clamp(28px,4vw,36px) var(--section-y)' }}>
        <div className="g g-catalogue">
          <aside className="aside-sticky" aria-label="Filters">
            <h2 style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 12 }}>
              Family
            </h2>
            <div className="famlist">
              {[{ id: 'all', name: 'All products' }, ...CATS].map((c) => (
                <button key={c.id} className="fam" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
                  <span>{c.name}</span>
                  <span style={{ fontFamily: 'var(--font-head)', opacity: 0.6 }}>
                    {c.id === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === c.id).length}
                  </span>
                </button>
              ))}
            </div>

            <h2 style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 12 }}>
              Mounting
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 30 }}>
              {mounts.map((m) => (
                <button key={m} className="pill" aria-pressed={mount === m} onClick={() => setMount(m)}>
                  {m === 'all' ? 'Any' : m}
                </button>
              ))}
            </div>

            <label htmlFor={wattId} style={{ display: 'block', fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted-2)', marginBottom: 12 }}>
              Wattage — up to {wattMax} W
            </label>
            <input
              id={wattId}
              className="range"
              type="range"
              min="6"
              max="120"
              step="1"
              value={wattMax}
              onChange={(e) => setWattMax(Number(e.target.value))}
              aria-valuetext={`Up to ${wattMax} watts`}
              style={{ marginBottom: 30 }}
            />

            <button className="btn-outline" style={{ width: '100%' }} onClick={resetFilters}>
              Reset filters
            </button>
          </aside>

          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 16,
                paddingBottom: 16,
                borderBottom: '1px solid var(--line)',
                marginBottom: 22,
              }}
            >
              <p aria-live="polite" style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>
                <strong style={{ fontFamily: 'var(--font-head)', fontSize: 20, color: 'var(--ink)' }}>{filtered.length}</strong>{' '}
                products{filterNote}
              </p>
              <div className="chip-group" role="group" aria-label="Layout">
                <button className="chip" aria-pressed={view === 'grid'} onClick={() => setView('grid')}>
                  Grid
                </button>
                <button className="chip" aria-pressed={view === 'table'} onClick={() => setView('table')}>
                  Spec table
                </button>
              </div>
            </div>

            {filtered.length === 0 && (
              <div className="blueprint" style={{ position: 'relative', padding: 'clamp(40px,7vw,64px) 32px', textAlign: 'center', background: 'rgba(255,255,255,.5)' }}>
                <Corners />
                <Icon
                  path='<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.5-3.5"></path>'
                  size={34}
                  stroke="var(--accent)"
                  style={{ margin: '0 auto 18px' }}
                />
                <p style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(20px,3vw,24px)', letterSpacing: '.03em', textTransform: 'uppercase', margin: '0 0 8px' }}>
                  No SKU matches that combination
                </p>
                <p style={{ fontSize: 14.5, color: 'var(--muted)', maxWidth: '44ch', margin: '0 auto 22px' }}>
                  Widen the wattage range or clear the mounting filter. Custom wattages are produced against order.
                </p>
                <button className="btn btn-primary" onClick={resetFilters}>
                  Clear all filters
                </button>
              </div>
            )}

            {view === 'grid' && filtered.length > 0 && (
              <ul className="g g-cards" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {filtered.map((p) => (
                  <li key={p.code + p.dim} style={{ display: 'flex' }}>
                    <ProductCard p={p} price={priceOf(p)} onOpen={() => openDetail(p)} />
                  </li>
                ))}
              </ul>
            )}

            {view === 'table' && filtered.length > 0 && (
              <div className="blueprint" style={{ position: 'relative', background: '#fff' }}>
                <Corners />
                <div className="table-scroll">
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption className="visually-hidden">
                      {filtered.length} products{filterNote}. Select a row for full specifications.
                    </caption>
                    <thead>
                      <tr style={{ background: 'rgba(89,128,166,.12)' }}>
                        {[
                          ['Product', 'left'],
                          ['Code', 'left'],
                          ['Watt', 'right'],
                          ['Min. lumens', 'right'],
                          ['Dimension', 'right'],
                          ['Price', 'right'],
                        ].map(([label, align]) => (
                          <th
                            key={label}
                            scope="col"
                            style={{
                              textAlign: align,
                              padding: '13px 16px',
                              fontFamily: 'var(--font-head)',
                              fontSize: 11.5,
                              letterSpacing: '.14em',
                              textTransform: 'uppercase',
                              color: 'var(--accent-dark)',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {label}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((p) => (
                        <tr
                          key={p.code + p.dim}
                          className="hov-row"
                          onClick={() => openDetail(p)}
                          style={{ borderBottom: '1px solid rgba(29,31,32,.1)', cursor: 'pointer' }}
                        >
                          <th scope="row" style={{ padding: '12px 16px', fontFamily: 'var(--font-head)', fontSize: 16, letterSpacing: '.02em', textAlign: 'left', fontWeight: 400 }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openDetail(p);
                              }}
                              style={{ background: 'none', border: 0, padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}
                            >
                              {p.name}
                            </button>
                          </th>
                          <td className="break-word" style={{ padding: '12px 16px', color: 'var(--muted)', fontSize: 12 }}>
                            {p.code}
                          </td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'var(--font-head)', fontSize: 15 }}>{p.watt}</td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{p.lumens}</td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{p.dim}</td>
                          <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'var(--font-head)', fontSize: 16, color: 'var(--navy)', whiteSpace: 'nowrap' }}>
                            {priceOf(p)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

/* A real <button> so the card is reachable by keyboard and announced correctly. */
function ProductCard({ p, price, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="blueprint hov-lift"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        background: 'rgba(255,255,255,.55)',
        padding: 0,
        cursor: 'pointer',
        textAlign: 'left',
        font: 'inherit',
        color: 'inherit',
        border: '1px solid var(--line)',
      }}
    >
      <Corners />
      <span
        style={{
          position: 'relative',
          height: 172,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'radial-gradient(circle at 50% 40%,rgba(89,128,166,.12),transparent 68%)',
          borderBottom: '1px solid var(--line-soft)',
        }}
      >
        <img src={p.img} alt={p.name} loading="lazy" className="zoom-img" style={{ maxHeight: 132, maxWidth: '78%', objectFit: 'contain' }} />
        <span
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            padding: '4px 9px',
            background: 'rgba(29,45,61,.9)',
            color: 'var(--bg)',
            fontSize: 10,
            letterSpacing: '.12em',
            textTransform: 'uppercase',
          }}
        >
          {p.watt}W
        </span>
      </span>
      <span style={{ display: 'block', padding: '16px 18px 18px', flex: '1 1 auto' }}>
        <span
          style={{
            display: 'block',
            fontFamily: 'var(--font-head)',
            fontWeight: 600,
            fontSize: 19,
            lineHeight: 1.1,
            letterSpacing: '.02em',
            textTransform: 'uppercase',
            marginBottom: 5,
          }}
        >
          {p.name}
        </span>
        <span className="break-word" style={{ display: 'block', fontSize: 11.5, letterSpacing: '.06em', color: 'var(--muted-2)', marginBottom: 14 }}>
          {p.code}
        </span>
        <span
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px 12px',
            paddingTop: 12,
            borderTop: '1px dashed rgba(29,31,32,.16)',
          }}
        >
          <span>
            <span style={{ display: 'block', fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted-2)' }}>
              Lumens
            </span>
            <span style={{ display: 'block', fontFamily: 'var(--font-head)', fontSize: 16 }}>{p.lumens}</span>
          </span>
          <span>
            <span style={{ display: 'block', fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted-2)' }}>
              Dimension
            </span>
            <span style={{ display: 'block', fontFamily: 'var(--font-head)', fontSize: 16 }}>{p.dim}</span>
          </span>
        </span>
        <span
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 10,
            marginTop: 14,
            paddingTop: 12,
            borderTop: '1px solid var(--line-soft)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-head)', fontSize: 20, color: 'var(--navy)' }}>{price}</span>
          <span style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent-dark)', whiteSpace: 'nowrap' }}>
            Details →
          </span>
        </span>
      </span>
    </button>
  );
}
