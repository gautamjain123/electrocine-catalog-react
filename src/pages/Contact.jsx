import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTACT_CARDS, FEATURED_MODELS, FIELD_DEFS, ENQUIRY_TYPES, origOf, srcSetOf } from '../data/catalog.js';
import { useApp, Icon } from '../lib/ui.jsx';
import PageHead from '../components/PageHead.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const thumb = (src) => (src && src.startsWith('/cat/hd/') ? { src: origOf(src), srcSet: srcSetOf(src) } : { src });

export default function Contact() {
  const navigate = useNavigate();
  const { flash, enquiryMsg: msg, setEnquiryMsg: setMsg, quote, addToQuote, removeFromQuote, clearQuote, openDetail } = useApp();

  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', city: '', qty: '' });
  const [touched, setTouched] = useState({});
  const [enquiry, setEnquiry] = useState('Distributor');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [ticket, setTicket] = useState('');
  const confirmRef = useRef(null);

  // Move focus to the confirmation so screen readers and keyboards follow along.
  useEffect(() => {
    if (sent) confirmRef.current?.focus();
  }, [sent]);

  const errorFor = (key) => {
    const v = (key === 'msg' ? msg : form[key] || '').trim();
    if (!v) return 'Required';
    if (key === 'email' && !EMAIL_RE.test(v)) return 'Enter a valid email address';
    if (key === 'phone' && v.replace(/\D/g, '').length < 8) return 'Enter a reachable phone number';
    if (key === 'msg' && v.length < 12) return 'Please describe quantities and wattages';
    return '';
  };

  const submit = (e) => {
    e.preventDefault();
    const keys = [...FIELD_DEFS.map((f) => f.id), 'msg'];
    const nextTouched = {};
    keys.forEach((k) => {
      nextTouched[k] = true;
    });
    const bad = keys.filter((k) => errorFor(k));
    setTouched(nextTouched);
    if (bad.length) {
      flash(`${bad.length} field${bad.length > 1 ? 's' : ''} need attention`);
      document.getElementById(bad[0])?.focus();
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTicket('EI-' + String(Math.floor(Math.random() * 9000) + 1000));
    }, 1100);
  };

  const resetForm = () => {
    setSent(false);
    setForm({ name: '', company: '', email: '', phone: '', city: '', qty: '' });
    setMsg('');
    clearQuote();
    setTouched({});
  };

  const msgErr = touched.msg ? errorFor('msg') : '';

  return (
    <main id="main" className="inner">
      <PageHead
        here="Contact"
        kicker="Technical desk · replies within one working day"
        title={
          <>
            Request a <em>quotation.</em>
          </>
        }
        lead="Tell us the wattages, quantities and delivery location. Distributor and tender enquiries are answered with a stamped price list."
        aside={
          <ul className="ph-contacts">
            {CONTACT_CARDS.map((c) => (
              <li key={c.label}>
                <span>{c.label}</span>
                {c.href ? (
                  <a href={c.href} className="break-word" {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {c.value}
                  </a>
                ) : (
                  <strong className="break-word">{c.value}</strong>
                )}
                <small>{c.note}</small>
              </li>
            ))}
          </ul>
        }
      />

      <section className="container in-sec">
        <div className="ct-grid">
          {/* ── form ── */}
          <div className="ct-form">
            {sent ? (
              <div ref={confirmRef} tabIndex={-1} role="status" className="ct-sent">
                <span className="ct-sent-icon">
                  <Icon path='<path d="m4 12 5 5L20 6"></path>' size={24} />
                </span>
                <h2>Enquiry logged.</h2>
                <p>Reference {ticket}. Our technical desk replies within one working day with a stamped price list.</p>
                <button className="btn-outline" onClick={resetForm}>
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="ct-form-head">
                  <h2>Your details</h2>
                  <span>All fields required</span>
                </div>

                <div className="g g-form">
                  {FIELD_DEFS.map((f) => {
                    const err = touched[f.id] ? errorFor(f.id) : '';
                    return (
                      <div key={f.id}>
                        <label className="field-label" htmlFor={f.id}>
                          {f.label}
                        </label>
                        <input
                          id={f.id}
                          className="input"
                          type={f.type}
                          value={form[f.id]}
                          autoComplete={f.autoComplete}
                          onChange={(e) => setForm((s) => ({ ...s, [f.id]: e.target.value }))}
                          onBlur={() => setTouched((t) => ({ ...t, [f.id]: true }))}
                          placeholder={f.placeholder}
                          aria-invalid={err ? 'true' : undefined}
                          aria-describedby={err ? `${f.id}-err` : undefined}
                        />
                        <div className="field-err" id={`${f.id}-err`} role={err ? 'alert' : undefined}>
                          {err}
                        </div>
                      </div>
                    );
                  })}

                  <fieldset className="span-all ct-type">
                    <legend className="field-label">Enquiry type</legend>
                    <div className="ct-type-row">
                      {ENQUIRY_TYPES.map((t) => (
                        <button key={t} type="button" aria-pressed={enquiry === t} onClick={() => setEnquiry(t)}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="span-all">
                    <label className="field-label" htmlFor="msg">
                      Requirement
                    </label>
                    <textarea
                      id="msg"
                      className="input"
                      rows={4}
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, msg: true }))}
                      placeholder="e.g. 400 × 24W backlit panel recess 600×600, CW, delivery Jaipur"
                      aria-invalid={msgErr ? 'true' : undefined}
                      aria-describedby={msgErr ? 'msg-err' : undefined}
                    />
                    <div className="field-err" id="msg-err" role={msgErr ? 'alert' : undefined}>
                      {msgErr}
                    </div>
                  </div>

                  <div className="span-all ct-submit">
                    <button type="submit" className="btn btn-dark" disabled={sending}>
                      {sending ? 'Sending…' : 'Send enquiry'} {!sending && <span className="btn-arrow">→</span>}
                    </button>
                    <span>No account needed. We reply by email.</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* ── enquiry basket ── */}
          <section className="ct-basket" aria-labelledby="basket-title">
            <div className="ct-basket-head">
              <h2 id="basket-title">Your enquiry</h2>
              <span>{quote.length ? `${quote.length} item${quote.length > 1 ? 's' : ''}` : 'Empty'}</span>
            </div>
            {quote.length > 0 ? (
              <ul className="ct-list">
                {quote.map((p) => (
                  <li key={p.code}>
                    <button type="button" className="ct-thumb" onClick={() => openDetail(p)} aria-label={`${p.name} — open specification`}>
                      <img {...thumb(p.img)} alt="" />
                    </button>
                    <span className="ct-item">
                      <strong>{p.name}</strong>
                      <small className="break-word">
                        {p.code} · {p.lumens}
                      </small>
                    </span>
                    <button type="button" className="ct-remove" onClick={() => removeFromQuote(p)} aria-label={`Remove ${p.name} from the enquiry`}>
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <p className="ct-empty">Add fittings from the catalogue and they appear here, with a line for quantity in your requirement.</p>
                <ul className="ct-suggest">
                  {FEATURED_MODELS.slice(0, 4).map((m) => (
                    <li key={m.key}>
                      <button type="button" onClick={() => addToQuote(m.variants[0])} aria-label={`Add ${m.variants[0].name} to the enquiry`}>
                        <span className="ct-thumb">
                          <img {...thumb(m.img)} alt="" />
                        </span>
                        <span className="ct-item">
                          <strong>{m.name}</strong>
                          <small>{m.variants[0].watt} W</small>
                        </span>
                        <span className="ct-add" aria-hidden="true">
                          + Add
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <button
              type="button"
              className="ct-browse"
              onClick={() => {
                navigate('/products');
                window.scrollTo(0, 0);
              }}
            >
              Browse the catalogue →
            </button>
          </section>
        </div>
      </section>
    </main>
  );
}
