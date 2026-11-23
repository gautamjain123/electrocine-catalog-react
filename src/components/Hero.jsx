import { useNavigate } from 'react-router-dom';
import { CATS, CAT_IMG, INSTAGRAM_POSTS, PRODUCTS, origOf, srcSetOf } from '../data/catalog.js';
import { useApp } from '../lib/ui.jsx';

/* Hero — editorial night photography.
   Left: a big serif headline (with a small inline photo set into the words),
   the pitch, CTAs and key figures. Right: two real night photographs of new
   fittings, layered as tall cards with floating spec tags. Bottom: a slim
   strip of the six families as quick links.
   Photos are shown at or below their native size (Spark 449×675, Mushroom
   Bollard 330×820) — never upscaled. */

const SPARK = PRODUCTS.find((p) => p.code === 'NEW.SPARK.36');
const MUSHROOM = PRODUCTS.find((p) => p.code === 'NEW.MUSHROOM.10');

export default function Hero() {
  const navigate = useNavigate();
  const { openDetail, openCategory } = useApp();
  const go = (to) => () => {
    navigate(to);
    window.scrollTo(0, 0);
  };

  return (
    <section className="hero">
      <div className="container hero-main">
        <div className="hero-copy">
          <p className="t-kicker hero-kicker">Electrocine Industries · Made in India</p>
          <h1 className="hero-title">
            Light for every <em>space</em> in India.
          </h1>
          <p className="hero-lead">
            Panels, battens, street and flood, landscape and industrial luminaires — manufactured to declared lumen, efficacy and IP
            figures. Every SKU ships with its spec sheet.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-dark" onClick={go('/products')}>
              Browse the range <span aria-hidden="true" className="btn-arrow">→</span>
            </button>
            <button className="btn-outline" onClick={go('/contact')}>
              Request price list
            </button>
          </div>
          <dl className="hero-facts">
            <div>
              <dd>140+</dd>
              <dt>Catalogued SKUs</dt>
            </div>
            <div>
              <dd>&gt;130</dd>
              <dt>Lumens per watt</dt>
            </div>
            <div>
              <dd>6</dd>
              <dt>Product families</dt>
            </div>
          </dl>
        </div>

        <div className="hero-visual">
          <span className="hero-halo" aria-hidden="true" />
          <button type="button" className="hero-photo hero-photo-a" onClick={() => SPARK && openDetail(SPARK)} aria-label="Spark 36 W LED post top — open specification">
            <img src="/ig/spark-post-top.jpg" width="449" height="675" alt="Spark 36 W LED post top light by Electrocine, lit at night" loading="eager" fetchpriority="high" />
          </button>
          <button type="button" className="hero-photo hero-photo-b" onClick={() => MUSHROOM && openDetail(MUSHROOM)} aria-label="Mushroom Bollard 10 W — open specification">
            <img src="/ig/mushroom-bollard.jpg" width="330" height="820" alt="Mushroom bollards lighting a garden path" loading="eager" />
          </button>
          <a className="hero-tag hero-tag-a" href={INSTAGRAM_POSTS[0].href} target="_blank" rel="noopener noreferrer">
            <span className="hero-tag-dot" aria-hidden="true" />
            <span>
              <strong>Spark · 36 W post top</strong>
              <small>New · IP65 · CW / WW / NW</small>
            </span>
          </a>
          <a className="hero-tag hero-tag-b" href={INSTAGRAM_POSTS[1].href} target="_blank" rel="noopener noreferrer">
            <span className="hero-tag-dot" aria-hidden="true" />
            <span>
              <strong>Mushroom Bollard · 10 W</strong>
              <small>New · 175 × 500 mm</small>
            </span>
          </a>
          <span className="hero-seal" aria-hidden="true">
            <strong>BIS</strong>
            <small>ISO 9001 · RoHS</small>
          </span>
        </div>
      </div>

      <div className="container hero-strip">
        <span className="hero-strip-label">Explore the range</span>
        <ul>
          {CATS.map((c) => (
            <li key={c.id}>
              <button type="button" onClick={() => openCategory(c.id)}>
                <span className="hero-strip-img" aria-hidden="true">
                  <img src={origOf(CAT_IMG[c.id])} srcSet={srcSetOf(CAT_IMG[c.id])} alt="" />
                </span>
                <span>{c.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
