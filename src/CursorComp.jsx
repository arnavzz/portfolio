const { useRef, useState, useEffect } = React;

function CursorComp() {
  const ringRef = useRef(null);
  const dotRef  = useRef(null);
  const pos     = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const [hov, setHov]   = useState(false);
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only on fine-pointer (desktop) devices
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setShow(true);
    document.documentElement.style.setProperty('--cursor-display', 'none');

    const lerp = (a, b, t) => a + (b - a) * t;
    let animId;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top  = `${e.clientY}px`;
      }
      const el = document.elementFromPoint(e.clientX, e.clientY);
      setHov(!!(el && el.closest('a,button,[role="button"]')));
    };

    const onDown = () => setClick(true);
    const onUp   = () => setClick(false);

    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.11);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.11);
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top  = `${ring.current.y}px`;
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    return () => {
      cancelAnimationFrame(animId);
      document.documentElement.style.removeProperty('--cursor-display');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
    };
  }, []);

  if (!show) return null;

  const ringSize = click ? 22 : hov ? 54 : 36;

  return (
    <>
      {/* Lagging ring */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99999,
        width: ringSize, height: ringSize, borderRadius: '50%',
        border: `1.5px solid ${hov ? 'rgba(16,185,129,0.85)' : 'rgba(255,255,255,0.4)'}`,
        background: hov ? 'rgba(16,185,129,0.07)' : 'transparent',
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.22s cubic-bezier(0.22,1,0.36,1), height 0.22s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, background 0.2s',
      }} />
      {/* Exact dot */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99999,
        width: hov ? 3 : 5, height: hov ? 3 : 5, borderRadius: '50%',
        background: hov ? '#10b981' : 'rgba(255,255,255,0.85)',
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.15s, height 0.15s, background 0.15s',
      }} />
    </>
  );
}

Object.assign(window, { CursorComp });
