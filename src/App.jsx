import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import ProductModal from './components/ProductModal.jsx';
import Toast from './components/Toast.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import { AppCtx, ErrorBoundary } from './lib/ui.jsx';

/* The prototype exposed these three as design-tool props. Standalone there is no
   props panel, so they live here as app config.
     showPrices  — false renders every price as "On request" (the design-tool default).
                   Defaulted to true here because the catalogue data carries real
                   ex-works rates and this build has no toggle to reveal them.
     motion      — 'reduced' drops the floating hero-card drift animation. Users who
                   set prefers-reduced-motion get that treatment automatically.
     productView — initial catalogue layout before the user picks Grid / Spec table. */
export const SETTINGS = {
  showPrices: true,
  motion: 'full',
  productView: 'grid',
};

const TITLES = {
  '/': 'Electrocine Industries — LED Lighting Series',
  '/products': 'Products — Electrocine Industries',
  '/about': 'Company — Electrocine Industries',
  '/contact': 'Request a quotation — Electrocine Industries',
};

function NotFound() {
  return (
    <main id="main" className="container section-y" style={{ textAlign: 'center' }}>
      <p className="t-kicker" style={{ color: 'var(--accent)' }}>
        Error 404
      </p>
      <h1 className="t-h2" style={{ marginBottom: 16 }}>
        That page is not in the catalogue.
      </h1>
      <p className="t-body" style={{ color: 'var(--muted)', maxWidth: '48ch', margin: '0 auto 28px' }}>
        The link may be out of date. The full LED Lighting Series is one click away.
      </p>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link className="btn btn-primary" to="/products">
          Browse the catalogue
        </Link>
        <Link className="btn-outline" to="/">
          Back to home
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [toast, setToast] = useState('');
  const [detail, setDetail] = useState(null);
  // The enquiry draft lives here so it survives navigating away from /contact.
  const [enquiryMsg, setEnquiryMsg] = useState('');
  // Category chosen from the nav mega-menu, footer or home bento; consumed by /products.
  const [pendingCat, setPendingCat] = useState(null);

  const toastTimer = useRef(null);
  const flash = useCallback((msg) => {
    clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(''), 2800);
  }, []);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const priceOf = useCallback((p) => (SETTINGS.showPrices ? p.price : 'On request'), []);

  const openDetail = useCallback((p) => setDetail(p), []);
  const closeDetail = useCallback(() => setDetail(null), []);

  const openCategory = useCallback(
    (catId) => {
      setPendingCat(catId);
      setDetail(null);
      navigate('/products');
      window.scrollTo(0, 0);
    },
    [navigate]
  );

  /* Appending here — in the event handler rather than an effect on the Contact
     page — means the line is added exactly once, and the draft survives leaving
     /contact, so several products can be collected into one enquiry. */
  const quoteFromDetail = useCallback(
    (p) => {
      setDetail(null);
      setEnquiryMsg((m) => (m ? m + '\n' : '') + `${p.name} (${p.code}) — quantity: `);
      navigate('/contact');
      window.scrollTo(0, 0);
      flash(`${p.code} added to the enquiry`);
    },
    [navigate, flash]
  );

  // Each route gets its own document title.
  useEffect(() => {
    document.title = TITLES[location.pathname] || 'Page not found — Electrocine Industries';
  }, [location.pathname]);

  // Deep links like /#technology need the anchor resolved after the page mounts.
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60);
    }
  }, [location]);

  const ctx = useMemo(
    () => ({
      toast,
      flash,
      detail,
      openDetail,
      closeDetail,
      quoteFromDetail,
      priceOf,
      pendingCat,
      clearPendingCat: () => setPendingCat(null),
      openCategory,
      enquiryMsg,
      setEnquiryMsg,
      settings: SETTINGS,
    }),
    [toast, flash, detail, openDetail, closeDetail, quoteFromDetail, priceOf, pendingCat, openCategory, enquiryMsg]
  );

  return (
    <AppCtx.Provider value={ctx}>
      <div data-motion={SETTINGS.motion}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Nav />
        <ErrorBoundary key={location.pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
        <Footer />
        <ProductModal />
        <Toast />
      </div>
    </AppCtx.Provider>
  );
}
