import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATS, LOGO, SOCIALS } from '../data/catalog.js';
import { useApp, Icon } from '../lib/ui.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const colTitle = {
  fontSize: 10.5,
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  color: 'rgba(251, 248, 243,.45)',
  marginBottom: 18,
};

export default function Footer() {
  const navigate = useNavigate();
  const { flash, openCategory } = useApp();
  const [news, setNews] = useState('');
  const [newsDone, setNewsDone] = useState(false);
  const [newsErr, setNewsErr] = useState('');

  const go = (to) => () => {
    navigate(to);
    window.scrollTo(0, 0);
  };

  const subscribe = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(news.trim())) {
      setNewsErr('Enter a valid email address');
      flash('Enter a valid email address');
      return;
    }
    setNewsErr('');
    setNewsDone(true);
    setNews('');
    flash('You will receive price list revisions');
  };

  const footerCols = [
    { title: 'Products', items: CATS.slice(0, 5).map((c) => ({ label: c.name, go: () => openCategory(c.id) })) },
    {
      title: 'Company',
      items: [
        { label: 'About us', go: go('/about') },
        { label: 'Certifications', go: go('/about') },
        { label: 'Careers — placeholder', go: () => flash('Careers page not yet written') },
        { label: 'News — placeholder', go: () => flash('News page not yet written') },
        { label: 'Contact', go: go('/contact') },
      ],
    },
    {
      title: 'Resources',
      items: [
        { label: 'Price list (July 2024)', go: () => flash('Request the PDF from the contact form') },
        { label: 'Specification sheets', go: go('/products') },
        { label: 'Tender documents', go: go('/contact') },
        { label: 'Warranty terms', go: go('/') },
      ],
    },
  ];

  return (
    <footer className="on-dark" style={{ position: 'relative', overflow: 'hidden', background: 'var(--navy)', color: 'var(--bg)' }}>
      <div className="container" style={{ position: 'relative', padding: '72px var(--gutter) 30px' }}>
        <div className="g g-footer">
          <div>
            {/* the real logo on a white disc — never recoloured — with the same
                serif wordmark as the header */}
            <div className="foot-brand">
              <span className="foot-brand-mark">
                <img src={LOGO} alt="" width="40" height="40" />
              </span>
              <span className="foot-brand-word">
                <strong>Electrocine</strong>
                <small>Industries</small>
              </span>
            </div>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'rgba(251, 248, 243,.6)', maxWidth: '38ch', margin: '0 0 24px' }}>
              LED lighting series — panels, battens, street, flood, landscape and industrial luminaires, manufactured in India.
            </p>
            <form onSubmit={subscribe} noValidate>
              <label htmlFor="newsletter" style={{ ...colTitle, marginBottom: 10, display: 'block' }}>
                Newsletter — price list revisions
              </label>
              <div style={{ display: 'flex', maxWidth: 340, border: '1px solid rgba(255,255,255,.24)' }}>
                <input
                  id="newsletter"
                  type="email"
                  value={news}
                  onChange={(e) => {
                    setNews(e.target.value);
                    if (newsErr) setNewsErr('');
                  }}
                  placeholder="you@company.com"
                  aria-invalid={newsErr ? 'true' : undefined}
                  aria-describedby={newsErr ? 'newsletter-err' : undefined}
                  style={{
                    flex: '1 1 auto',
                    minWidth: 0,
                    background: 'transparent',
                    border: 0,
                    padding: '12px 14px',
                    color: 'var(--bg)',
                    fontSize: 16,
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'var(--accent)',
                    color: '#fff',
                    border: 0,
                    padding: '0 18px',
                    minHeight: 46,
                    fontFamily: 'var(--font-head)',
                    fontSize: 13,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {newsDone ? 'Added' : 'Subscribe'}
                </button>
              </div>
              <div id="newsletter-err" role="alert" style={{ fontSize: 11.5, color: '#f3a2b4', minHeight: 16, marginTop: 6 }}>
                {newsErr}
              </div>
            </form>
          </div>

          {footerCols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 style={colTitle}>{col.title}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
                {col.items.map((it) => (
                  <button
                    key={it.label}
                    onClick={it.go}
                    className="hov-link"
                    style={{
                      background: 'none',
                      border: 0,
                      padding: '6px 0',
                      minHeight: 34,
                      textAlign: 'left',
                      fontSize: 14,
                      color: 'rgba(251, 248, 243,.72)',
                      cursor: 'pointer',
                    }}
                  >
                    {it.label}
                  </button>
                ))}
              </div>
            </nav>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
            paddingTop: 26,
          }}
        >
          <div style={{ fontSize: 12, color: 'rgba(251, 248, 243,.45)' }}>
            © {new Date().getFullYear()} Electrocine Industries. All rights reserved. Price list w.e.f. July 2024.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(251, 248, 243,.45)' }}>
              ISO 9001 · BIS · RoHS
            </span>
            <div style={{ display: 'flex', gap: 1, background: 'rgba(255,255,255,.16)' }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="hov-link"
                  style={{
                    width: 40,
                    height: 40,
                    background: 'var(--navy)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(251, 248, 243,.6)',
                  }}
                >
                  <Icon path={s.icon} size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="foot-wordmark" aria-hidden="true">
        Electrocine<span>.</span>
      </div>
    </footer>
  );
}
