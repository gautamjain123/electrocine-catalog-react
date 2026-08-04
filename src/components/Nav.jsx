import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CATS, LOGO } from '../data/catalog.js';
import { useApp } from '../lib/ui.jsx';

const linkStyle = { background: 'none', border: 0, padding: '9px 13px', fontSize: 13.5, color: 'var(--ink)', cursor: 'pointer' };

export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { openCategory } = useApp();
  const [drawer, setDrawer] = useState(false);
  const drawerRef = useRef(null);
  const burgerRef = useRef(null);

  // Route changes always close the drawer.
  useEffect(() => setDrawer(false), [location.pathname]);

  // Escape closes the drawer and returns focus to the button that opened it.
  useEffect(() => {
    if (!drawer) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setDrawer(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawer]);

  const go = (to) => () => {
    setDrawer(false);
    navigate(to);
    window.scrollTo(0, 0);
  };

  // Section anchors only exist on the home page; from elsewhere, route home first.
  const anchor = (hash) => (e) => {
    e.preventDefault();
    setDrawer(false);
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 80,
        backdropFilter: 'blur(14px) saturate(140%)',
        background: 'rgba(242,242,243,.86)',
        borderBottom: '1px solid var(--line-soft)',
      }}
    >
      <div className="container nav-bar">
        <button
          onClick={go('/')}
          aria-label="Electrocine Industries — home"
          style={{ display: 'flex', alignItems: 'center', gap: 11, cursor: 'pointer', flex: '0 0 auto', background: 'none', border: 0, padding: 0 }}
        >
          <img src={LOGO} alt="" width="34" height="34" style={{ width: 34, height: 34, objectFit: 'contain' }} />
          <span className="nav-wordmark" style={{ textAlign: 'left' }}>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-head)',
                fontWeight: 600,
                fontSize: 19,
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
              }}
            >
              Electrocine
            </span>
            <span
              style={{ display: 'block', fontSize: 9.5, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--muted)' }}
            >
              Industries
            </span>
          </span>
        </button>

        <nav className="nav-desktop" aria-label="Primary">
          {/* Hover and focus-within drive the panel from CSS, so it works for
              pointer, keyboard and no-JS alike. */}
          <div className="mega-wrap">
            <button onClick={go('/products')} style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
              Products
              <span aria-hidden="true" style={{ fontSize: 9, color: 'var(--muted-2)' }}>
                ▾
              </span>
            </button>
            <div className="mega">
              <div className="mega-inner">
                {CATS.map((c) => (
                  <button key={c.id} className="mega-item" onClick={() => openCategory(c.id)}>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-head)',
                        fontSize: 16,
                        letterSpacing: '.03em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {c.name}
                    </span>
                    <span style={{ display: 'block', fontSize: 11.5, color: 'var(--muted)', lineHeight: 1.4, marginTop: 2 }}>
                      {c.blurb}
                    </span>
                  </button>
                ))}
                <div
                  style={{
                    gridColumn: '1/-1',
                    marginTop: 12,
                    paddingTop: 14,
                    borderTop: '1px solid var(--line-soft)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 16,
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted-2)' }}>
                    Full range · 140+ SKUs · w.e.f. July 2024
                  </span>
                  <button
                    onClick={go('/products')}
                    className="hov-accent"
                    style={{
                      background: 'none',
                      border: 0,
                      padding: '10px 4px',
                      minHeight: 40,
                      fontSize: 12.5,
                      letterSpacing: '.1em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-dark)',
                      cursor: 'pointer',
                    }}
                  >
                    Browse catalogue →
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button onClick={go('/about')} style={linkStyle}>
            Company
          </button>
          <a href="/#applications" onClick={anchor('#applications')} style={{ padding: '9px 13px', fontSize: 13.5, color: 'var(--ink)' }}>
            Applications
          </a>
          <a href="/#technology" onClick={anchor('#technology')} style={{ padding: '9px 13px', fontSize: 13.5, color: 'var(--ink)' }}>
            Technology
          </a>
          <button onClick={go('/contact')} style={linkStyle}>
            Contact
          </button>
        </nav>

        <div style={{ flex: '1 1 auto' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: '0 0 auto' }}>
          <span
            className="nav-badge"
            style={{
              alignItems: 'center',
              gap: 7,
              padding: '7px 12px',
              border: '1px solid var(--line)',
              fontSize: 11,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            <span aria-hidden="true" style={{ width: 6, height: 6, background: 'var(--accent)', animation: 'blink 2.2s infinite' }} />
            Make in India
          </span>
          <button className="btn btn-primary nav-cta" onClick={go('/contact')} style={{ padding: '11px 20px', minHeight: 44, fontSize: 14 }}>
            Request quote
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(100deg,transparent,rgba(255,255,255,.42),transparent)',
                animation: 'sweep 3.4s ease-in-out infinite',
              }}
            />
          </button>
          <button
            ref={burgerRef}
            className="nav-burger"
            onClick={() => setDrawer((d) => !d)}
            aria-label={drawer ? 'Close menu' : 'Open menu'}
            aria-expanded={drawer}
            aria-controls="mobile-drawer"
            style={{
              width: 44,
              height: 44,
              flex: '0 0 auto',
              background: 'none',
              border: '1px solid rgba(29,31,32,.2)',
              cursor: 'pointer',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            <span aria-hidden="true" style={{ width: 16, height: 1, background: 'var(--ink)' }} />
            <span aria-hidden="true" style={{ width: 16, height: 1, background: 'var(--ink)' }} />
            <span aria-hidden="true" style={{ width: 16, height: 1, background: 'var(--ink)' }} />
          </button>
        </div>
      </div>

      {drawer && (
        <div
          id="mobile-drawer"
          ref={drawerRef}
          style={{
            borderTop: '1px solid var(--line-soft)',
            background: 'rgba(242,242,243,.98)',
            padding: '10px var(--gutter) 22px',
            maxHeight: 'calc(100vh - 68px)',
            overflowY: 'auto',
          }}
        >
          <nav aria-label="Mobile">
            {[
              { label: 'Products', to: '/products' },
              { label: 'Company', to: '/about' },
              { label: 'Contact', to: '/contact' },
              { label: 'Home', to: '/' },
            ].map((d) => (
              <button
                key={d.label}
                onClick={go(d.to)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 0,
                  borderBottom: '1px solid var(--line-soft)',
                  padding: '16px 4px',
                  minHeight: 52,
                  fontFamily: 'var(--font-head)',
                  fontSize: 20,
                  letterSpacing: '.04em',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                  cursor: 'pointer',
                }}
              >
                {d.label}
              </button>
            ))}
          </nav>
          <div style={{ marginTop: 18, display: 'grid', gap: 10 }}>
            <span style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--muted-2)' }}>
              Families
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {CATS.map((c) => (
                <button key={c.id} className="pill" onClick={() => openCategory(c.id)}>
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
