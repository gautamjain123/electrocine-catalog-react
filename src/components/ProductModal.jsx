import { CATS, MODELS, siblingsOf, variantLabel } from '../data/catalog.js';
import { useApp, useDialog, Corners } from '../lib/ui.jsx';
import ProductShot from './ProductShot.jsx';

export default function ProductModal() {
  const { detail, closeDetail, quoteFromDetail, priceOf, openDetail } = useApp();
  const dialogRef = useDialog(!!detail, closeDetail);

  if (!detail) return null;

  const rows = [
    { k: 'Rated wattage', v: `${detail.watt} W` },
    { k: 'Minimum lumens', v: detail.lumens },
    { k: 'Overall dimension', v: `${detail.dim} mm` },
    { k: 'Cut-out', v: detail.cutout ? `${detail.cutout} mm` : '—' },
    { k: 'Mounting', v: detail.mount },
    { k: 'IP level', v: detail.ip || 'IP20' },
    { k: 'Colour temperature', v: 'CW / WW / NW' },
    { k: 'Input voltage', v: '110–270 V, 50 Hz AC' },
  ];
  const catName = CATS.find((c) => c.id === detail.cat)?.name || '';
  const variants = siblingsOf(detail);
  const related = MODELS.filter((m) => m.cat === detail.cat && !m.variants.includes(detail) && m.img !== detail.img).slice(0, 4);

  return (
    <div className="modal-backdrop" onClick={closeDetail}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className="blueprint modal"
      >
        <Corners />
        <button
          onClick={closeDetail}
          aria-label="Close product details"
          className="hov-white"
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 2,
            width: 40,
            height: 40,
            background: 'rgba(251, 248, 243,.92)',
            border: '1px solid rgba(22, 33, 58,.2)',
            cursor: 'pointer',
            fontSize: 16,
            color: 'var(--ink)',
          }}
        >
          ✕
        </button>
        <div className="modal-grid">
          <div className="modal-figure shot-host">
            <ProductShot key={detail.img} src={detail.img} alt={detail.name} lit loading="eager" className="modal-shot" />
          </div>
          <div style={{ padding: 'clamp(22px,4vw,34px) clamp(18px,3vw,32px)' }}>
            <div style={{ fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 }}>
              {catName}
            </div>
            <h2
              id="modal-title"
              className="t-h3"
              style={{ letterSpacing: '.01em', textTransform: 'uppercase', marginBottom: 6 }}
            >
              {detail.name}
            </h2>
            <div className="break-word" style={{ fontSize: 12.5, letterSpacing: '.06em', color: 'var(--muted-2)', marginBottom: 22 }}>
              {detail.code}
            </div>
            {variants.length > 1 && (
              <div className="model-variants modal-variants" role="group" aria-label="Other wattages of this fitting">
                {variants.map((v) => (
                  <button key={v.code} type="button" className="variant" aria-pressed={v.code === detail.code} onClick={() => openDetail(v)}>
                    {variantLabel(v, variants)}
                  </button>
                ))}
              </div>
            )}
            <dl style={{ margin: 0 }}>
              {rows.map((r) => (
                <div
                  key={r.k}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: 16,
                    padding: '9px 0',
                    borderBottom: '1px dashed rgba(22, 33, 58,.16)',
                    alignItems: 'baseline',
                  }}
                >
                  <dt style={{ fontSize: 12.5, letterSpacing: '.02em', color: 'var(--muted)' }}>{r.k}</dt>
                  <dd style={{ margin: 0, fontFamily: 'var(--font-head)', fontSize: 16, textAlign: 'right' }}>{r.v}</dd>
                </div>
              ))}
            </dl>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: 12,
                flexWrap: 'wrap',
                margin: '22px 0 20px',
                paddingTop: 16,
                borderTop: '1px solid rgba(22, 33, 58,.18)',
              }}
            >
              <span style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted-2)' }}>
                Ex-works price
              </span>
              <span style={{ fontFamily: 'var(--font-head)', fontSize: 30, color: 'var(--navy)' }}>{priceOf(detail)}</span>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => quoteFromDetail(detail)}>
              Add to quotation request
            </button>
          </div>
        </div>
        {related.length > 0 && (
          <div className="modal-related">
            <h3>More in {catName}</h3>
            <ul>
              {related.map((m) => (
                <li key={m.key}>
                  <button type="button" className="shot-host" onClick={() => openDetail(m.variants[0])}>
                    <ProductShot src={m.img} alt="" reflect={false} />
                    <span>{m.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
