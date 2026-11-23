import { useEffect, useState } from 'react';
import { LOGO } from '../data/catalog.js';

/* First-visit intro — full screen. One street light, from casting to the road.
   A camera (.i-cam) tracks the fitting through a factory at night, keeping it
   centred on any screen shape; a foreground layer (.i-fg) slides past faster
   and out of focus for depth. Stations:
     die-casting press → robot fits the LED board → QC gantry lights it and
     passes it → packed, taped, labelled → out through the dock into the truck
     → the truck drives off past a row of lit street lights.
   Every timed part shares one CSS timeline (--T). Plays once per browser
   session (add ?intro to the URL to replay), skippable, and skipped under
   reduced motion. */

const T = 9500; // ms — the whole film; every stage scales from this
const KEY = 'ec-intro-seen';

const STEPS = [
  { at: 0, label: 'Casting' },
  { at: 0.22, label: 'Assembly' },
  { at: 0.4, label: 'Testing' },
  { at: 0.56, label: 'Packing' },
  { at: 0.74, label: 'Dispatch' },
];

const shouldPlay = () => {
  try {
    if (new URLSearchParams(window.location.search).has('intro')) return true;
    // Crawlers and page-speed audits go straight to the content.
    if (/bot|crawl|spider|slurp|lighthouse|pagespeed|headless|facebookexternalhit|whatsapp|linkedin/i.test(navigator.userAgent)) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !sessionStorage.getItem(KEY);
  } catch {
    return true;
  }
};

const range = (from, to, step) => Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);

/* deterministic dust motes inside the light cones */
const DUST = range(0, 47, 1).map((i) => {
  const cone = [-150, 150, 450, 750, 1050, 1350][i % 6];
  const r = ((i * 9301 + 49297) % 233280) / 233280;
  const r2 = ((i * 4096 + 1013) % 2048) / 2048;
  return { x: cone + (r - 0.5) * 150, y: 120 + r2 * 200, s: 0.6 + (i % 3) * 0.5, d: (i % 7) * 0.6 };
});

/* a worker in a hard hat and hi-vis vest; (x, y) = feet on the floor */
function Worker({ x, y = 340, flip = false, scale = 1, className = '' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${(flip ? -1 : 1) * scale} ${scale})`} className={className}>
      <ellipse cx="0" cy="1" rx="16" ry="3" fill="#000" opacity="0.35" />
      <rect x="-7" y="-34" width="6" height="34" rx="3" fill="#1c2638" />
      <rect x="1" y="-34" width="6" height="34" rx="3" fill="#1c2638" />
      <path d="M-11 -66 q0 -6 6 -6 h10 q6 0 6 6 v34 h-22 Z" fill="#2c3a52" />
      <path d="M-10 -64 h20 v28 h-20 Z" fill="#f08a24" />
      <rect x="-10" y="-52" width="20" height="2.5" fill="#e6ecf5" />
      <rect x="-10" y="-44" width="20" height="2.5" fill="#e6ecf5" />
      <rect x="8" y="-64" width="6" height="26" rx="3" fill="#2c3a52" className="w-arm" />
      <circle cx="0" cy="-80" r="8" fill="#c58c62" />
      <path d="M-10 -82 q0 -11 10 -11 q10 0 10 11 Z" fill="#f2c230" />
      <rect x="-12" y="-83" width="24" height="3" rx="1.5" fill="#d9a91f" />
    </g>
  );
}

export default function Intro() {
  const [show, setShow] = useState(shouldPlay);
  const [leaving, setLeaving] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* storage blocked — it simply plays again next time */
    }
    document.documentElement.style.overflow = 'hidden';
    const timers = [
      ...STEPS.slice(1).map((s, i) => setTimeout(() => setStep(i + 1), s.at * T)),
      setTimeout(() => setStep(STEPS.length), T - 300),
      setTimeout(() => setLeaving(true), T),
      setTimeout(() => setShow(false), T + 800),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.documentElement.style.overflow = '';
    };
  }, [show]);

  useEffect(() => {
    if (!show) document.documentElement.style.overflow = '';
  }, [show]);

  const skip = () => {
    setLeaving(true);
    setTimeout(() => setShow(false), 700);
  };

  if (!show) return null;

  return (
    <div className={`intro ${leaving ? 'is-leaving' : ''}`} style={{ '--T': `${T}ms` }} role="presentation">
      <svg className="intro-scene" viewBox="0 -60 960 540" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="g-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0a1529" />
            <stop offset="1" stopColor="#15284c" />
          </linearGradient>
          <linearGradient id="g-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#040914" />
            <stop offset="0.7" stopColor="#0e1e3d" />
            <stop offset="1" stopColor="#25395f" />
          </linearGradient>
          <linearGradient id="g-window" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#081227" />
            <stop offset="1" stopColor="#1c345e" />
          </linearGradient>
          <linearGradient id="g-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0d1830" />
            <stop offset="1" stopColor="#04080f" />
          </linearGradient>
          <linearGradient id="g-metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e2e8f1" />
            <stop offset="0.45" stopColor="#9aa6b8" />
            <stop offset="1" stopColor="#56627a" />
          </linearGradient>
          <linearGradient id="g-steel" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#33445f" />
            <stop offset="0.5" stopColor="#5a6e92" />
            <stop offset="1" stopColor="#2c3b55" />
          </linearGradient>
          <linearGradient id="g-pillar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#03060c" />
            <stop offset="0.6" stopColor="#0c1628" />
            <stop offset="1" stopColor="#03060c" />
          </linearGradient>
          <linearGradient id="g-raw" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8b8f96" />
            <stop offset="1" stopColor="#50545b" />
          </linearGradient>
          <linearGradient id="g-ingot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c9ced6" />
            <stop offset="1" stopColor="#7c8390" />
          </linearGradient>
          <linearGradient id="g-kraft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#dcae6c" />
            <stop offset="1" stopColor="#b07e46" />
          </linearGradient>
          <linearGradient id="g-cone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe2a8" stopOpacity="0.3" />
            <stop offset="1" stopColor="#ffd08a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-cone-cool" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f3f6ff" stopOpacity="0.3" />
            <stop offset="1" stopColor="#dfe8ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g-truck" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fbfaf7" />
            <stop offset="1" stopColor="#d6dae2" />
          </linearGradient>
          <linearGradient id="g-under" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0.55" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="g-glow">
            <stop offset="0" stopColor="#fffaf0" />
            <stop offset="0.35" stopColor="#ffe0a0" stopOpacity="0.75" />
            <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="g-pool">
            <stop offset="0" stopColor="#ffd48a" stopOpacity="0.32" />
            <stop offset="1" stopColor="#ffd48a" stopOpacity="0" />
          </radialGradient>
          <filter id="f-bloom" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="f-dof">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
          <pattern id="p-hazard" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="6" height="12" fill="#f2b33d" />
            <rect x="6" width="6" height="12" fill="#1a1a1a" />
          </pattern>
        </defs>

        <g className="i-cam">
          {/* ═══════════════ INTERIOR ═══════════════ */}
          <rect x="-500" y="-60" width="2012" height="400" fill="url(#g-wall)" />
          {range(-460, 1400, 120).map((x) => (
            <g key={x}>
              <rect x={x} y="74" width="76" height="118" rx="2" fill="url(#g-window)" stroke="#20345a" strokeWidth="3" />
              <line x1={x + 38} y1="74" x2={x + 38} y2="192" stroke="#20345a" strokeWidth="2" />
              <line x1={x} y1="133" x2={x + 76} y2="133" stroke="#20345a" strokeWidth="2" />
              <circle cx={x + 14} cy="92" r="0.9" fill="#cfd9ff" opacity="0.7" />
              <circle cx={x + 58} cy="106" r="0.8" fill="#cfd9ff" opacity="0.5" />
            </g>
          ))}
          {/* roof */}
          <rect x="-500" y="-60" width="2012" height="60" fill="#070f1f" />
          <rect x="-500" y="18" width="2012" height="4" fill="#24365a" />
          <rect x="-500" y="48" width="2012" height="4" fill="#24365a" />
          <path
            d={range(-500, 1500, 40)
              .map((x, i) => `${i ? 'L' : 'M'}${x} ${i % 2 ? 22 : 48}`)
              .join(' ')}
            fill="none"
            stroke="#24365a"
            strokeWidth="2"
          />
          {/* pipes along the ceiling */}
          <rect x="-500" y="2" width="2012" height="6" rx="3" fill="#1b2a47" />
          <rect x="-500" y="-12" width="2012" height="4" rx="2" fill="#16233c" />

          {/* high-bay lights */}
          {[-150, 150, 450, 750, 1050, 1350].map((x) => (
            <g key={x}>
              <polygon points={`${x - 16},88 ${x + 16},88 ${x + 130},340 ${x - 130},340`} fill="url(#g-cone)" />
              <ellipse cx={x} cy="360" rx="150" ry="18" fill="url(#g-pool)" />
              <line x1={x} y1="52" x2={x} y2="72" stroke="#3a4c6e" strokeWidth="2" />
              <path d={`M${x - 20} 88 Q${x} 64 ${x + 20} 88 Z`} fill="#33445f" />
              <g filter="url(#f-bloom)">
                <ellipse cx={x} cy="88" rx="18" ry="3.5" fill="#fff4d6" />
              </g>
              <ellipse cx={x} cy="94" rx="40" ry="12" fill="url(#g-glow)" opacity="0.7" />
            </g>
          ))}
          {/* dust in the beams */}
          <g className="i-dust">
            {DUST.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r={d.s} style={{ animationDelay: `${-d.d}s` }} />
            ))}
          </g>

          {/* sign hung from the trusses, clear of the line below */}
          <line x1="990" y1="50" x2="990" y2="58" stroke="#3a4c6e" strokeWidth="1.5" />
          <line x1="1270" y1="50" x2="1270" y2="58" stroke="#3a4c6e" strokeWidth="1.5" />
          <rect x="950" y="58" width="360" height="28" rx="4" fill="#0a1428" stroke="#2c4066" />
          <text x="1130" y="77" className="i-wallsign">
            ELECTROCINE INDUSTRIES · LED LIGHTING
          </text>

          {/* floor — glossy, with light reflections */}
          <rect x="-500" y="340" width="2016" height="140" fill="url(#g-floor)" />
          {range(-500, 1500, 70).map((x) => (
            <line key={x} x1={x} y1="340" x2={x - 60} y2="480" stroke="#122041" strokeWidth="1" />
          ))}
          <rect x="-500" y="398" width="2016" height="2" fill="#122041" />
          {[-150, 150, 450, 750, 1050, 1350].map((x) => (
            <ellipse key={x} cx={x} cy="420" rx="26" ry="40" fill="url(#g-glow)" opacity="0.12" />
          ))}

          {/* raw material: pallet of aluminium ingots */}
          <g>
            <rect x="-90" y="328" width="150" height="12" fill="#6b4a2a" />
            <rect x="-86" y="324" width="142" height="4" fill="#8a6338" />
            {range(0, 3, 1).map((row) =>
              range(0, 4, 1).map((c) => (
                <rect key={`${row}-${c}`} x={-84 + c * 28 + (row % 2) * 10} y={300 - row * 13} width="26" height="12" rx="2" fill="url(#g-ingot)" stroke="#5f6674" strokeWidth="0.6" />
              ))
            )}
            <text x="-15" y="268" className="i-plate">
              ALUMINIUM ADC12
            </text>
          </g>

          {/* ═══════════════ A — DIE-CASTING PRESS ═══════════════ */}
          <g>
            <rect x="170" y="140" width="12" height="160" fill="url(#g-steel)" />
            <rect x="258" y="140" width="12" height="160" fill="url(#g-steel)" />
            <rect x="160" y="128" width="120" height="18" rx="3" fill="#2f4267" />
            <rect x="205" y="98" width="30" height="32" rx="3" fill="#3a4f78" />
            <rect x="232" y="104" width="40" height="5" rx="2" fill="#2a3b5c" />
            <text x="220" y="141" className="i-plate">
              DIE CAST 250T
            </text>
            <rect x="160" y="304" width="120" height="8" fill="url(#p-hazard)" opacity="0.8" />
            <circle cx="276" cy="160" r="5" fill="#ff5a4e" className="i-warn" />
            {/* control panel */}
            <rect x="282" y="232" width="26" height="36" rx="3" fill="#24365a" />
            <circle cx="290" cy="244" r="3" fill="#3ddc84" />
            <circle cx="300" cy="244" r="3" fill="#ff5a4e" />
            <rect x="287" y="254" width="16" height="8" rx="1" fill="#0a1220" />
            <rect x="291" y="268" width="8" height="72" fill="#1d2b46" />
          </g>
          <g className="a-ram">
            <rect x="212" y="146" width="16" height="44" fill="url(#g-metal)" />
            <rect x="186" y="190" width="68" height="16" rx="3" fill="#c3ccda" />
            <rect x="186" y="202" width="68" height="4" fill="#7d889a" />
          </g>
          <g className="a-sparks" transform="translate(220 276)">
            {[-150, -120, -60, -30, -170, -10, -95, -140].map((a, i) => (
              <line key={a} x1="0" y1="0" x2={Math.cos((a * Math.PI) / 180) * (22 + i * 3)} y2={Math.sin((a * Math.PI) / 180) * (22 + i * 3)} />
            ))}
          </g>
          <g className="a-flash" filter="url(#f-bloom)">
            <ellipse cx="220" cy="276" rx="30" ry="10" fill="#fff1c7" />
          </g>

          {/* ═══════════════ B — ROBOT ARM ═══════════════ */}
          <g>
            <rect x="664" y="206" width="54" height="6" rx="1" fill="#3a4f78" />
            <rect x="686" y="212" width="8" height="88" fill="#2a3b5c" />
            <rect x="670" y="200" width="42" height="6" rx="1" fill="#2e7d4f" />
            <rect x="672" y="195" width="38" height="5" rx="1" fill="#2e7d4f" opacity="0.8" />
            {/* safety fence */}
            {range(470, 740, 30).map((x) => (
              <rect key={x} x={x} y="236" width="2" height="64" fill="#f2b33d" opacity="0.35" />
            ))}
            <rect x="470" y="236" width="272" height="2" fill="#f2b33d" opacity="0.35" />
          </g>
          <g transform="translate(605 290)">
            <rect x="-22" y="0" width="44" height="50" rx="4" fill="#2f4267" />
            <rect x="-22" y="40" width="44" height="10" fill="url(#p-hazard)" opacity="0.7" />
            <circle cx="0" cy="0" r="16" fill="#f2b33d" />
            <circle cx="0" cy="0" r="7" fill="#3a2a10" />
            <g className="r-up">
              <rect x="0" y="-8" width="80" height="16" rx="8" fill="#f2b33d" />
              <rect x="10" y="-3" width="56" height="6" rx="3" fill="#d1952a" />
              <path d="M6 -8 q30 -6 60 0" stroke="#1a1a1a" strokeWidth="1.5" fill="none" opacity="0.6" />
              <g transform="translate(80 0)">
                <circle cx="0" cy="0" r="10" fill="#e0a432" />
                <g className="r-fore">
                  <rect x="0" y="-6" width="70" height="12" rx="6" fill="#f2b33d" />
                  <circle cx="0" cy="0" r="5" fill="#3a2a10" />
                  <g transform="translate(70 0)">
                    <rect x="-3" y="-11" width="8" height="22" rx="2" fill="#5a6e92" />
                    <rect x="5" y="-11" width="8" height="5" fill="#8fa3c4" />
                    <rect x="5" y="6" width="8" height="5" fill="#8fa3c4" />
                    <circle cx="1" cy="0" r="2" fill="#3ddc84" />
                    <g className="r-pcb">
                      <rect x="9" y="-6" width="5" height="12" fill="#2e7d4f" />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g className="r-weld" filter="url(#f-bloom)">
            <circle cx="512" cy="270" r="4" fill="#cfe8ff" />
          </g>

          {/* ═══════════════ C — QC GANTRY ═══════════════ */}
          <g>
            <rect x="772" y="198" width="8" height="102" fill="url(#g-steel)" />
            <rect x="860" y="198" width="8" height="102" fill="url(#g-steel)" />
            <rect x="764" y="188" width="112" height="14" rx="3" fill="#2f4267" />
            <text x="820" y="198" className="i-plate">
              QC · LUX TEST
            </text>
            <rect x="808" y="202" width="24" height="12" rx="2" fill="#4a5e82" />
            <circle cx="868" cy="182" r="5" className="q-lamp" />
            <rect x="890" y="214" width="6" height="86" fill="#2a3b5c" />
            <rect x="878" y="176" width="96" height="58" rx="5" fill="#0a1220" stroke="#3a4c6e" strokeWidth="2" />
            <g className="q-wait">
              <text x="926" y="198" className="i-screen">
                LUX TEST
              </text>
              <text x="926" y="216" className="i-screen-dim">
                measuring…
              </text>
            </g>
            <g className="q-pass">
              <text x="926" y="198" className="i-screen-ok">
                7200 lm
              </text>
              <text x="926" y="218" className="i-screen-ok-b">
                ✓ PASS
              </text>
            </g>
          </g>
          <rect x="782" y="214" width="76" height="3" className="q-scan" />

          {/* ═══════════════ D — PACKING ═══════════════ */}
          <g>
            <rect x="1150" y="150" width="10" height="150" fill="url(#g-steel)" />
            <rect x="1080" y="146" width="90" height="12" rx="3" fill="#2f4267" />
            <text x="1125" y="155" className="i-plate">
              PACK · LABEL
            </text>
            {/* flat boxes waiting on a side table behind the line */}
            <rect x="1200" y="263" width="4" height="40" fill="#24365a" />
            <rect x="1262" y="263" width="4" height="40" fill="#24365a" />
            <rect x="1194" y="258" width="78" height="5" rx="1" fill="#33445f" />
            {range(0, 5, 1).map((i) => (
              <rect key={i} x="1200" y={252 - i * 6} width="66" height="5" fill="#c99556" stroke="#8a5f2c" strokeWidth="0.6" />
            ))}
          </g>
          <g className="d-printer">
            <rect x="1112" y="158" width="16" height="30" fill="#4a5e82" />
            <rect x="1106" y="186" width="28" height="8" rx="2" fill="#8fa3c4" />
          </g>
          <rect x="1066" y="200" width="14" height="10" rx="2" fill="#4a5e82" />

          {/* ═══════════════ CONVEYOR ═══════════════ */}
          <g>
            <rect x="80" y="312" width="1462" height="28" fill="url(#g-under)" />
            <rect x="80" y="300" width="1462" height="14" rx="7" fill="#1d2b46" />
            <rect x="80" y="300" width="1462" height="2" fill="#3a4c6e" />
            <line x1="86" y1="301" x2="1536" y2="301" className="i-belt-dash" />
            {range(96, 1530, 36).map((x) => (
              <g key={x} transform={`translate(${x} 307)`}>
                <g className="i-roller">
                  <circle r="5.5" fill="#0c1730" stroke="#4a5e82" strokeWidth="1.5" />
                  <line x1="-4" y1="0" x2="4" y2="0" stroke="#4a5e82" strokeWidth="1.2" />
                </g>
              </g>
            ))}
            {range(100, 1500, 220).map((x) => (
              <rect key={x} x={x} y="314" width="8" height="26" fill="#1d2b46" />
            ))}
          </g>

          {/* workers stand on the near side of the line */}
          <Worker x={316} y={392} scale={1.12} />
          <Worker x={1000} y={392} scale={1.12} flip className="w-qc" />

          {/* ═══════════════ THE FITTING ═══════════════ */}
          <g className="p">
            <ellipse cx="-4" cy="2" rx="48" ry="4" fill="#000" opacity="0.35" />
            <g className="p-glow">
              <polygon points="-34,-4 22,-4 50,44 -62,44" fill="url(#g-cone)" opacity="0.9" />
              <ellipse cx="-6" cy="0" rx="60" ry="12" fill="url(#g-glow)" opacity="0.8" />
              <g filter="url(#f-bloom)">
                <rect x="-36" y="-8" width="58" height="4" rx="2" fill="#fffbea" />
              </g>
            </g>
            <g className="p-raw">
              <rect x="-42" y="-26" width="74" height="20" rx="10" fill="url(#g-raw)" />
              <rect x="-42" y="-26" width="74" height="20" rx="10" fill="none" stroke="#3e4248" strokeDasharray="3 3" />
            </g>
            <g className="p-body">
              <rect x="-42" y="-26" width="74" height="20" rx="10" fill="url(#g-metal)" />
              {range(-30, 14, 8).map((x) => (
                <line key={x} x1={x} y1="-23" x2={x} y2="-12" stroke="#6c7a92" strokeWidth="2" />
              ))}
              <rect x="30" y="-21" width="22" height="9" rx="2" fill="#7d889a" />
              <path d="M-36 -24 q30 -4 60 0" stroke="#fff" strokeWidth="1" fill="none" opacity="0.55" />
              <rect x="-36" y="-8" width="58" height="4" rx="2" fill="#2a3447" />
            </g>
            <g className="p-led">
              <rect x="-36" y="-8" width="58" height="4" rx="2" fill="#2e7d4f" />
              {range(-32, 18, 6).map((x) => (
                <circle key={x} cx={x} cy="-6" r="1.1" className="p-chip" />
              ))}
            </g>
          </g>

          {/* ═══════════════ THE BOX ═══════════════ */}
          <g className="b">
            <ellipse cx="0" cy="2" rx="44" ry="4" fill="#000" opacity="0.35" />
            <rect x="-40" y="-62" width="80" height="62" rx="3" fill="url(#g-kraft)" stroke="#8a5f2c" />
            <line x1="-40" y1="-48" x2="40" y2="-48" stroke="#a87742" strokeWidth="1" />
            <text x="0" y="-26" className="b-brand">
              ELECTROCINE
            </text>
            <text x="0" y="-15" className="b-sub">
              FRAGILE · THIS WAY UP ↑
            </text>
            <rect x="-40" y="-67" width="40" height="8" rx="2" fill="#c99556" stroke="#8a5f2c" className="b-flap b-flap-l" />
            <rect x="0" y="-67" width="40" height="8" rx="2" fill="#c99556" stroke="#8a5f2c" className="b-flap b-flap-r" />
            <rect x="-40" y="-66" width="80" height="6" fill="#2a5db0" opacity="0.85" className="b-tape" />
            <g className="b-label">
              <rect x="10" y="-46" width="24" height="16" rx="1" fill="#fff" />
              {range(13, 31, 2).map((x, i) => (
                <line key={x} x1={x} y1="-43" x2={x} y2="-35" stroke="#111" strokeWidth={i % 3 ? 0.7 : 1.3} />
              ))}
              <rect x="13" y="-34" width="18" height="1.5" fill="#888" />
            </g>
          </g>

          {/* ═══════════════ DOCK WALL with open doorway ═══════════════ */}
          <rect x="1496" y="-60" width="20" height="250" fill="#1b2c4d" />
          <rect x="1488" y="168" width="36" height="14" rx="7" fill="#3a4c6e" />
          <rect x="1496" y="190" width="20" height="8" fill="url(#p-hazard)" />
          <rect x="1496" y="314" width="20" height="26" fill="#1b2c4d" />

          {/* ═══════════════ OUTSIDE ═══════════════ */}
          <rect x="1516" y="-60" width="1500" height="400" fill="url(#g-sky)" />
          {[
            [1560, 30], [1640, 0], [1720, 24], [1810, 48], [1900, -20], [1990, 70], [2070, 34], [2160, 8], [2300, 26], [2380, 66], [2450, -10], [1600, 90], [2210, 100], [2540, 40], [2620, 12], [2710, 74], [2800, 30], [2890, 58], [2960, 6],
          ].map(([x, y]) => (
            <circle key={`${x}${y}`} cx={x} cy={y} r="1.1" fill="#dfe6ff" opacity="0.8" />
          ))}
          <g filter="url(#f-bloom)">
            <circle cx="2270" cy="40" r="18" fill="#f4efe1" opacity="0.9" />
          </g>
          <circle cx="2263" cy="35" r="17" fill="#0b1630" opacity="0.4" />
          <path
            d="M1516 300 V250 h40 v-30 h36 v40 h30 v-70 h44 v60 h26 v-36 h50 v52 h34 v-88 h40 v76 h30 v-44 h46 v58 h28 v-30 h52 v-48 h38 v70 h34 v-26 h44 v48 h40 v-60 h36 v52 h40 v-34 h48 v60 h30 v-40 h40 v60 h60 V300 Z"
            fill="#0e1b33"
          />
          <g transform="translate(980 0)"><path
            d="M1516 300 V250 h40 v-30 h36 v40 h30 v-70 h44 v60 h26 v-36 h50 v52 h34 v-88 h40 v76 h30 v-44 h46 v58 h28 v-30 h52 v-48 h38 v70 h34 v-26 h44 v48 h40 v-60 h36 v52 h40 v-34 h48 v60 h30 v-40 h40 v60 h60 V300 Z"
            fill="#0e1b33"
          /></g>
          {[
            [1560, 238], [1606, 214], [1660, 200], [1666, 214], [1752, 252], [1812, 190], [1820, 206], [1886, 252], [1950, 240], [2006, 214], [2056, 242], [2120, 262], [2180, 246], [2236, 258], [2300, 270], [2420, 262],
          ].map(([x, y]) => (
            <rect key={`${x}${y}`} x={x} y={y} width="5" height="6" fill="#ffd27a" opacity="0.55" />
          ))}
          <rect x="1516" y="300" width="1500" height="40" fill="#121c30" />
          <rect x="1516" y="340" width="1500" height="140" fill="#0a111f" />
          {range(1530, 3000, 60).map((x) => (
            <rect key={x} x={x} y="398" width="30" height="3" fill="#cfd6e6" opacity="0.35" />
          ))}
          {[1880, 2120, 2360, 2600, 2840].map((x) => (
            <g key={x}>
              <polygon points={`${x + 26},214 ${x + 46},214 ${x + 120},480 ${x - 50},480`} fill="url(#g-cone-cool)" />
              <ellipse cx={x + 36} cy="410" rx="100" ry="16" fill="url(#g-pool)" />
              <rect x={x - 2} y="200" width="5" height="140" fill="#3a4c6e" />
              <rect x={x} y="200" width="34" height="4" fill="#3a4c6e" />
              <rect x={x + 22} y="204" width="28" height="8" rx="4" fill="#9aa6b8" />
              <g filter="url(#f-bloom)">
                <ellipse cx={x + 36} cy="212" rx="12" ry="3" fill="#ffffff" />
              </g>
              <ellipse cx={x + 36} cy="214" rx="26" ry="8" fill="url(#g-glow)" />
            </g>
          ))}

          {/* ═══════════════ TRUCK ═══════════════ */}
          <g className="t">
            <ellipse cx="128" cy="2" rx="130" ry="6" fill="#000" opacity="0.45" />
            <rect x="0" y="-134" width="200" height="106" rx="5" fill="url(#g-truck)" />
            <rect x="0" y="-134" width="200" height="8" rx="4" fill="#eceef2" />
            {range(40, 160, 40).map((x) => (
              <line key={x} x1={x} y1="-126" x2={x} y2="-50" stroke="#c9ced8" strokeWidth="1" />
            ))}
            <text x="100" y="-86" className="t-brand">
              ELECTROCINE
            </text>
            <text x="100" y="-70" className="t-sub">
              LED LIGHTING · MADE IN INDIA
            </text>
            <rect x="0" y="-48" width="200" height="6" fill="#1b4f9c" />
            <rect x="-4" y="-50" width="6" height="10" rx="1" fill="#ff4b4b" className="t-tail" />
            <rect x="0" y="-28" width="200" height="8" fill="#2b3446" />
            <path d="M206 -96 h40 q8 0 12 8 l18 34 v34 h-70 Z" fill="#1b4f9c" />
            <path d="M214 -88 h30 l16 30 h-46 Z" fill="#a9c4ea" />
            <path d="M218 -84 l8 0 l-10 22 h-6 Z" fill="#fff" opacity="0.35" />
            <rect x="214" y="-50" width="12" height="3" rx="1" fill="#14407f" />
            <rect x="268" y="-34" width="10" height="7" rx="2" fill="#fff3d0" />
            <g className="t-beam">
              <polygon points="278,-34 278,-26 460,10 460,-70" fill="url(#g-cone)" />
              <g filter="url(#f-bloom)">
                <ellipse cx="282" cy="-30" rx="8" ry="5" fill="#fffbea" />
              </g>
            </g>
            {[42, 158, 240].map((cx) => (
              <g key={cx} transform={`translate(${cx} -14)`}>
                <g className="t-wheel">
                  <circle r="15" fill="#0a1220" stroke="#2b3446" strokeWidth="4" />
                  <circle r="6" fill="#9aa6b8" />
                  <rect x="-1.2" y="-12" width="2.4" height="24" fill="#4a5e82" />
                  <rect x="-12" y="-1.2" width="24" height="2.4" fill="#4a5e82" />
                </g>
              </g>
            ))}
            <g className="t-exhaust">
              <circle cx="-14" cy="-22" r="6" />
              <circle cx="-26" cy="-28" r="8" />
              <circle cx="-40" cy="-34" r="10" />
            </g>
            <g className="t-speed">
              <rect x="-120" y="-110" width="90" height="2" rx="1" />
              <rect x="-160" y="-80" width="120" height="2" rx="1" />
              <rect x="-110" y="-50" width="70" height="2" rx="1" />
            </g>
          </g>
        </g>

        {/* ═══════════════ FOREGROUND (parallax, out of focus) ═══════════════ */}
        <g className="i-fg" filter="url(#f-dof)">
          {[-260, 300, 860, 1580].map((x) => (
            <g key={x}>
              <rect x={x} y="-60" width="54" height="540" fill="url(#g-pillar)" />
              <rect x={x - 6} y="330" width="66" height="150" fill="#03060c" />
              <rect x={x} y="350" width="54" height="10" fill="url(#p-hazard)" opacity="0.35" />
            </g>
          ))}
        </g>
      </svg>

      <span className="intro-grain" aria-hidden="true" />
      <span className="intro-vignette" aria-hidden="true" />

      <div className="intro-brand">
        <img src={LOGO} alt="" width="40" height="40" />
        <span>
          <strong>Electrocine</strong>
          <small>Industries</small>
        </span>
      </div>

      <div className="intro-hud">
        <ol className="intro-steps">
          {STEPS.map((s, i) => (
            <li key={s.label} data-state={step > i ? 'done' : step === i ? 'active' : 'todo'}>
              <span className="intro-step-dot" aria-hidden="true">
                {step > i ? '✓' : i + 1}
              </span>
              {s.label}
            </li>
          ))}
        </ol>
        <div className="intro-bar" aria-hidden="true">
          <span />
        </div>
      </div>

      <button type="button" className="intro-skip" onClick={skip}>
        Skip intro →
      </button>
    </div>
  );
}
