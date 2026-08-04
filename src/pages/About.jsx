import { useNavigate } from 'react-router-dom';
import { PILLARS, TIMELINE } from '../data/catalog.js';
import { Corners, GridLines } from '../lib/ui.jsx';

export default function About() {
  const navigate = useNavigate();

  return (
    <main id="main">
      <section
        className="on-dark"
        style={{ position: 'relative', overflow: 'hidden', background: 'var(--navy)', color: 'var(--bg)', paddingBlock: 'clamp(40px,6vw,64px) clamp(56px,8vw,84px)' }}
      >
        <GridLines />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-50%',
            right: '-6%',
            width: '48vw',
            height: '48vw',
            borderRadius: '50%',
            filter: 'blur(100px)',
            opacity: 0.4,
            background: 'radial-gradient(circle,#5980a6,transparent 68%)',
            animation: 'aurora 24s ease-in-out infinite',
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
                Company
              </li>
            </ol>
          </nav>
          <h1 className="t-h1" style={{ fontSize: 'clamp(34px,6vw,70px)', lineHeight: 0.98, margin: '0 0 18px', maxWidth: '22ch' }}>
            An Indian manufacturer of LED luminaires.
          </h1>
          <p className="t-lead" style={{ color: 'rgba(242,242,243,.7)', maxWidth: '64ch', margin: 0 }}>
            We design, build and document the fittings ourselves — so the figure on the price list is the figure on the test
            report.
          </p>
        </div>
      </section>

      <section className="container section-y">
        <div className="g g-cards" style={{ marginBottom: 'clamp(56px,8vw,96px)' }}>
          {PILLARS.map((p) => (
            <article
              key={p.kicker}
              className="blueprint hov-cert"
              style={{ position: 'relative', padding: '32px 28px', background: 'linear-gradient(#fff,rgba(255,255,255,.35))' }}
            >
              <Corners />
              <p style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 16px' }}>
                {p.kicker}
              </p>
              <h2 className="t-h3" style={{ fontSize: 'clamp(21px,2.4vw,27px)', marginBottom: 12 }}>
                {p.title}
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0 }}>{p.body}</p>
            </article>
          ))}
        </div>

        <p className="t-kicker" style={{ color: 'var(--accent)' }}>
          Company journey
        </p>
        <h2 className="t-h2" style={{ marginBottom: 44, maxWidth: '20ch' }}>
          From a single fitting to a full series.
        </h2>
        <ol style={{ borderLeft: '1px solid rgba(29,31,32,.2)', listStyle: 'none', margin: 0, padding: 0 }}>
          {TIMELINE.map((t) => (
            <li
              key={t.year}
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'minmax(0,1fr)',
                gap: 10,
                padding: '0 0 44px 34px',
              }}
            >
              <span
                aria-hidden="true"
                style={{ position: 'absolute', left: -6, top: 6, width: 11, height: 11, background: 'var(--bg)', border: '1px solid var(--accent)' }}
              />
              <div className="g g-timeline">
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 'clamp(24px,3vw,30px)', lineHeight: 1, color: 'var(--accent)' }}>
                  {t.year}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-head)',
                      fontWeight: 600,
                      fontSize: 'clamp(19px,2.2vw,23px)',
                      letterSpacing: '.02em',
                      textTransform: 'uppercase',
                      margin: '0 0 8px',
                    }}
                  >
                    {t.title}
                  </h3>
                  <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0, maxWidth: '64ch' }}>{t.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <aside style={{ marginTop: 56, padding: '30px 28px', background: 'rgba(89,128,166,.09)', border: '1px solid rgba(89,128,166,.34)' }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 19, letterSpacing: '.05em', textTransform: 'uppercase', margin: '0 0 6px' }}>
            Placeholder notice
          </h2>
          <p style={{ fontSize: 14.5, color: 'var(--ink-2)', margin: 0, maxWidth: '78ch' }}>
            Milestone years, plant capacity, headcount and export markets above are realistic placeholders — the catalogue does
            not carry company history. Send us the real dates and we will swap them in verbatim.
          </p>
        </aside>
      </section>
    </main>
  );
}
