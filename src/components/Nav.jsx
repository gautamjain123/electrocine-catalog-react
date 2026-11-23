import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CATS, CAT_IMG, LOGO, origOf, srcSetOf } from '../data/catalog.js';
import { useApp } from '../lib/ui.jsx';

/* Header: logo left, links grouped in a soft pill in the middle, quote CTA
   right. Transparent over the top of the page, a frosted solid bar once the
   page scrolls. Products opens a mega-menu of the six families. */
export default function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { openCategory, quote } = useApp();
  const [drawer, setDrawer] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOff, setMegaOff] = useState(false);
  const burgerRef = useRef(null);

  useEffect(() => setDrawer(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    if (location.pathname !== '/') navigate('/' + hash);
    else document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
  };

  const here = (path) => (location.pathname === path ? 'page' : undefined);
  const count = quote?.length || 0;

  return (
    <header className={`hdr ${scrolled || drawer ? 'is-solid' : ''}`}>
      <div className="container hdr-bar">
        <button className="hdr-brand" onClick={go('/')} aria-label="Electrocine Industries — home">
          <img src={LOGO} alt="" width="36" height="36" />
          <span className="hdr-word">
            <strong>Electrocine</strong>
            <small>Industries</small>
          </span>
        </button>

        <nav className="hdr-links" aria-label="Primary">
          {/* Opens on mouse hover only (keyboard users get it via Tab focus).
              Picking anything closes it until the pointer leaves. */}
          <div
            className={`mega-wrap ${megaOff ? 'is-off' : ''}`}
            onMouseLeave={() => setMegaOff(false)}
            onClickCapture={() => setMegaOff(true)}
          >
            <button onClick={go('/products')} aria-current={here('/products')} aria-haspopup="true">
              Products
              <svg className="hdr-caret" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="mega">
              <div className="mega-inner">
                {CATS.map((c) => (
                  <button key={c.id} className="mega-item" onClick={() => openCategory(c.id)}>
                    <span className="mega-thumb" aria-hidden="true">
                      <img src={origOf(CAT_IMG[c.id])} srcSet={srcSetOf(CAT_IMG[c.id])} alt="" loading="lazy" />
                    </span>
                    <span>
                      <span className="mega-name">{c.name}</span>
                      <span className="mega-blurb">{c.blurb}</span>
                    </span>
                  </button>
                ))}
                <div className="mega-foot">
                  <span>Full range · 140+ SKUs · price list w.e.f. July 2024</span>
                  <button onClick={go('/products')}>Browse the catalogue →</button>
                </div>
              </div>
            </div>
          </div>
          <button onClick={go('/about')} aria-current={here('/about')}>
            Company
          </button>
          <a href="/#applications" onClick={anchor('#applications')}>
            Applications
          </a>
          <a href="/#technology" onClick={anchor('#technology')}>
            Technology
          </a>
          <button onClick={go('/contact')} aria-current={here('/contact')}>
            Contact
          </button>
        </nav>

        <div className="hdr-actions">
          <button className="hdr-cta" onClick={go('/contact')}>
            Request quote
            {count > 0 && <span className="hdr-count">{count}</span>}
          </button>
          <button
            ref={burgerRef}
            className="hdr-burger"
            onClick={() => setDrawer((d) => !d)}
            aria-label={drawer ? 'Close menu' : 'Open menu'}
            aria-expanded={drawer}
            aria-controls="mobile-drawer"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      {drawer && (
        <div id="mobile-drawer" className="hdr-drawer">
          <nav aria-label="Mobile" className="container">
            {[
              { label: 'Products', to: '/products' },
              { label: 'Company', to: '/about' },
              { label: 'Contact', to: '/contact' },
              { label: 'Home', to: '/' },
            ].map((d) => (
              <button key={d.label} onClick={go(d.to)}>
                {d.label}
              </button>
            ))}
            <p>Families</p>
            <div className="hdr-drawer-pills">
              {CATS.map((c) => (
                <button key={c.id} className="pill" onClick={() => openCategory(c.id)}>
                  {c.name}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
