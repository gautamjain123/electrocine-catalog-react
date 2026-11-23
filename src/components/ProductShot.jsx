/* Studio presentation for a catalogue cut-out: a cyclorama backdrop, a soft
   halo, contact shadow and a faint floor reflection.

   The shot is "lit" (halo up, gentle glow) either by the `lit` prop or by
   hovering the nearest `.shot-host` ancestor — so a whole card can turn the
   light on, not just the image area.

   Real photographs (public/ig/) are not cut-outs, so they get no studio
   treatment: the photo fills the frame (object-fit: cover, no filters), drawn
   from native pixels.

   tone: 'light' — warm studio sweep, for cards
         'glow'  — no backdrop, lamp-warm halo, for ivory surfaces
         'dark'  — no backdrop, cool emission, for navy surfaces */
const isPhoto = (src) => typeof src === 'string' && src.startsWith('/ig/');

export default function ProductShot({ src, alt = '', tone = 'light', lit = false, reflect = true, loading = 'lazy', className = '', style, focus }) {
  if (isPhoto(src)) {
    return (
      <span className={`shot shot-photo ${className}`} style={style}>
        <img src={src} alt={alt} loading={loading} decoding="async" draggable="false" style={focus ? { objectPosition: focus } : undefined} />
      </span>
    );
  }
  return (
    <span className={`shot shot-${tone} ${className}`} data-lit={lit ? '' : undefined} style={style}>
      <span className="shot-halo" aria-hidden="true" />
      <span className="shot-obj">
        <span className="shot-floor" aria-hidden="true" />
        <img className="shot-img" src={src} alt={alt} loading={loading} decoding="async" draggable="false" />
        {reflect && <img className="shot-refl" src={src} alt="" aria-hidden="true" loading={loading} decoding="async" draggable="false" />}
      </span>
    </span>
  );
}
