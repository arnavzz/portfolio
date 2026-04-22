const { useState, useEffect } = React;

function CornerBadge() {
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible]     = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2200);
    return () => clearTimeout(t);
  }, []);

  if (dismissed) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 28, left: 28, zIndex: 300,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'rgba(6,11,24,0.94)', backdropFilter: 'blur(14px)',
        border: '1px solid rgba(16,185,129,0.22)', borderRadius: 10,
        padding: '10px 14px 10px 12px', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', flexShrink: 0, animation: 'pulse-dot 2s infinite' }} />
        <div style={{ lineHeight: 1.3 }}>
          <div style={{ fontSize: 9.5, color: '#475569', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
            Currently
          </div>
          <div style={{ fontSize: 12.5, color: '#e2e8f0', fontWeight: 500, whiteSpace: 'nowrap' }}>
            That AI Guy @ OTO Capital
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          style={{ background: 'none', border: 'none', color: '#2d3748', padding: '2px', marginLeft: 2, lineHeight: 0, transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#64748b'}
          onMouseLeave={e => e.currentTarget.style.color = '#2d3748'}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { CornerBadge });
