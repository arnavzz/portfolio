const { useRef, useState, useEffect } = React;

/* ════════════════════════════════════════════
   NEURAL-NODE "A"  —  Three.js
   Nodes arranged into an "A" glyph + ambient net.
   Gentle oscillating rotation + mouse tilt.
   ════════════════════════════════════════════ */
function NeuralA() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const THREE = window.THREE;
    const canvas = canvasRef.current;
    if (!THREE || !canvas) return;

    const getSize = () => ({ w: canvas.offsetWidth, h: canvas.offsetHeight });
    let { w, h } = getSize();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 1, 2000);
    camera.position.z = 460;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const group = new THREE.Group();
    group.position.set(60, 70, 0);   // shift A up-and-right; text lives bottom-left
    scene.add(group);

    /* ── Build the "A" glyph from sampled nodes ── */
    const glyph = [];
    const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const apex = [0, 150], bl = [-110, -150], br = [110, -150];
    const cbL = [-46, -18], cbR = [46, -18];

    const sample = (a, b, n) => { for (let i = 0; i <= n; i++) glyph.push(lerp(a, b, i / n)); };
    sample(apex, bl, 11);   // left leg
    sample(apex, br, 11);   // right leg
    sample(cbL, cbR, 7);    // crossbar

    const glyphPts = glyph.map(([x, y]) => new THREE.Vector3(x, y, (Math.random() - 0.5) * 26));

    /* ── Ambient net nodes around the glyph ── */
    const ambient = [];
    for (let i = 0; i < 40; i++) {
      const ang = Math.random() * Math.PI * 2;
      const rad = 180 + Math.random() * 150;
      ambient.push(new THREE.Vector3(Math.cos(ang) * rad, (Math.random() - 0.5) * 420, Math.sin(ang) * rad - 40));
    }

    const all = [...glyphPts, ...ambient];

    /* Points — base */
    const baseArr = new Float32Array(all.length * 3);
    all.forEach((p, i) => { baseArr[i*3]=p.x; baseArr[i*3+1]=p.y; baseArr[i*3+2]=p.z; });
    const baseGeo = new THREE.BufferGeometry();
    baseGeo.setAttribute('position', new THREE.BufferAttribute(baseArr, 3));
    group.add(new THREE.Points(baseGeo, new THREE.PointsMaterial({ color: 0x10b981, size: 4.2, sizeAttenuation: true, transparent: true, opacity: 0.92 })));

    /* Points — bright glyph accents */
    const accArr = new Float32Array(glyphPts.length * 3);
    glyphPts.forEach((p, i) => { accArr[i*3]=p.x; accArr[i*3+1]=p.y; accArr[i*3+2]=p.z; });
    const accGeo = new THREE.BufferGeometry();
    accGeo.setAttribute('position', new THREE.BufferAttribute(accArr, 3));
    const accMat = new THREE.PointsMaterial({ color: 0x6ee7b7, size: 7, sizeAttenuation: true, transparent: true, opacity: 0.5 });
    group.add(new THREE.Points(accGeo, accMat));

    /* Lines — explicit glyph strokes (always legible) + proximity net */
    const segs = [];
    const connectRange = (start, end) => { for (let i = start; i < end - 1; i++) segs.push(glyph[i], glyph[i+1]); };
    // glyph index ranges: left leg 0..11 (12 pts), right leg 12..23, crossbar 24..31
    connectRange(0, 12); connectRange(12, 24); connectRange(24, 32);

    const lineArr = [];
    segs.forEach(([x, y], i) => {
      const p = glyphPts[glyph.indexOf(segs[i])] || new THREE.Vector3(x, y, 0);
      lineArr.push(p.x, p.y, p.z);
    });
    // proximity among all
    for (let i = 0; i < all.length; i++)
      for (let j = i + 1; j < all.length; j++)
        if (all[i].distanceTo(all[j]) < 92) lineArr.push(all[i].x, all[i].y, all[i].z, all[j].x, all[j].y, all[j].z);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lineArr), 3));
    group.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.17 })));

    /* ── Animation ── */
    let tX = 0, tY = 0, cX = 0, cY = 0, time = 0, animId;
    const onMove = (e) => { tX = (e.clientX / window.innerWidth - 0.5) * 0.5; tY = (e.clientY / window.innerHeight - 0.5) * 0.3; };
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      time += 0.01;
      cX += (tX - cX) * 0.05; cY += (tY - cY) * 0.05;
      group.rotation.y = Math.sin(time * 0.4) * 0.28 + cX;   // gentle oscillation, stays legible
      group.rotation.x = cY * 0.6;
      accMat.opacity = 0.35 + Math.sin(time * 1.6) * 0.2;     // pulse
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => { const s = getSize(); camera.aspect = s.w / s.h; camera.updateProjectionMatrix(); renderer.setSize(s.w, s.h); };
    window.addEventListener('resize', onResize);

    return () => { cancelAnimationFrame(animId); window.removeEventListener('mousemove', onMove); window.removeEventListener('resize', onResize); renderer.dispose(); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
}

/* ════════════════════════════════════════════
   HERO ACT
   ════════════════════════════════════════════ */
function StudioHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 200); return () => clearTimeout(t); }, []);

  const fade = (d) => ({ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)', transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${d}ms` });

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: '#060709', display: 'flex', alignItems: 'flex-end' }}>
      <NeuralA />

      {/* vignette — weighted to the lower-left where text sits */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 80%, rgba(6,7,9,0.7) 0%, transparent 55%), radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(6,7,9,0.4) 90%)', pointerEvents: 'none' }} />

      {/* debug-panel homage (engineer signature) */}
      <div className="hero-debug" style={{ position: 'absolute', top: 92, right: 'clamp(20px,4vw,48px)', fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#3a4150', lineHeight: 1.9, textAlign: 'right', pointerEvents: 'none', ...fade(900) }}>
        <div>model: <span style={{ color: '#10b981' }}>neural_A</span></div>
        <div>nodes: <span style={{ color: '#6b7280' }}>{86}</span> · edges: <span style={{ color: '#6b7280' }}>live</span></div>
        <div>status: <span style={{ color: '#10b981' }}>● rendering</span></div>
      </div>

      {/* content — anchored bottom-left, asymmetric */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', padding: '0 clamp(20px,5vw,72px) clamp(96px,12vh,150px)', textAlign: 'left' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(0.7rem,1.2vw,0.85rem)', color: '#10b981', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 'clamp(16px,2vw,26px)', ...fade(100) }}>
          AI Product Engineer · OTO Capital
        </div>

        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 0.88, letterSpacing: '-0.03em', margin: 0, ...fade(250) }}>
          <span style={{ display: 'block', fontSize: 'clamp(3rem,12vw,11rem)', color: '#f4f5f7' }}>ARNAV</span>
          <span style={{ display: 'block', fontSize: 'clamp(3rem,12vw,11rem)', color: 'transparent', WebkitTextStroke: '1.5px #6b7280' }}>KHAMPARIA</span>
        </h1>

        <p style={{ maxWidth: 480, margin: 'clamp(22px,3vw,34px) 0 0', fontSize: 'clamp(0.95rem,1.5vw,1.15rem)', color: '#9aa3ad', lineHeight: 1.7, ...fade(450) }}>
          I build AI systems that work in production: LLM pipelines, RAG architectures, and real-time voice agents at scale.
        </p>
      </div>

      {/* scroll cue — moved to right to balance the left-weighted text */}
      <div onClick={() => smoothScrollTo('works-label')} style={{ position: 'absolute', bottom: 34, right: 'clamp(20px,4vw,48px)', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', ...fade(1100) }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6b7280', letterSpacing: '0.1em' }}>scroll to explore</span>
        <span style={{ color: '#10b981', animation: 'studio-nudge 1.6s ease-in-out infinite' }}>→</span>
      </div>

      {/* corner crosshairs */}
      <span className="xhair" style={{ top: 84, left: 'clamp(20px,4vw,48px)' }} />
      <span className="xhair" style={{ top: 84, right: 'clamp(20px,4vw,48px)' }} />
    </section>
  );
}

Object.assign(window, { NeuralA, StudioHero });
