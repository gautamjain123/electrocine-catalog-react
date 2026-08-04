import { useApp } from '../lib/ui.jsx';

export default function Toast() {
  const { toast } = useApp();
  return (
    /* Always mounted so assistive tech has a live region to announce into;
       the visual chip only appears when there is something to say. */
    <div role="status" aria-live="polite" className={toast ? undefined : 'visually-hidden'}>
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: 26,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            maxWidth: 'calc(100vw - 32px)',
            background: 'var(--navy)',
            color: 'var(--bg)',
            border: '1px solid rgba(255,255,255,.2)',
            padding: '14px 20px',
            boxShadow: '0 18px 44px rgba(0,0,0,.4)',
          }}
        >
          <span aria-hidden="true" style={{ width: 7, height: 7, flex: '0 0 auto', background: 'var(--accent-light)' }} />
          <span style={{ fontSize: 13.5, letterSpacing: '.02em' }}>{toast}</span>
        </div>
      )}
    </div>
  );
}
