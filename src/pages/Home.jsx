import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CATS,
  PRODUCTS,
  SPEC_SETS,
  BENTO_IMGS,
  HERO_STATS,
  DECLARED_SPECS,
  SERVICES,
  INDUSTRIES,
  PARTNERS,
  PARTNER_NAMES,
  CERTIFICATES,
  TESTIMONIALS,
  PROCESS,
  FAQS,
  COUNTER_TARGETS,
  COUNTER_LABELS,
  IMG,
} from '../data/catalog.js';
import { useApp, useReveal, useCounters, useInView, Corners, Icon, GridLines } from '../lib/ui.jsx';

const HERO_FLOATERS = [
  { name: 'Backlit Panel 600×600', code: 'BLPR.05', spec: '25 W · 2500 Lm', img: IMG.backlitRecess },
  { name: 'LED Street Light', code: 'SL.60', spec: '60 W · IP66', img: IMG.street },
  { name: 'Hexagon Pendant', code: 'HP.36', spec: '36 W · 3600 Lm', img: IMG.pendant },
  { name: 'Slim Recess Panel', code: 'SRP.04', spec: '15 W · Ø170', img: IMG.slimRecess },
];

const kickerStyle = (color) => ({ color, marginBottom: 14 });

export default function Home() {
  const navigate = useNavigate();
  const { openCategory } = useApp();

  const [bentoFilter, setBentoFilter] = useState('all');
  const [specTab, setSpecTab] = useState('panel');
  const [faq, setFaq] = useState(0);
  const spotlightRef = useRef(null);
  const carouselRef = useRef(null);

  useReveal([bentoFilter]);
  const [countersRef, countersSeen] = useInView({ threshold: 0.15 });
  const counters = useCounters(COUNTER_TARGETS, countersSeen);

  const go = (to) => () => {
    navigate(to);
    window.scrollTo(0, 0);
  };

  const onHeroMove = (e) => {
    const el = spotlightRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    el.style.transform = `translate3d(${e.clientX - r.left}px,${e.clientY - r.top}px,0)`;
    el.style.opacity = '1';
  };

  const scrollCarousel = (dir) => () => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.firstElementChild?.offsetWidth || 380) + dir * 16, behavior: 'smooth' });
  };

  const bentoAll = CATS.map((c, i) => ({
    ...c,
    kicker: 'Family 0' + (i + 1),
    count: PRODUCTS.filter((p) => p.cat === c.id).length + ' SKUs',
    img: BENTO_IMGS[i],
  }));
  const bento =
    bentoFilter === 'all'
      ? bentoAll
      : bentoFilter === 'indoor'
        ? bentoAll.filter((b) => ['panel', 'batten', 'down', 'decor'].includes(b.id))
        : bentoAll.filter((b) => ['street', 'landscape'].includes(b.id));

  const specRows = specTab === 'panel' ? SPEC_SETS.panel : specTab === 'linear' ? SPEC_SETS.linear : SPEC_SETS.outdoor;
  const counterDisplays = [`${counters[0]}+`, `${counters[1]} yrs`, `${counters[2]}`, `${counters[3]}/7`];

  return (
    <>
      {/* ══ HERO ══ */}
      <section
        className="on-dark"
        onMouseMove={onHeroMove}
        style={{ position: 'relative', overflow: 'hidden', background: 'var(--navy)', color: 'var(--bg)', paddingTop: 'clamp(56px,9vw,96px)' }}
      >
        <GridLines opacity={0.5} color="rgba(255,255,255,.055)" />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-25%',
            left: '-8%',
            width: '62vw',
            height: '62vw',
            borderRadius: '50%',
            filter: 'blur(90px)',
            opacity: 0.5,
            background: 'radial-gradient(circle,#5980a6 0%,transparent 66%)',
            animation: 'aurora 19s ease-in-out infinite',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-40%',
            right: '-12%',
            width: '56vw',
            height: '56vw',
            borderRadius: '50%',
            filter: 'blur(100px)',
            opacity: 0.42,
            background: 'radial-gradient(circle,#b5d9fd 0%,transparent 68%)',
            animation: 'aurora 25s ease-in-out infinite reverse',
          }}
        />
        <div
          ref={spotlightRef}
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: 640,
            height: 640,
            left: 0,
            top: 0,
            margin: '-320px 0 0 -320px',
            pointerEvents: 'none',
            background: 'radial-gradient(circle,rgba(181,217,253,.16) 0%,transparent 62%)',
            transition: 'opacity .4s',
            opacity: 0,
          }}
        />

        <div className="container" style={{ position: 'relative' }}>
          <div className="g g-lg g-split-hero" style={{ paddingBottom: 24 }}>
            <div>
              <p
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '7px 14px',
                  border: '1px solid rgba(255,255,255,.22)',
                  background: 'rgba(255,255,255,.05)',
                  backdropFilter: 'blur(8px)',
                  fontSize: 'clamp(10px,1.4vw,11px)',
                  letterSpacing: '.18em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-light)',
                  margin: '0 0 26px',
                }}
              >
                LED Lighting Series · Catalogue w.e.f. July 2024
              </p>
              <h1 className="t-h1">
                Light, built to a{' '}
                <span
                  style={{
                    background: 'linear-gradient(96deg,#f2f2f3 12%,#b5d9fd 52%,#749dc4 92%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  written specification.
                </span>
              </h1>
              <p className="t-lead" style={{ color: 'rgba(242,242,243,.72)', maxWidth: '52ch', margin: '0 0 34px' }}>
                Electrocine Industries manufactures the full LED luminaire range — panels, battens, street and flood, landscape
                and industrial — to declared lumen, efficacy and IP figures. Every SKU ships with its spec sheet, not a promise.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 46 }}>
                <button className="btn btn-light" onClick={go('/products')}>
                  Browse the catalogue
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(100deg,transparent,rgba(89,128,166,.35),transparent)',
                      animation: 'sweep 4s ease-in-out infinite',
                    }}
                  />
                </button>
                <button className="btn btn-ghost-light" onClick={go('/contact')}>
                  Request price list
                </button>
              </div>

              <dl className="g g-cards-xs g-hair-dark" style={{ margin: 0 }}>
                {HERO_STATS.map((s) => (
                  <div key={s.label} style={{ background: 'var(--navy)', padding: '18px 16px' }}>
                    <dd style={{ margin: 0, fontFamily: 'var(--font-head)', fontSize: 'clamp(26px,3.5vw,32px)', lineHeight: 1 }}>
                      {s.value}
                    </dd>
                    <dt
                      style={{
                        fontSize: 10.5,
                        letterSpacing: '.14em',
                        textTransform: 'uppercase',
                        color: 'rgba(242,242,243,.55)',
                        marginTop: 6,
                      }}
                    >
                      {s.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="floaters">
              {HERO_FLOATERS.map((f) => (
                <div key={f.code}>
                  <div
                    className="blueprint hov-float"
                    style={{
                      position: 'relative',
                      background: 'rgba(242,242,243,.94)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,.34)',
                      boxShadow: '0 22px 60px rgba(0,0,0,.4)',
                      padding: '16px 16px 13px',
                      color: 'var(--ink)',
                    }}
                  >
                    <Corners />
                    <div style={{ height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                      <img src={f.img} alt={f.name} loading="lazy" style={{ maxHeight: 96, maxWidth: '100%', objectFit: 'contain' }} />
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-head)',
                        fontSize: 15,
                        letterSpacing: '.05em',
                        textTransform: 'uppercase',
                        lineHeight: 1.1,
                      }}
                    >
                      {f.name}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: 8,
                        marginTop: 6,
                        paddingTop: 7,
                        borderTop: '1px solid rgba(29,31,32,.14)',
                      }}
                    >
                      <span style={{ fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                        {f.spec}
                      </span>
                      <span style={{ fontFamily: 'var(--font-head)', fontSize: 14, color: 'var(--accent-dark)' }}>{f.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* sourced-from marquee */}
          <div style={{ marginTop: 24, borderTop: '1px solid rgba(255,255,255,.14)', padding: '26px 0 30px' }}>
            <h2
              style={{
                fontSize: 10.5,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: 'rgba(242,242,243,.45)',
                margin: '0 0 16px',
                fontWeight: 400,
                fontFamily: 'var(--font-body)',
              }}
            >
              LED and driver components sourced from
            </h2>
            <div
              aria-hidden="true"
              style={{
                position: 'relative',
                overflow: 'hidden',
                maskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',
                WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',
              }}
            >
              <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 26s linear infinite' }}>
                {PARTNER_NAMES.concat(PARTNER_NAMES).map((n, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: 'var(--font-head)',
                      fontSize: 'clamp(17px,2.4vw,22px)',
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      color: 'rgba(242,242,243,.42)',
                      padding: '0 clamp(20px,4vw,38px)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main id="main">
        {/* ══ INTRO / SPEC PLATE ══ */}
        <section data-reveal className="container section-y">
          <div className="g g-lg g-split" style={{ alignItems: 'start' }}>
            <div>
              <p className="t-kicker" style={kickerStyle('var(--accent)')}>
                01 — The company
              </p>
              <h2 className="t-h2" style={{ marginBottom: 24, maxWidth: '16ch' }}>
                A lighting manufacturer that publishes its numbers.
              </h2>
              <p className="t-body" style={{ color: 'var(--ink-2)', maxWidth: '50ch', margin: '0 0 16px' }}>
                Light emitting diode is a revolutionary source of converting electricity into light — economical, efficient and
                environmentally friendly to use. Electrocine Industries builds that principle into hardware: die-cast aluminium
                and powder-coated CRCA bodies, polycarbonate diffusers, and drivers rated for a 110–270 V supply.
              </p>
              <p className="t-body" style={{ color: 'var(--ink-2)', maxWidth: '50ch', margin: '0 0 28px' }}>
                The catalogue is organised the way a specifier reads it — product code, minimum lumens, overall dimension,
                cut-out, price. Nothing is described that is not measured.
              </p>
              <ul style={{ display: 'flex', gap: 12, flexWrap: 'wrap', listStyle: 'none', margin: 0, padding: 0 }}>
                {['Efficacy > 130 lm/W', 'CRI > 80', 'PF > 0.90'].map((t) => (
                  <li
                    key={t}
                    style={{
                      padding: '7px 13px',
                      border: '1px solid rgba(89,128,166,.5)',
                      background: 'rgba(89,128,166,.09)',
                      fontSize: 11,
                      letterSpacing: '.14em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-dark)',
                    }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="blueprint"
              style={{
                position: 'relative',
                padding: 'clamp(22px,4vw,34px) clamp(18px,3vw,32px)',
                background: 'linear-gradient(#fff,rgba(255,255,255,.4))',
                boxShadow: '0 2px 0 rgba(29,31,32,.05)',
              }}
            >
              <Corners />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: 12,
                  flexWrap: 'wrap',
                  paddingBottom: 16,
                  borderBottom: '1px solid var(--line)',
                  marginBottom: 8,
                }}
              >
                <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 19, letterSpacing: '.09em', textTransform: 'uppercase', margin: 0 }}>
                  Declared specification
                </h3>
                <span style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted-2)' }}>
                  Series-wide
                </span>
              </div>
              <dl style={{ margin: 0 }}>
                {DECLARED_SPECS.map((d) => (
                  <div
                    key={d.k}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      gap: 16,
                      padding: '11px 0',
                      borderBottom: '1px dashed rgba(29,31,32,.14)',
                      alignItems: 'baseline',
                    }}
                  >
                    <dt style={{ fontSize: 13.5, letterSpacing: '.03em', color: 'var(--muted)' }}>{d.k}</dt>
                    <dd style={{ margin: 0, fontFamily: 'var(--font-head)', fontSize: 17, textAlign: 'right' }}>{d.v}</dd>
                  </div>
                ))}
              </dl>
              <p style={{ marginTop: 18, marginBottom: 0, fontSize: 11.5, color: 'var(--muted-2)' }}>
                All dimensions in mm. Figures are minimum values unless stated otherwise.
              </p>
            </div>
          </div>
        </section>

        {/* ══ PRODUCT BENTO ══ */}
        <section id="range" data-reveal className="container" style={{ paddingBottom: 'var(--section-y)' }}>
          <div className="row-between" style={{ marginBottom: 34 }}>
            <div>
              <p className="t-kicker" style={kickerStyle('var(--accent)')}>
                02 — The range
              </p>
              <h2 className="t-h2">Six families. One spec language.</h2>
            </div>
            <div className="chip-group" role="group" aria-label="Filter families">
              {[
                { key: 'all', label: 'All families' },
                { key: 'indoor', label: 'Indoor' },
                { key: 'outdoor', label: 'Outdoor' },
              ].map((b) => (
                <button key={b.key} className="chip" aria-pressed={bentoFilter === b.key} onClick={() => setBentoFilter(b.key)}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <div className="g g-bento">
            {bento.map((c) => (
              <button
                key={c.id}
                onClick={() => openCategory(c.id)}
                className="blueprint hov-lift"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '24px 24px 20px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  font: 'inherit',
                  color: 'inherit',
                  background: 'linear-gradient(150deg,rgba(255,255,255,.85),rgba(255,255,255,.35))',
                }}
              >
                <Corners />
                <GridLines opacity={0.35} size={34} color="rgba(29,31,32,.05)" />
                <span style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <span>
                      <span
                        style={{
                          display: 'block',
                          fontSize: 10.5,
                          letterSpacing: '.16em',
                          textTransform: 'uppercase',
                          color: 'var(--accent)',
                          marginBottom: 7,
                        }}
                      >
                        {c.kicker}
                      </span>
                      <span
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-head)',
                          fontWeight: 600,
                          fontSize: 'clamp(21px,2.4vw,26px)',
                          lineHeight: 1.04,
                          letterSpacing: '.01em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {c.name}
                      </span>
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-head)',
                        fontSize: 13,
                        letterSpacing: '.08em',
                        color: 'var(--muted-2)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {c.count}
                    </span>
                  </span>
                  <span style={{ display: 'block', fontSize: 13.5, lineHeight: 1.5, color: 'var(--muted)', margin: '10px 0 0', maxWidth: '42ch' }}>
                    {c.blurb}
                  </span>
                  <span
                    style={{
                      flex: '1 1 auto',
                      minHeight: 78,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '16px 0',
                    }}
                  >
                    <img
                      src={c.img}
                      alt=""
                      loading="lazy"
                      style={{ maxHeight: 118, maxWidth: '66%', objectFit: 'contain' }}
                    />
                  </span>
                  <span
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 10,
                      paddingTop: 12,
                      borderTop: '1px solid rgba(29,31,32,.14)',
                    }}
                  >
                    <span style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                      {c.range}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-head)',
                        fontSize: 13,
                        letterSpacing: '.1em',
                        textTransform: 'uppercase',
                        color: 'var(--accent-dark)',
                      }}
                    >
                      Open →
                    </span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ══ SERVICES ══ */}
        <section className="on-dark" style={{ background: 'var(--navy)', color: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
          <GridLines />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '50vw',
              height: '50vw',
              borderRadius: '50%',
              filter: 'blur(110px)',
              opacity: 0.34,
              background: 'radial-gradient(circle,#5980a6,transparent 68%)',
              animation: 'aurora 23s ease-in-out infinite',
            }}
          />
          <div data-reveal className="container section-y" style={{ position: 'relative' }}>
            <p className="t-kicker" style={kickerStyle('var(--accent-light)')}>
              03 — What we do
            </p>
            <h2 className="t-h2" style={{ marginBottom: 12, maxWidth: '22ch' }}>
              Manufacturing, supply and the paperwork that goes with it.
            </h2>
            <p className="t-body" style={{ color: 'rgba(242,242,243,.66)', maxWidth: '60ch', margin: '0 0 44px' }}>
              Four capabilities, offered to distributors, dealers and government tender buyers.
            </p>

            <div className="g g-cards">
              {SERVICES.map((sv) => (
                <article key={sv.name} className="svc">
                  <div
                    className="svc-inner"
                    style={{
                      position: 'relative',
                      height: '100%',
                      background: 'rgba(29,45,61,.86)',
                      backdropFilter: 'blur(8px)',
                      padding: '28px 24px 26px',
                    }}
                  >
                    <span
                      style={{
                        width: 42,
                        height: 42,
                        border: '1px solid rgba(255,255,255,.28)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 22,
                        color: 'var(--accent-light)',
                      }}
                    >
                      <Icon path={sv.icon} />
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-head)',
                        fontWeight: 600,
                        fontSize: 22,
                        letterSpacing: '.03em',
                        textTransform: 'uppercase',
                        margin: '0 0 10px',
                      }}
                    >
                      {sv.name}
                    </h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.55, color: 'rgba(242,242,243,.62)', margin: 0 }}>{sv.blurb}</p>
                    <div className="svc-detail">
                      <ul
                        style={{
                          paddingTop: 16,
                          marginTop: 16,
                          marginBottom: 0,
                          borderTop: '1px solid rgba(255,255,255,.16)',
                          listStyle: 'none',
                          paddingLeft: 0,
                        }}
                      >
                        {sv.points.map((t) => (
                          <li key={t} style={{ display: 'flex', gap: 9, fontSize: 12.5, color: 'rgba(242,242,243,.78)', padding: '4px 0' }}>
                            <span aria-hidden="true" style={{ color: 'var(--accent-light)' }}>
                              —
                            </span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══ APPLICATIONS ══ */}
        <section id="applications" data-reveal className="container section-y">
          <p className="t-kicker" style={kickerStyle('var(--accent)')}>
            04 — Where it goes
          </p>
          <h2 className="t-h2" style={{ marginBottom: 40, maxWidth: '20ch' }}>
            Specified across eight application classes.
          </h2>
          <div className="g g-cards-sm g-hair">
            {INDUSTRIES.map((i) => (
              <article key={i.no} className="hov-white" style={{ background: 'var(--bg)', padding: '28px 24px 26px' }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-head)', fontSize: 13, letterSpacing: '.14em', color: 'var(--accent)', marginBottom: 16 }}>
                  {i.no}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-head)',
                    fontWeight: 600,
                    fontSize: 21,
                    lineHeight: 1.08,
                    letterSpacing: '.02em',
                    textTransform: 'uppercase',
                    margin: '0 0 9px',
                  }}
                >
                  {i.name}
                </h3>
                <p style={{ fontSize: 12.5, lineHeight: 1.5, color: 'var(--muted)', margin: 0 }}>{i.blurb}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ══ TECHNOLOGY ══ */}
        <section id="technology" data-reveal className="container" style={{ paddingBottom: 'var(--section-y)' }}>
          <div className="g g-lg g-split-tech" style={{ alignItems: 'start' }}>
            <div>
              <p className="t-kicker" style={kickerStyle('var(--accent)')}>
                05 — Technology
              </p>
              <h2 className="t-h2" style={{ marginBottom: 22 }}>
                Components we will name in writing.
              </h2>
              <p className="t-body" style={{ color: 'var(--ink-2)', margin: '0 0 26px' }}>
                Chip and driver sourcing is declared per SKU, so a tender submission can be checked line by line against the bill
                of materials.
              </p>
              <div className="g g-cards-xs g-hair">
                {PARTNERS.map((p) => (
                  <div key={p.name} className="hov-white" style={{ background: 'var(--bg)', padding: '20px 18px' }}>
                    <div style={{ fontFamily: 'var(--font-head)', fontSize: 19, letterSpacing: '.06em', textTransform: 'uppercase' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted-2)', marginTop: 4 }}>
                      {p.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="blueprint" style={{ position: 'relative', background: '#fff' }}>
              <Corners />
              <div className="chip-group" role="group" aria-label="Specification family" style={{ border: 0, borderBottom: '1px solid var(--line)' }}>
                {[
                  { key: 'panel', label: 'Panels' },
                  { key: 'linear', label: 'Linear' },
                  { key: 'outdoor', label: 'Outdoor' },
                ].map((t) => (
                  <button key={t.key} className="chip chip-grow" aria-pressed={specTab === t.key} onClick={() => setSpecTab(t.key)}>
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="table-scroll">
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5, minWidth: 320 }}>
                  <caption className="visually-hidden">Declared specification for the selected product family</caption>
                  <thead>
                    <tr style={{ background: 'rgba(89,128,166,.1)' }}>
                      {['Parameter', 'Value'].map((th, i) => (
                        <th
                          key={th}
                          scope="col"
                          style={{
                            textAlign: i ? 'right' : 'left',
                            padding: '12px 18px',
                            fontFamily: 'var(--font-head)',
                            fontSize: 12,
                            letterSpacing: '.14em',
                            textTransform: 'uppercase',
                            color: 'var(--accent-dark)',
                          }}
                        >
                          {th}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {specRows.map((r) => (
                      <tr key={r.k} style={{ borderBottom: '1px solid rgba(29,31,32,.1)' }}>
                        <th scope="row" style={{ padding: '12px 18px', color: 'var(--muted)', textAlign: 'left', fontWeight: 400 }}>
                          {r.k}
                        </th>
                        <td style={{ padding: '12px 18px', textAlign: 'right', fontFamily: 'var(--font-head)', fontSize: 16 }}>{r.v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ══ ACHIEVEMENTS + CERTIFICATES ══ */}
        <section
          ref={countersRef}
          data-reveal
          style={{ background: '#e9e9ea', borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}
        >
          <div className="container" style={{ paddingBlock: 'clamp(56px,7vw,80px)' }}>
            <dl className="g g-counters" style={{ margin: 0 }}>
              {COUNTER_LABELS.map((label, i) => (
                <div key={label}>
                  <dd
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-head)',
                      fontWeight: 600,
                      fontSize: 'clamp(38px,5.5vw,68px)',
                      lineHeight: 0.94,
                      letterSpacing: '-.02em',
                      color: 'var(--navy)',
                    }}
                  >
                    {counterDisplays[i]}
                  </dd>
                  <div style={{ height: 1, background: 'rgba(29,31,32,.2)', margin: '14px 0 12px' }} />
                  <dt style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>{label}</dt>
                </div>
              ))}
            </dl>
            <div className="row-between" style={{ marginBottom: 24 }}>
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 'clamp(24px,3vw,30px)', letterSpacing: '.02em', textTransform: 'uppercase', margin: 0 }}>
                Compliance &amp; certification
              </h2>
              <span style={{ fontSize: 11.5, color: 'var(--muted-2)', maxWidth: '44ch' }}>
                Certificate numbers and issue dates are placeholders pending your documents.
              </span>
            </div>
            <div className="g g-cards-sm">
              {CERTIFICATES.map((c) => (
                <article key={c.name} className="blueprint hov-cert" style={{ position: 'relative', background: 'var(--bg)', padding: '22px 20px' }}>
                  <Corners />
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 38,
                      height: 38,
                      border: '1px solid rgba(89,128,166,.45)',
                      color: 'var(--accent)',
                      marginBottom: 18,
                    }}
                  >
                    <Icon path='<path d="M12 2 4 6v6c0 5 8 10 8 10s8-5 8-10V6z"></path><path d="m9 12 2 2 4-4"></path>' size={18} />
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-head)',
                      fontWeight: 600,
                      fontSize: 19,
                      letterSpacing: '.05em',
                      textTransform: 'uppercase',
                      margin: '0 0 6px',
                    }}
                  >
                    {c.name}
                  </h3>
                  <p style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.45, margin: 0 }}>{c.scope}</p>
                  <p
                    style={{
                      marginTop: 14,
                      marginBottom: 0,
                      paddingTop: 12,
                      borderTop: '1px dashed rgba(29,31,32,.18)',
                      fontSize: 11,
                      letterSpacing: '.1em',
                      textTransform: 'uppercase',
                      color: 'var(--muted-2)',
                    }}
                  >
                    {c.ref}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══ */}
        <section data-reveal className="container section-y">
          <div className="row-between" style={{ marginBottom: 36 }}>
            <div>
              <p className="t-kicker" style={kickerStyle('var(--accent)')}>
                06 — In the field
              </p>
              <h2 className="t-h2" style={{ maxWidth: '20ch' }}>
                What buyers say after the second order.
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 1, background: 'var(--line)', border: '1px solid var(--line)' }}>
              <button className="chip" onClick={scrollCarousel(-1)} aria-label="Previous testimonial" style={{ width: 48 }}>
                ←
              </button>
              <button className="chip" onClick={scrollCarousel(1)} aria-label="Next testimonial" style={{ width: 48 }}>
                →
              </button>
            </div>
          </div>
          <div className="carousel" ref={carouselRef} tabIndex={0} aria-label="Customer testimonials">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="blueprint" style={{ position: 'relative', margin: 0, background: 'rgba(255,255,255,.62)', backdropFilter: 'blur(12px)', padding: '30px 26px' }}>
                <Corners />
                <div aria-label="Rated 5 out of 5" style={{ marginBottom: 18, color: 'var(--accent)' }}>
                  ★★★★★
                </div>
                <blockquote style={{ margin: '0 0 22px', fontSize: 'clamp(14.5px,1.5vw,16px)', lineHeight: 1.58, color: '#2b2b2d' }}>
                  {t.quote}
                </blockquote>
                <figcaption style={{ paddingTop: 16, borderTop: '1px solid rgba(29,31,32,.14)' }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-head)', fontSize: 17, letterSpacing: '.05em', textTransform: 'uppercase' }}>
                    {t.name}
                  </span>
                  <span style={{ display: 'block', fontSize: 12, color: 'var(--muted-2)', marginTop: 2 }}>{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ══ PROCESS ══ */}
        <section data-reveal className="on-dark" style={{ background: 'var(--navy)', color: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
          <GridLines />
          <div className="container section-y" style={{ position: 'relative' }}>
            <p className="t-kicker" style={kickerStyle('var(--accent-light)')}>
              07 — How an order runs
            </p>
            <h2 className="t-h2" style={{ marginBottom: 52, maxWidth: '20ch' }}>
              Enquiry to dispatch, in five steps.
            </h2>
            <ol className="g g-process" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {PROCESS.map((p) => (
                <li key={p.no} style={{ position: 'relative', paddingRight: 22 }}>
                  <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <span style={{ width: 11, height: 11, border: '1px solid var(--accent-light)', background: 'var(--navy)', flex: '0 0 auto' }} />
                    <span style={{ flex: '1 1 auto', height: 1, background: 'rgba(255,255,255,.2)' }} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-head)', fontSize: 13, letterSpacing: '.16em', color: 'var(--accent-light)', marginBottom: 10 }}>
                    {p.no}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-head)',
                      fontWeight: 600,
                      fontSize: 21,
                      lineHeight: 1.1,
                      letterSpacing: '.03em',
                      textTransform: 'uppercase',
                      margin: '0 0 9px',
                    }}
                  >
                    {p.name}
                  </h3>
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: 'rgba(242,242,243,.62)', margin: 0, paddingRight: 14 }}>{p.blurb}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ══ FAQ ══ */}
        <section data-reveal className="container section-y">
          <div className="g g-lg g-split-faq" style={{ alignItems: 'start' }}>
            <div>
              <p className="t-kicker" style={kickerStyle('var(--accent)')}>
                08 — Questions
              </p>
              <h2 className="t-h2" style={{ marginBottom: 18 }}>
                Before you raise a purchase order.
              </h2>
              <p className="t-body" style={{ color: 'var(--muted)', margin: 0 }}>
                Anything not covered here, our technical desk answers in writing within one working day.
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--line)' }}>
              {FAQS.map((f, i) => {
                const open = faq === i;
                return (
                  <div key={f.q} style={{ borderBottom: '1px solid var(--line)' }}>
                    <h3 style={{ margin: 0 }}>
                      <button
                        onClick={() => setFaq(open ? -1 : i)}
                        aria-expanded={open}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-btn-${i}`}
                        className="hov-accent"
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: 20,
                          background: 'none',
                          border: 0,
                          padding: '20px 4px',
                          minHeight: 56,
                          textAlign: 'left',
                          cursor: 'pointer',
                          color: 'var(--ink)',
                          fontFamily: 'var(--font-head)',
                          fontSize: 'clamp(18px,2vw,21px)',
                          letterSpacing: '.02em',
                        }}
                      >
                        <span>{f.q}</span>
                        <span
                          aria-hidden="true"
                          style={{
                            fontFamily: 'var(--font-head)',
                            fontSize: 24,
                            color: 'var(--accent)',
                            flex: '0 0 auto',
                            transition: 'transform .3s',
                            transform: `rotate(${open ? '135deg' : '0deg'})`,
                          }}
                        >
                          +
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-btn-${i}`}
                      hidden={!open}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ fontSize: 15.5, lineHeight: 1.62, color: 'var(--ink-2)', margin: 0, padding: '0 8px 24px 4px', maxWidth: '70ch' }}>
                        {f.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="on-dark" style={{ position: 'relative', overflow: 'hidden', background: 'var(--accent)', color: '#fff' }}>
          <GridLines opacity={0.28} size={52} color="rgba(255,255,255,.16)" />
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-50%',
              left: '30%',
              width: '44vw',
              height: '44vw',
              borderRadius: '50%',
              filter: 'blur(90px)',
              opacity: 0.4,
              background: 'radial-gradient(circle,#eef6ff,transparent 66%)',
              animation: 'aurora 21s ease-in-out infinite',
            }}
          />
          <div
            className="container"
            style={{
              position: 'relative',
              paddingBlock: 'clamp(56px,7vw,84px)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 40,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h2 className="t-h2" style={{ marginBottom: 12, maxWidth: '24ch' }}>
                Send us the schedule. We will send back the price list.
              </h2>
              <p className="t-body" style={{ color: 'rgba(255,255,255,.85)', margin: 0, maxWidth: '56ch' }}>
                Distributor terms, tender documentation and sample units for evaluation.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button className="btn btn-dark" onClick={go('/contact')}>
                Request a quote
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
