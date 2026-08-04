import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTACT_CARDS, FIELD_DEFS, ENQUIRY_TYPES } from '../data/catalog.js';
import { useApp, Corners, Icon, GridLines } from '../lib/ui.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  const navigate = useNavigate();
  const { flash, enquiryMsg: msg, setEnquiryMsg: setMsg } = useApp();

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
    setTouched({});
  };

  const msgErr = touched.msg ? errorFor('msg') : '';

  return (
    <main id="main">
      <section
        className="on-dark"
        style={{ position: 'relative', overflow: 'hidden', background: 'var(--navy)', color: 'var(--bg)', paddingBlock: 'clamp(40px,6vw,64px) clamp(52px,7vw,76px)' }}
      >
        <GridLines />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-70%',
            left: '20%',
            width: '52vw',
            height: '52vw',
            borderRadius: '50%',
            filter: 'blur(110px)',
            opacity: 0.38,
            background: 'radial-gradient(circle,#5980a6,transparent 68%)',
            animation: 'aurora 20s ease-in-out infinite',
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
                Contact
              </li>
            </ol>
          </nav>
          <h1 className="t-h1" style={{ fontSize: 'clamp(34px,5.6vw,66px)', lineHeight: 1, margin: '0 0 16px' }}>
            Request a quotation
          </h1>
          <p className="t-lead" style={{ color: 'rgba(242,242,243,.7)', maxWidth: '60ch', margin: 0 }}>
            Tell us the wattages, quantities and delivery location. Distributor and tender enquiries are answered with a stamped
            price list.
          </p>
        </div>
      </section>

      <section className="container" style={{ paddingBlock: 'clamp(40px,6vw,64px) var(--section-y)' }}>
        <div className="g g-md g-split-contact" style={{ alignItems: 'start' }}>
          <div
            className="blueprint"
            style={{ position: 'relative', padding: 'clamp(22px,4vw,36px) clamp(18px,3vw,34px)', background: 'linear-gradient(#fff,rgba(255,255,255,.4))' }}
          >
            <Corners />

            {sent ? (
              <div ref={confirmRef} tabIndex={-1} role="status" style={{ textAlign: 'center', padding: '40px 0' }}>
                <span
                  style={{
                    width: 52,
                    height: 52,
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 22px',
                  }}
                >
                  <Icon path='<path d="m4 12 5 5L20 6"></path>' size={24} />
                </span>
                <h2 className="t-h3" style={{ letterSpacing: '.02em', textTransform: 'uppercase', marginBottom: 10 }}>
                  Enquiry logged
                </h2>
                <p style={{ fontSize: 15.5, color: 'var(--ink-2)', maxWidth: '44ch', margin: '0 auto 26px' }}>
                  Reference {ticket}. Our technical desk replies within one working day with a stamped price list.
                </p>
                <button className="btn-outline" onClick={resetForm}>
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    gap: 12,
                    flexWrap: 'wrap',
                    paddingBottom: 18,
                    borderBottom: '1px solid var(--line)',
                    marginBottom: 26,
                  }}
                >
                  <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 21, letterSpacing: '.06em', textTransform: 'uppercase', margin: 0 }}>
                    Enquiry form
                  </h2>
                  <span style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted-2)' }}>
                    All fields required
                  </span>
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

                  <fieldset className="span-all" style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
                    <legend className="field-label" style={{ padding: 0, marginBottom: 9 }}>
                      Enquiry type
                    </legend>
                    <div className="chip-group">
                      {ENQUIRY_TYPES.map((t) => (
                        <button key={t} type="button" className="chip chip-grow" aria-pressed={enquiry === t} onClick={() => setEnquiry(t)}>
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

                  <div className="span-all" style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', marginTop: 6 }}>
                    <button type="submit" className="btn btn-primary" disabled={sending}>
                      <span style={{ opacity: sending ? 0 : 1, transition: 'opacity .2s' }}>Send enquiry</span>
                      <span
                        aria-hidden="true"
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          width: 16,
                          height: 16,
                          margin: '-8px 0 0 -8px',
                          border: '2px solid rgba(255,255,255,.35)',
                          borderTopColor: '#fff',
                          borderRadius: '50%',
                          animation: 'spin .7s linear infinite',
                          opacity: sending ? 1 : 0,
                        }}
                      />
                    </button>
                    <span style={{ fontSize: 12.5, color: 'var(--muted-2)' }}>No account needed. We reply by email.</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          <div className="stack" style={{ gap: 16 }}>
            {CONTACT_CARDS.map((c) => (
              <div key={c.label} className="blueprint hov-white" style={{ position: 'relative', padding: '24px 22px', background: 'rgba(255,255,255,.55)' }}>
                <Corners />
                <h2 style={{ fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 10px' }}>
                  {c.label}
                </h2>
                <p className="break-word" style={{ fontFamily: 'var(--font-head)', fontSize: 20, letterSpacing: '.02em', lineHeight: 1.2, margin: '0 0 4px' }}>
                  {c.href ? (
                    <a href={c.href} style={{ color: 'inherit', display: 'inline-block', padding: '4px 0', minHeight: 30 }}>
                      {c.value}
                    </a>
                  ) : (
                    c.value
                  )}
                </p>
                <p style={{ fontSize: 12.5, color: 'var(--muted-2)', margin: 0 }}>{c.note}</p>
              </div>
            ))}

            <div className="blueprint" style={{ position: 'relative', background: '#e9e9ea', height: 260, overflow: 'hidden' }}>
              <Corners />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage:
                    'linear-gradient(rgba(89,128,166,.22) 1px,transparent 1px),linear-gradient(90deg,rgba(89,128,166,.22) 1px,transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: 24,
                }}
              >
                <Icon
                  path='<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle>'
                  size={26}
                  stroke="var(--accent-dark)"
                  style={{ marginBottom: 12 }}
                />
                <p style={{ fontFamily: 'var(--font-head)', fontSize: 19, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--navy)', margin: 0 }}>
                  Map placeholder
                </p>
                <p style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: '32ch', marginTop: 6, marginBottom: 0 }}>
                  Drop in the works address and we will embed the live map here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
