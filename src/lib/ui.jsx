import { Component, createContext, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ── scroll reveal ──
   Elements opt in with `data-reveal`. A 2600 ms fallback reveals anything the
   observer never fired for, so content can never be stranded invisible — the
   same guarantee the prototype's timeout gave. */
export function useReveal(deps = []) {
  useEffect(() => {
    const reveal = (el) => el.setAttribute('data-revealed', '1');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.04 }
    );
    document.querySelectorAll('[data-reveal]:not([data-revealed])').forEach((el) => io.observe(el));
    const fallback = setTimeout(() => document.querySelectorAll('[data-reveal]').forEach(reveal), 2600);
    return () => {
      clearTimeout(fallback);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const COUNTER_MS = 1400;

/* Counts 0 → target with a cubic ease-out, once, when `run` first turns true.
   requestAnimationFrame is throttled to nothing in a backgrounded or
   non-compositing tab, so a timer settles on the final figures regardless —
   the tween is the nicety, landing on the real number is the requirement. */
export function useCounters(targets, run) {
  const [values, setValues] = useState(() => targets.map(() => 0));
  const done = useRef(false);
  useEffect(() => {
    if (!run || done.current) return;
    done.current = true;
    const t0 = performance.now();
    let raf;
    const step = (now) => {
      const p = Math.min(1, (now - t0) / COUNTER_MS);
      const e = 1 - Math.pow(1 - p, 3);
      setValues(targets.map((t) => Math.round(t * e)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const settle = setTimeout(() => setValues(targets), COUNTER_MS + 300);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);
  return values;
}

/* Fires once when the element scrolls into view, with the same 2600 ms net. */
export function useInView(options, fallbackMs = 2600) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setSeen(true);
        io.disconnect();
      }
    }, options || { threshold: 0.15 });
    io.observe(el);
    const fallback = setTimeout(() => setSeen(true), fallbackMs);
    return () => {
      clearTimeout(fallback);
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen]);
  return [ref, seen];
}

/* ── modal plumbing ──
   Locks background scroll, traps Tab inside the dialog, closes on Escape and
   restores focus to whatever opened it. */
export function useDialog(open, onClose) {
  const ref = useRef(null);
  const restoreTo = useRef(null);

  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement;

    const scrollBarW = window.innerWidth - document.documentElement.clientWidth;
    const { overflow, paddingRight } = document.body.style;
    document.body.style.overflow = 'hidden';
    if (scrollBarW > 0) document.body.style.paddingRight = `${scrollBarW}px`;

    const node = ref.current;
    const focusables = () =>
      Array.from(
        node?.querySelectorAll('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])') || []
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const list = focusables();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      restoreTo.current?.focus?.();
    };
  }, [open, onClose]);

  return ref;
}

/* Breadcrumb trail for the dark page headers: Home / <here>. */
export function Crumbs({ here }) {
  const navigate = useNavigate();
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      <ol>
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
        <li aria-current="page">{here}</li>
      </ol>
    </nav>
  );
}

/* Blueprint registration marks — the four corner ticks used across the design system. */
export function Corners() {
  return (
    <>
      <i className="corner tl" />
      <i className="corner tr" />
      <i className="corner bl" />
      <i className="corner br" />
    </>
  );
}

export function Icon({ path, size = 20, stroke = 'currentColor', style, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
}

/* Decorative dot-grid overlay used on the dark sections. */
export function GridLines({ opacity = 0.4, size = 64, color = 'rgba(255,255,255,.05)' }) {
  return (
    <div
      className="grid-lines"
      aria-hidden="true"
      style={{
        opacity,
        backgroundImage: `linear-gradient(${color} 1px,transparent 1px),linear-gradient(90deg,${color} 1px,transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}

/* Blurred colour wash behind the dark sections. */
export function Aurora({ style }) {
  return <div aria-hidden="true" style={{ position: 'absolute', borderRadius: '50%', pointerEvents: 'none', ...style }} />;
}

/* ── error boundary ──
   A render fault in one page should not blank the whole site. */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    // Wire to your reporter of choice here.
    console.error('Unhandled UI error:', error, info);
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="container" style={{ padding: '96px 0', textAlign: 'center' }}>
        <h1 className="t-h2" style={{ marginBottom: 14 }}>
          Something went wrong.
        </h1>
        <p className="t-body" style={{ color: 'var(--muted)', marginBottom: 26 }}>
          The page failed to render. Reloading usually clears it.
        </p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    );
  }
}

/* ── app-wide state ──
   Replaces the single dc component's shared state: cross-page toast, the
   product detail modal, the enquiry prefill written by "Add to quotation
   request", and the knobs that were design-tool props. */
export const AppCtx = createContext(null);
export const useApp = () => useContext(AppCtx);
