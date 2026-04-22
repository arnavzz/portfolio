const { useRef, useState, useEffect } = React;

function useFadeUp(delay = 0) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v, delay];
}

function CountUp({ to, suffix = '', dur = 1600 }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        obs.disconnect();
        let start;
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          setN(Math.round(p * to));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return <span ref={ref}>{n}{suffix}</span>;
}

function AboutComp() {
  const [r1, v1] = useFadeUp(0);
  const [r2, v2] = useFadeUp(100);
  const [r3, v3] = useFadeUp(200);

  const fade = (v, delay = 0) => ({
    opacity: v ? 1 : 0,
    transform: v ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
  });

  const statCards = [
    { to: 2, suffix: '+', label: 'Years in AI' },
    { to: 2, suffix: '',  label: 'Internships' },
    { to: 1, suffix: '',  label: 'Publication' },
    { to: 4, suffix: '+', label: 'Projects'    },
  ];

  return (
    <section id="about" style={{ padding: '100px 0', background: '#0d1424' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>

        <h2 ref={r1} style={{ textAlign: 'center', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, color: '#f1f5f9', marginBottom: 72, ...fade(v1) }}>
          About Me
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,3fr)', gap: 64, alignItems: 'flex-start' }} className="about-grid">

          {/* Photo */}
          <div ref={r2} style={{ ...fade(v2, 100) }}>
            <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
              <img
                src="assets/images/profile.png"
                alt="Arnav Khamparia"
                style={{ width: '100%', borderRadius: 20, display: 'block', animation: 'glow-ring 3.5s ease-in-out infinite' }}
              />
              {/* Decorative corner accent */}
              <div style={{ position: 'absolute', top: -8, left: -8, width: 48, height: 48, border: '2px solid #10b981', borderRight: 'none', borderBottom: 'none', borderRadius: '4px 0 0 0', opacity: 0.5 }} />
              <div style={{ position: 'absolute', bottom: -8, right: -8, width: 48, height: 48, border: '2px solid #10b981', borderLeft: 'none', borderTop: 'none', borderRadius: '0 0 4px 0', opacity: 0.5 }} />
            </div>

            {/* Education badge */}
            <div style={{ marginTop: 24, padding: '16px 20px', background: 'rgba(17,24,39,0.9)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 12, backdropFilter: 'blur(8px)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.8">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: '#f1f5f9', marginBottom: 3 }}>B.Tech in AI / ML</div>
                  <div style={{ fontSize: 12, color: '#6366f1', fontFamily: 'JetBrains Mono, monospace' }}>MITS, Gwalior</div>
                  <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 2 }}>2021 – 2025</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div ref={r3} style={{ ...fade(v3, 180) }}>
            <p style={{ fontSize: 15.5, color: '#94a3b8', lineHeight: 1.8, marginBottom: 20 }}>
              I'm Arnav, an AI/ML Engineer who builds systems that actually ship.
            </p>
            <p style={{ fontSize: 15.5, color: '#94a3b8', lineHeight: 1.8, marginBottom: 20 }}>
              Currently at <span style={{ color: '#10b981', fontWeight: 600 }}>OTO Capital</span>, I'm engineering production AI Voice Agents using Google Gemini Live API, designing self-improving feedback loops, and owning end-to-end decisions on how AI behaves at scale across a real fintech collections pipeline.
            </p>
            <p style={{ fontSize: 15.5, color: '#94a3b8', lineHeight: 1.8, marginBottom: 20 }}>
              My work sits at the intersection of ML engineering and product. I care about models that perform in the real world, not just on benchmarks. My toolkit spans <span style={{ color: '#e2e8f0' }}>LLMs, RAG architectures, LangGraph workflows,</span> and computer vision, backed by a <span style={{ color: '#6366f1', fontWeight: 600 }}>published study in Springer</span> on medical image segmentation.
            </p>
            <p style={{ fontSize: 15.5, color: '#94a3b8', lineHeight: 1.8, marginBottom: 40 }}>
              I'm driven by problems where AI can reduce friction, create clarity, and generate measurable impact. If you're building something ambitious in that space, I'd love to talk.
            </p>

            {/* Stat counter cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {statCards.map(s => (
                <div key={s.label} style={{ background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '16px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#10b981', fontFamily: 'JetBrains Mono, monospace', lineHeight: 1 }}>
                    <CountUp to={s.to} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: 10.5, color: '#475569', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { AboutComp });
