import { useEffect, useState } from 'react';
import { CATS, efficacy, variantLabel } from '../data/catalog.js';
import { useApp, Corners } from '../lib/ui.jsx';
import ProductShot from './ProductShot.jsx';

const CAT_NAME = Object.fromEntries(CATS.map((c) => [c.id, c.name]));

/* One fitting, photographed large, with its wattages as variants. Selecting a
   variant swaps the figures and price in place; the photo opens the full sheet.
   `variants` is the filtered subset to offer (defaults to all of them).
   `feature` lays the card out landscape, for the lead slot of a grid. */
export default function ModelCard({ model, variants = model.variants, feature = false, tone = 'light' }) {
  const { openDetail, addToQuote, priceOf } = useApp();
  const [code, setCode] = useState(variants[0].code);

  // Filters can remove the selected variant; fall back to the first that is left.
  useEffect(() => {
    if (!variants.some((v) => v.code === code)) setCode(variants[0].code);
  }, [variants, code]);

  const p = variants.find((v) => v.code === code) || variants[0];
  const ip = p.ip || 'IP20';

  return (
    <article className={`model blueprint shot-host spot ${feature ? 'model-feature' : ''} model-${tone}`}>
      <Corners />
      <button type="button" className="model-photo" onClick={() => openDetail(p)} aria-label={`${p.name} — open specification sheet`}>
        <ProductShot src={model.img} alt={`${model.name} — Electrocine LED ${CAT_NAME[model.cat]}`} tone={tone} className="model-shot" />
        <span className="model-tag model-tag-cat">{p.isNew ? "New · " : ""}{CAT_NAME[model.cat]}</span>
        <span className="model-tag model-tag-ip">{ip}</span>
        <span className="model-view" aria-hidden="true">
          View sheet <span>→</span>
        </span>
      </button>

      <div className="model-body">
        <div className="model-head">
          <h3 className="model-name">{model.name}</h3>
          <span className="model-code break-word">{p.code}</span>
        </div>

        {variants.length > 1 ? (
          <div className="model-variants" role="group" aria-label={`${model.name} wattage`}>
            {variants.map((v) => (
              <button key={v.code} type="button" className="variant" aria-pressed={v.code === p.code} onClick={() => setCode(v.code)}>
                {variantLabel(v, variants)}
              </button>
            ))}
          </div>
        ) : (
          <div className="model-variants">
            <span className="variant variant-solo">{p.watt} W</span>
          </div>
        )}

        <dl className="model-specs">
          <div>
            <dt>Output</dt>
            <dd key={`lm-${p.code}`}>{p.lumens}</dd>
          </div>
          <div>
            <dt>Size</dt>
            <dd key={`dim-${p.code}`}>{p.dim}</dd>
          </div>
          <div>
            <dt>Efficacy</dt>
            <dd key={`ef-${p.code}`}>{efficacy(p) ? `${efficacy(p)} lm/W` : "On request"}</dd>
          </div>
        </dl>

        <div className="model-foot">
          <span className="model-price" key={`pr-${p.code}`}>
            {priceOf(p)}
            <small>{p.price === 'P.O.R' ? 'price on request' : 'ex-works'}</small>
          </span>
          <button type="button" className="model-add" onClick={() => addToQuote(p)} aria-label={`Add ${p.name} to the enquiry`}>
            <span aria-hidden="true">+</span> Quote
          </button>
        </div>
      </div>
    </article>
  );
}
