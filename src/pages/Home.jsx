import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CATS,
  PRODUCTS,
  MODELS,
  SPEC_SETS,
  BENTO_IMGS,
  DECLARED_SPECS,
  SERVICES,
  INDUSTRIES,
  PARTNERS,
  CERTIFICATES,
  TESTIMONIALS,
  PROCESS,
  FAQS,
  COUNTER_TARGETS,
  COUNTER_LABELS,
  FEATURED_MODELS,
  INSTAGRAM_POSTS,
  INSTAGRAM_URL,
  origOf,
  srcSetOf,
} from '../data/catalog.js';
import { useApp, useReveal } from '../lib/ui.jsx';
import Hero from '../components/Hero.jsx';
import ModelCard from '../components/ModelCard.jsx';

const SPEC_TABS = [
  { key: 'series', label: 'Series-wide', rows: DECLARED_SPECS },
  { key: 'panel', label: 'Panels', rows: SPEC_SETS.panel },
  { key: 'linear', label: 'Linear', rows: SPEC_SETS.linear },
  { key: 'outdoor', label: 'Outdoor', rows: SPEC_SETS.outdoor },
];

const COUNTER_DISPLAYS = [`${COUNTER_TARGETS[0]}+`, `${COUNTER_TARGETS[1]} yrs`,`${COUNTER_TARGETS[2]}`, `${COUNTER_TARGETS[3]}h`];

const NEW_PHOTOS = [
  { code: 'NEW.SPARK.36', src: '/ig/spark-post-top.jpg', w: 449, h: 675, post: INSTAGRAM_POSTS[0] },
  { code: 'NEW.MUSHROOM.10', src: '/ig/mushroom-bollard.jpg', w: 330, h: 820, post: INSTAGRAM_POSTS[1] },
];

function Head({ kicker, children, aside, dark = false }) {
  return (
    <div className="h-head">
      <div>
        <p className="t-kicker" style={{ color: dark ? 'var(--accent-light)' : 'var(--accent)' }}>
          {kicker}
        </p>
        <h2 className="h-title">{children}</h2>
      </div>
      {aside}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { openCategory, openDetail } = useApp();
  const [specTab, setSpecTab] = useState('series');
  const [faq, setFaq] = useState(0);

  useReveal();

  const go = (to) => () => {
    navigate(to);
    window.scrollTo(0, 0);
  };

  const families = CATS.map((c, i) => ({
    ...c,
    no: String(i + 1).padStart(2, '0'),
    skus: PRODUCTS.filter((p) => p.cat === c.id).length,
    fittings: MODELS.filter((m) => m.cat === c.id).length,
    img: BENTO_IMGS[i],
  }));
  const specRows = SPEC_TABS.find((t) => t.key === specTab).rows;
  const bulkhead = INSTAGRAM_POSTS[2];

  return (
    <>
      <Hero />

      <main id="main" className="home">
        {/* ── trust strip ── */}
        <div className="h-strip">
          <div className="container h-strip-row">
            {['BIS registered', 'ISO 9001', 'RoHS compliant', 'LM-79 / LM-80 reports', 'Make in India'].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── the range: an editorial index ── */}
        <section id="range" data-reveal className="container h-sec">
          <Head
            kicker="The range"
            aside={
              <button className="btn-outline" onClick={go('/products')}>
                Full catalogue →
              </button>
            }
          >
            Six families, <em>one</em> spec language.
          </Head>
          <ol className="h-index">
            {families.map((c) => (
              <li key={c.id}>
                <button type="button" className="h-index-row" onClick={() => openCategory(c.id)}>
                  <span className="h-index-no">{c.no}</span>
                  <span className="h-index-name">{c.name}</span>
                  <span className="h-index-blurb">{c.blurb}</span>
                  <span className="h-index-meta">
                    {c.range}
                    <small>
                      {c.fittings} fittings · {c.skus} SKUs
                    </small>
                  </span>
                  <span className="h-index-thumb" aria-hidden="true">
                    <img src={origOf(c.img)} srcSet={srcSetOf(c.img)} alt="" loading="lazy" decoding="async" />
                  </span>
                  <span className="h-index-go" aria-hidden="true">
                    →
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </section>

        {/* ── new launches ── */}
        <section data-reveal className="h-night">
          <div className="container h-sec h-launch">
            <div className="h-launch-copy">
              <p className="t-kicker" style={{ color: 'var(--accent-light)' }}>
                New this season
              </p>
              <h2 className="h-title">
                Two new ways to light <em>the way home.</em>
              </h2>
              <p className="h-launch-lead">
                Spark, a 36 W post top with a faceted PC diffuser that throws a diamond-like pattern, and the Mushroom Bollard, a
                10 W pathway light on an inbuilt mounting plate. Both IP65, both in warm, neutral and cool white.
              </p>
              <div className="h-launch-more">
                <a href={bulkhead.href} target="_blank" rel="noopener noreferrer">
                  Also new: {bulkhead.title} ↗
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  Follow @electrocine ↗
                </a>
              </div>
            </div>
            {NEW_PHOTOS.map((n) => {
              const p = PRODUCTS.find((x) => x.code === n.code);
              return (
                <figure key={n.code} className="h-launch-photo">
                  <button type="button" onClick={() => p && openDetail(p)} aria-label={`${n.post.title} — open specification`}>
                    <img src={n.src} width={n.w} height={n.h} alt={n.post.title} loading="lazy" decoding="async" />
                  </button>
                  <figcaption>
                    <span>{n.post.title}</span>
                    <small>{p ? `${p.ip} · ${p.cct}` : ''}</small>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        {/* ── featured fittings ── */}
        <section data-reveal className="h-sand">
          <div className="container h-sec">
            <Head
              kicker="Featured fittings"
              aside={
                <button className="btn btn-dark" onClick={go('/products')}>
                  All {MODELS.length} fittings <span className="btn-arrow">→</span>
                </button>
              }
            >
              Pick a fitting. <em>Pick a wattage.</em>
            </Head>
            <div className="h-featured">
              {FEATURED_MODELS.slice(0, 4).map((m) => (
                <ModelCard key={m.key} model={m} />
              ))}
            </div>
          </div>
        </section>

        {/* ── company + declared spec ── */}
        <section id="technology" data-reveal className="container h-sec">
          <div className="h-company">
            <div>
              <p className="t-kicker" style={{ color: 'var(--accent)' }}>
                The company
              </p>
              <h2 className="h-statement">
                A lighting manufacturer that <em>publishes</em> its numbers — and builds to them.
              </h2>
              <p className="h-body">
                Die-cast aluminium and powder-coated CRCA bodies, polycarbonate diffusers and drivers rated for a 110–270 V supply.
                Chip and driver sourcing is declared per SKU, so a tender submission can be checked line by line against the bill of
                materials.
              </p>
              <p className="h-partners">
                <span>Components from</span>
                {PARTNERS.map((p) => (
                  <strong key={p.name}>{p.name}</strong>
                ))}
              </p>
            </div>
            <div className="h-spec">
              <div className="h-spec-tabs" role="group" aria-label="Specification family">
                {SPEC_TABS.map((t) => (
                  <button key={t.key} aria-pressed={specTab === t.key} onClick={() => setSpecTab(t.key)}>
                    {t.label}
                  </button>
                ))}
              </div>
              <table className="h-spec-table">
                <caption className="visually-hidden">Declared specification for the selected product family</caption>
                <tbody>
                  {specRows.map((r) => (
                    <tr key={r.k}>
                      <th scope="row">{r.k}</th>
                      <td>{r.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="h-spec-note">Minimum values unless stated. Dimensions in mm.</p>
            </div>
          </div>
        </section>

        {/* ── what we do + where it goes ── */}
        <section data-reveal className="h-sand">
          <div className="container h-sec">
            <Head kicker="What we do">
              Manufacturing, supply and the <em>paperwork.</em>
            </Head>
            <div className="h-cols">
              {SERVICES.map((sv, i) => (
                <article key={sv.name} className="h-col">
                  <span className="h-col-no">0{i + 1}</span>
                  <h3>{sv.name}</h3>
                  <p>{sv.blurb}</p>
                  <ul>
                    {sv.points.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="applications" data-reveal className="container h-sec">
          <Head kicker="Where it goes">
            Specified across <em>eight</em> kinds of space.
          </Head>
          <div className="h-apps">
            {INDUSTRIES.map((i) => (
              <article key={i.no} className="h-app">
                <span>{i.no}</span>
                <h3>{i.name}</h3>
                <p>{i.blurb}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── numbers + compliance ── */}
        <section data-reveal className="h-sand">
          <div className="container h-sec">
            <dl className="h-numbers">
              {COUNTER_LABELS.map((label, i) => (
                <div key={label}>
                  <dd>{COUNTER_DISPLAYS[i]}</dd>
                  <dt>{label}</dt>
                </div>
              ))}
            </dl>
            <div className="h-certs">
              <h2 className="h-certs-title">Compliance &amp; certification</h2>
              {CERTIFICATES.map((c) => (
                <article key={c.name}>
                  <h3>{c.name}</h3>
                  <p>{c.scope}</p>
                  <small>{c.ref}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── testimonials ── */}
        <section data-reveal className="container h-sec">
          <Head kicker="In the field">
            What buyers say after the <em>second</em> order.
          </Head>
          <div className="h-quotes">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name}>
                <span className="h-quote-mark" aria-hidden="true">
                  “
                </span>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── process ── */}
        <section data-reveal className="h-night">
          <div className="container h-sec">
            <Head kicker="How an order runs" dark>
              Enquiry to dispatch, in <em>five</em> steps.
            </Head>
            <ol className="h-steps">
              {PROCESS.map((p, i) => (
                <li key={p.no}>
                  <span className="h-step-dot">{i + 1}</span>
                  <h3>{p.name}</h3>
                  <p>{p.blurb}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── faq ── */}
        <section data-reveal className="container h-sec">
          <div className="h-faq-grid">
            <div>
              <p className="t-kicker" style={{ color: 'var(--accent)' }}>
                Questions
              </p>
              <h2 className="h-title">
                Before you raise a <em>purchase order.</em>
              </h2>
              <p className="h-body" style={{ marginTop: 18 }}>
                Anything not covered here, our technical desk answers in writing within one working day.
              </p>
            </div>
            <div className="h-faq">
              {FAQS.map((f, i) => {
                const open = faq === i;
                return (
                  <div key={f.q} className="h-faq-item" data-open={open ? '' : undefined}>
                    <h3>
                      <button onClick={() => setFaq(open ? -1 : i)} aria-expanded={open} aria-controls={`faq-panel-${i}`} id={`faq-btn-${i}`}>
                        <span>{f.q}</span>
                        <span aria-hidden="true" className="h-faq-icon">
                          +
                        </span>
                      </button>
                    </h3>
                    <div id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-btn-${i}`} hidden={!open}>
                      <p>{f.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── cta ── */}
        <section className="container" style={{ paddingBottom: 'var(--section-y)' }}>
          <div className="h-cta">
            <span className="h-cta-sun" aria-hidden="true" />
            <h2>
              Send us the schedule. We'll send back the <em>price list.</em>
            </h2>
            <div className="h-cta-actions">
              <button className="btn btn-light" onClick={go('/contact')}>
                Request a quote <span className="btn-arrow">→</span>
              </button>
              <button className="btn btn-ghost-light" onClick={go('/products')}>
                View products
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
