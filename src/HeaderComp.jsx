const { useState, useEffect } = React;

function HeaderComp() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('hero');
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = ['hero','about','experience','projects','skills','publications','contact'];
      const pos = window.scrollY + 120;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActive(id); break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
    setOpen(false);
  };

  const links = ['About','Experience','Projects','Skills','Publications','Contact'];

  const navBtn = (label) => (
    <button key={label} onClick={() => go(label.toLowerCase())} style={{
      background: 'none', border: 'none', cursor: 'pointer',
      fontSize: 13, fontWeight: 500, letterSpacing: '0.02em',
      color: active === label.toLowerCase() ? '#10b981' : '#94a3b8',
      fontFamily: 'Inter, sans-serif', padding: '4px 0',
      borderBottom: active === label.toLowerCase() ? '2px solid #10b981' : '2px solid transparent',
      transition: 'color 0.2s, border-color 0.2s'
    }}>{label}</button>
  );

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'background 0.3s, box-shadow 0.3s',
      background: scrolled ? 'rgba(10,15,30,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        <div onClick={() => go('hero')} style={{ cursor: 'pointer' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#f1f5f9', lineHeight: 1.2 }}>Arnav Khamparia</div>
          <div style={{ fontSize: 11, color: '#10b981', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em', marginTop: 2 }}>AI/ML Engineer</div>
        </div>

        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {links.map(navBtn)}
        </nav>

        <button className="mobile-menu-btn" onClick={() => setOpen(!open)} style={{
          background: 'none', border: 'none', cursor: 'pointer', color: '#f1f5f9', padding: 6, display: 'none'
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </div>

      {open && (
        <div style={{
          background: 'rgba(10,15,30,0.97)', backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255,255,255,0.06)', padding: '8px 28px 20px'
        }}>
          {links.map(l => (
            <button key={l} onClick={() => go(l.toLowerCase())} style={{
              display: 'block', width: '100%', textAlign: 'left',
              padding: '14px 0', background: 'none', border: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              color: active === l.toLowerCase() ? '#10b981' : '#cbd5e1',
              fontSize: 15, fontFamily: 'Inter, sans-serif', cursor: 'pointer'
            }}>{l}</button>
          ))}
        </div>
      )}
    </header>
  );
}

Object.assign(window, { HeaderComp });
