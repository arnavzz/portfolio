const { useRef, useState, useEffect } = React;

/* ════════════════════════════════════════════
   SHARED HOOKS
   ════════════════════════════════════════════ */

// Scroll-reveal: returns [ref, inView]
function useReveal(threshold = 0.18) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

// Live IST clock
function useClock() {
  const [t, setT] = useState('');
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const ist = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 5.5 * 3600000);
      const h = ist.getHours(), m = ist.getMinutes().toString().padStart(2, '0'), s = ist.getSeconds().toString().padStart(2, '0');
      setT(`${h.toString().padStart(2,'0')}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const smoothScrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) {
    // section not on this page (e.g. on Works.html) — go home to it
    window.location.href = 'index.html' + (id === 'hero' ? '' : '#' + id);
    return;
  }
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -10 });
  else window.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
};

/* ════════════════════════════════════════════
   NEURAL-NODE "A" MARK  (SVG, parametric)
   ════════════════════════════════════════════ */
function NeuralMark({ size = 30, color = '#10b981', line, dim }) {
  const lc = line || color;
  const nodes = [
    [20, 4], [7, 36], [33, 36],   // apex, BL, BR
    [13.6, 21], [26.4, 21],       // crossbar L/R
    [10.3, 28.5], [29.7, 28.5],   // mid legs
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={{ display: 'block', flexShrink: 0 }}>
      <g stroke={lc} strokeWidth="1.1" opacity={dim ? 0.55 : 0.8}>
        <line x1="20" y1="4" x2="7"  y2="36" />
        <line x1="20" y1="4" x2="33" y2="36" />
        <line x1="13.6" y1="21" x2="26.4" y2="21" />
      </g>
      <g fill={color}>
        {nodes.map((n, i) => (
          <circle key={i} cx={n[0]} cy={n[1]} r={i === 0 ? 2.2 : 1.7} />
        ))}
      </g>
    </svg>
  );
}

/* ════════════════════════════════════════════
   SCRAMBLE TEXT  (random glyphs resolve to word)
   Scrambles on mount, whenever `text` changes,
   and (optionally) on hover.
   ════════════════════════════════════════════ */
function ScrambleText({ text, style, className, scrambleOnHover = false, duration = 720, as = 'span' }) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(null);
  const Tag = as;

  const run = () => {
    const chars = '!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const len = text.length;
    const resolves = Array.from({ length: len }, (_, i) => (i / Math.max(len, 1)) * 0.55 + Math.random() * 0.4);
    const start = performance.now();
    cancelAnimationFrame(frame.current);
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      let out = '';
      for (let i = 0; i < len; i++) {
        if (text[i] === ' ') { out += ' '; continue; }
        out += p >= resolves[i] ? text[i] : chars[Math.floor(Math.random() * chars.length)];
      }
      setDisplay(out);
      if (p < 1) frame.current = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => { run(); return () => cancelAnimationFrame(frame.current); }, [text]);

  return (
    <Tag
      className={className}
      style={style}
      onMouseEnter={scrambleOnHover ? run : undefined}
    >{display}</Tag>
  );
}

/* ════════════════════════════════════════════
   MARQUEE TICKER  (repeating title strip)
   ════════════════════════════════════════════ */
function MarqueeTicker({ text, outline, color = '#f4f5f7', speed = 26, reverse, size = 'clamp(2.4rem, 7vw, 6rem)', sep = '✦', repeat = 6 }) {
  const unit = (
    <span style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
      <span style={{
        fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: size, lineHeight: 1,
        letterSpacing: '-0.02em', padding: '0 0.18em',
        color: outline ? 'transparent' : color,
        WebkitTextStroke: outline ? `1.2px ${color}` : 'none',
        textTransform: 'uppercase',
      }}>{text}</span>
      <span style={{ color: '#10b981', fontSize: `calc(${size} * 0.4)`, padding: '0 0.1em', opacity: 0.85 }}>{sep}</span>
    </span>
  );
  const row = Array.from({ length: repeat }, (_, i) => <React.Fragment key={i}>{unit}</React.Fragment>);
  return (
    <div style={{ overflow: 'hidden', width: '100%', userSelect: 'none', pointerEvents: 'none' }}>
      <div style={{ display: 'flex', width: 'max-content', animation: `studio-marquee ${speed}s linear infinite`, animationDirection: reverse ? 'reverse' : 'normal' }}>
        <div style={{ display: 'flex' }}>{row}</div>
        <div style={{ display: 'flex' }} aria-hidden="true">{row}</div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   GIANT ACT LABEL
   ════════════════════════════════════════════ */
function ActLabel({ label, index, dark = true, align = 'left' }) {
  const [ref, v] = useReveal(0.4);
  const ink = dark ? '#f4f5f7' : '#0a0c10';
  const muted = dark ? '#3a4150' : '#9aa3ad';
  return (
    <div ref={ref} style={{ overflow: 'hidden', padding: '0 clamp(20px,5vw,80px)', display: 'flex', justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <span style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800, textTransform: 'uppercase',
          fontSize: 'clamp(3.5rem, 15vw, 13rem)', lineHeight: 0.85, letterSpacing: '-0.03em',
          color: ink,
          transform: v ? 'translateY(0)' : 'translateY(105%)',
          transition: 'transform 1s cubic-bezier(0.16,1,0.3,1)',
        }}>{label}</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(0.7rem,1.1vw,0.95rem)',
          color: '#10b981', marginTop: 8, opacity: v ? 1 : 0, transition: 'opacity 0.8s ease 0.4s',
        }}>/{index}</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   NAV SHELL
   ════════════════════════════════════════════ */
function StudioNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const clock = useClock();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'Works', href: 'Works.html', external: true },
    { label: 'Process', id: 'process' },
    { label: 'About', id: 'mission' },
  ];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
      background: scrolled ? 'rgba(6,7,9,0.7)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      mixBlendMode: 'difference',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(20px,4vw,48px)', height: 70 }}>
        {/* Mark */}
        <a href="#" onClick={(e) => { e.preventDefault(); smoothScrollTo('hero'); }} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <NeuralMark size={26} color="#f4f5f7" />
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: '0.02em', color: '#f4f5f7' }}>ARNAV</span>
        </a>

        {/* Center clock */}
        <div className="nav-clock" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: '#f4f5f7', letterSpacing: '0.08em', position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
          {clock} <span style={{ opacity: 0.5 }}>IST</span>
        </div>

        {/* Desktop links */}
        <nav className="studio-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          {links.map(l => (
            <a key={l.label} href={l.external ? l.href : '#'} onClick={(e) => { if (!l.external) { e.preventDefault(); smoothScrollTo(l.id); } }}
              style={{ transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#10b981'}
              onMouseLeave={e => e.currentTarget.style.color = '#f4f5f7'}>
              <ScrambleText text={l.label} scrambleOnHover duration={500} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: 'inherit', letterSpacing: '0.04em' }} />
            </a>
          ))}
          <a href="#" onClick={(e) => { e.preventDefault(); smoothScrollTo('contact'); }}
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: '#060709', background: '#f4f5f7', padding: '9px 18px', borderRadius: 99, letterSpacing: '0.02em', display: 'inline-flex', alignItems: 'center', gap: 7, transition: 'background 0.2s, color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#10b981'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f4f5f7'; e.currentTarget.style.color = '#060709'; }}>
            Let's talk ↗
          </a>
        </nav>

        {/* Mobile toggle */}
        <button className="studio-mobile-btn" onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: 'none', color: '#f4f5f7', cursor: 'pointer', padding: 6 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="17" x2="21" y2="17"/></>}
          </svg>
        </button>
      </div>

      {open && (
        <div style={{ background: 'rgba(6,7,9,0.97)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '12px 24px 24px' }}>
          {[...links, { label: "Let's talk", id: 'contact' }].map(l => (
            <a key={l.label} href={l.external ? l.href : '#'} onClick={(e) => { if (!l.external) { e.preventDefault(); smoothScrollTo(l.id); setOpen(false); } else setOpen(false); }}
              style={{ display: 'block', padding: '15px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontFamily: "'JetBrains Mono', monospace", fontSize: 15, color: '#f4f5f7' }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

/* ════════════════════════════════════════════
   CORNER BADGE  (kept from previous build)
   ════════════════════════════════════════════ */
function StudioCornerBadge() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 2400); return () => clearTimeout(t); }, []);
  if (dismissed) return null;
  return (
    <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 180, opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(14px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(6,7,9,0.92)', backdropFilter: 'blur(14px)', border: '1px solid rgba(16,185,129,0.22)', borderRadius: 10, padding: '10px 13px', boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', flexShrink: 0, animation: 'studio-pulse 2s infinite' }} />
        <div style={{ lineHeight: 1.3 }}>
          <div style={{ fontSize: 9, color: '#5b636e', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em', textTransform: 'uppercase' }}>Currently</div>
          <div style={{ fontSize: 12.5, color: '#e2e8f0', fontWeight: 500, whiteSpace: 'nowrap' }}>That AI Guy @ OTO Capital</div>
        </div>
        <button onClick={() => setDismissed(true)} style={{ background: 'none', border: 'none', color: '#2d3748', cursor: 'pointer', padding: 2, lineHeight: 0, marginLeft: 2 }}
          onMouseEnter={e => e.currentTarget.style.color = '#64748b'} onMouseLeave={e => e.currentTarget.style.color = '#2d3748'}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { useReveal, useClock, smoothScrollTo, NeuralMark, ScrambleText, MarqueeTicker, ActLabel, StudioNav, StudioCornerBadge });
