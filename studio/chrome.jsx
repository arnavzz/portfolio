const { useRef, useState, useEffect } = React;

/* ════════════════════════════════════════════
   BRANDED LOADER  —  neural-A draws + 0→100
   ════════════════════════════════════════════ */
function StudioLoader() {
  const [pct, setPct] = useState(0);
  const rootRef = useRef(null);

  const hide = () => {
    const el = rootRef.current;
    if (!el) return;
    el.style.opacity = '0';
    setTimeout(() => { if (el) el.style.visibility = 'hidden'; el.style.pointerEvents = 'none'; }, 560);
  };

  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n = Math.min(n + Math.random() * 11 + 5, 100);
      setPct(Math.floor(n));
      if (n >= 100) { clearInterval(id); setTimeout(hide, 480); }
    }, 90);
    // hard fallback: never trap the page
    const safety = setTimeout(hide, 2600);
    return () => { clearInterval(id); clearTimeout(safety); };
  }, []);

  const draw = Math.min(pct / 100, 1);

  return (
    <div ref={rootRef} style={{
      position: 'fixed', inset: 0, zIndex: 9000, background: '#060709',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: 1, transition: 'opacity 0.55s ease',
    }}>
      <svg width="120" height="120" viewBox="0 0 40 40" fill="none" style={{ marginBottom: 28 }}>
        <g stroke="#10b981" strokeWidth="1" strokeLinecap="round">
          {[['20','6','8','34'],['20','6','32','34'],['14','22','26','22']].map((l, i) => (
            <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 - draw, transition: 'stroke-dashoffset 0.12s linear' }} />
          ))}
        </g>
        <g fill="#10b981">
          {[[20,6,2.4],[8,34,1.8],[32,34,1.8],[14,22,1.8],[26,22,1.8]].map((c, i) => (
            <circle key={i} cx={c[0]} cy={c[1]} r={c[2]} style={{ opacity: draw > (i / 5) ? 1 : 0.15, transition: 'opacity 0.2s' }} />
          ))}
        </g>
      </svg>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#10b981', letterSpacing: '0.3em', marginBottom: 14 }}>
        ARNAV KHAMPARIA
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 42, fontWeight: 600, color: '#f4f5f7', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
        {String(pct).padStart(3, '0')}
      </div>
      <div style={{ width: 180, height: 1, background: 'rgba(255,255,255,0.1)', marginTop: 18, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${pct}%`, background: '#10b981', transition: 'width 0.1s linear' }} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   CUSTOM CURSOR  —  lagging ring + dot
   ════════════════════════════════════════════ */
function StudioCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [dark, setDark] = useState(false);   // over a light section
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setShow(true);
    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) { dotRef.current.style.left = e.clientX + 'px'; dotRef.current.style.top = e.clientY + 'px'; }
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setHover(!!(el && el.closest('a,button,[role="button"],input,textarea')));
      // detect light background act
      const lightSec = el && el.closest('#mission, [data-light]');
      setDark(!!lightSec);
    };
    const loop = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.13);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.13);
      if (ringRef.current) { ringRef.current.style.left = ring.current.x + 'px'; ringRef.current.style.top = ring.current.y + 'px'; }
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener('mousemove', move);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', move); };
  }, []);

  if (!show) return null;
  const ringColor = hover ? '#10b981' : dark ? 'rgba(10,12,16,0.5)' : 'rgba(244,245,247,0.4)';
  const dotColor = hover ? '#10b981' : dark ? '#0a0c10' : '#f4f5f7';
  const size = hover ? 46 : 28;

  return (
    <>
      <div ref={ringRef} style={{ position: 'fixed', top: 0, left: 0, width: size, height: size, borderRadius: '50%', border: `1.5px solid ${ringColor}`, background: hover ? 'rgba(16,185,129,0.06)' : 'transparent', transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 9999, transition: 'width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), border-color 0.2s, background 0.2s' }} />
      <div ref={dotRef} style={{ position: 'fixed', top: 0, left: 0, width: hover ? 0 : 4, height: hover ? 0 : 4, borderRadius: '50%', background: dotColor, transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 9999, transition: 'width 0.2s, height 0.2s, background 0.2s' }} />
    </>
  );
}

/* ════════════════════════════════════════════
   TOP SCROLL-PROGRESS BAR
   ════════════════════════════════════════════ */
function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 250, background: 'transparent', pointerEvents: 'none' }}>
      <div style={{ height: '100%', width: `${p * 100}%`, background: '#10b981', transition: 'width 0.1s linear', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
    </div>
  );
}

/* ════════════════════════════════════════════
   SECTION / ACT INDICATOR  (right edge)
   ════════════════════════════════════════════ */
function ActIndicator() {
  const acts = [
    { id: 'hero', label: 'Top' },
    { id: 'works', label: 'Works' },
    { id: 'mission', label: 'About' },
    { id: 'process', label: 'Process' },
    { id: 'contact', label: 'Contact' },
  ];
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const fn = () => {
      const pos = window.scrollY + window.innerHeight * 0.4;
      let cur = acts[0].id;
      for (const a of acts) {
        const el = document.getElementById(a.id);
        if (el && pos >= el.offsetTop) cur = a.id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const onLight = active === 'mission';
  const baseColor = onLight ? 'rgba(10,12,16,0.4)' : 'rgba(244,245,247,0.35)';

  return (
    <div className="act-indicator" style={{ position: 'fixed', right: 22, top: '50%', transform: 'translateY(-50%)', zIndex: 190, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-end' }}>
      {acts.map(a => {
        const on = active === a.id;
        return (
          <button key={a.id} onClick={() => smoothScrollTo(a.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: on ? '#10b981' : baseColor, opacity: on ? 1 : 0, transform: on ? 'translateX(0)' : 'translateX(8px)', transition: 'all 0.3s' }}>
              {a.label}
            </span>
            <span style={{ width: on ? 22 : 12, height: 1.5, background: on ? '#10b981' : baseColor, transition: 'all 0.3s', display: 'block' }} />
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, { StudioLoader, StudioCursor, ScrollProgress, ActIndicator });
