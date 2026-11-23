import { useNavigate } from 'react-router-dom';
import { CATS, CAT_IMG, IMG, MODELS, PILLARS, PRODUCTS, TIMELINE, origOf, srcSetOf } from '../data/catalog.js';
import { useApp, useReveal } from '../lib/ui.jsx';
import PageHead from '../components/PageHead.jsx';

/* The fitting each milestone introduced, so the history reads as a product story. */
const ERA = [
  { img: IMG.tube, caption: 'T8 retrofit tube' },
  { img: IMG.surfacePanel, caption: 'Surface panel' },
  { img: IMG.street, caption: 'Die-cast street light' },
  { img: IMG.backlitRecess, caption: 'Backlit recess panel' },
  { img: IMG.postTop, caption: 'Post-top lantern' },
];

const FACTS = [
  { v: CATS.length, k: 'Product families' },
  { v: MODELS.length, k: 'Fittings in the series' },
  { v: PRODUCTS.length, k: 'Listed wattages' },
  { v: '110–270 V', k: 'Driver input range' },
];

export default function About() {
  const navigate = useNavigate();
  const { openCategory } = useApp();
  useReveal();
  const go = (to) => () => {
    navigate(to);
    window.scrollTo(0, 0);
  };

  return (
    <main id="main" className="inner">
      <PageHead
        here="Company"
        kicker="Electrocine Industries"
        title={
          <>
            An Indian maker of <em>LED luminaires.</em>
          </>
        }
        lead="We design, build and document the fittings ourselves — so the figure on the price list is the figure on the test report."
        aside={
          <dl className="ph-facts ph-facts-2">
            {FACTS.map((f) => (
              <div key={f.k}>
                <dd>{f.v}</dd>
                <dt>{f.k}</dt>
              </div>
            ))}
          </dl>
        }
      />

      {/* ── principles ── */}
      <section data-reveal className="container in-sec">
        <div className="in-cols">
          {PILLARS.map((p, i) => (
            <article key={p.kicker}>
              <span className="in-no">0{i + 1} · {p.kicker}</span>
              <h2>{p.title}</h2>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── timeline ── */}
      <section data-reveal className="in-sand">
        <div className="container in-sec">
          <p className="t-kicker" style={{ color: 'var(--accent)' }}>
            Company journey
          </p>
          <h2 className="in-title">
            From a single fitting to a <em>full series.</em>
          </h2>
          <ol className="tl">
            {TIMELINE.map((t, i) => (
              <li key={t.year}>
                <span className="tl-year">{t.year}</span>
                <div className="tl-copy">
                  <h3>{t.title}</h3>
                  <p>{t.body}</p>
                </div>
                {ERA[i] && (
                  <figure className="tl-fig">
                    <img src={origOf(ERA[i].img)} srcSet={srcSetOf(ERA[i].img)} alt={ERA[i].caption} loading="lazy" />
                    <figcaption>{ERA[i].caption}</figcaption>
                  </figure>
                )}
              </li>
            ))}
          </ol>
          <p className="in-note">
            Milestone years and descriptions are placeholders — the catalogue does not carry company history. Send the real dates
            and they will be swapped in verbatim.
          </p>
        </div>
      </section>

      {/* ── the range today ── */}
      <section data-reveal className="container in-sec">
        <div className="h-head">
          <div>
            <p className="t-kicker" style={{ color: 'var(--accent)' }}>
              The range today
            </p>
            <h2 className="h-title">
              What we <em>build</em> today.
            </h2>
          </div>
          <button className="btn-outline" onClick={go('/products')}>
            Full catalogue →
          </button>
        </div>
        <ol className="h-index">
          {CATS.map((c, i) => (
            <li key={c.id}>
              <button type="button" className="h-index-row" onClick={() => openCategory(c.id)}>
                <span className="h-index-no">{String(i + 1).padStart(2, '0')}</span>
                <span className="h-index-name">{c.name}</span>
                <span className="h-index-blurb">{c.blurb}</span>
                <span className="h-index-meta">
                  {c.range}
                  <small>{MODELS.filter((m) => m.cat === c.id).length} fittings</small>
                </span>
                <span className="h-index-thumb" aria-hidden="true">
                  <img src={origOf(CAT_IMG[c.id])} srcSet={srcSetOf(CAT_IMG[c.id])} alt="" loading="lazy" />
                </span>
                <span className="h-index-go" aria-hidden="true">
                  →
                </span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      <section className="container" style={{ paddingBottom: 'var(--section-y)' }}>
        <div className="h-cta">
          <span className="h-cta-sun" aria-hidden="true" />
          <h2>
            Ask for a sample unit <em>for evaluation.</em>
          </h2>
          <div className="h-cta-actions">
            <button className="btn btn-light" onClick={go('/contact')}>
              Talk to the technical desk <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
