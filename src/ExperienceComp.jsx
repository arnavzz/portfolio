const { useRef, useState, useEffect } = React;

function useFadeDir(dir = 'up') {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const from = dir === 'left' ? 'translateX(-36px)' : dir === 'right' ? 'translateX(36px)' : 'translateY(28px)';
  return [ref, { opacity: v ? 1 : 0, transform: v ? 'translate(0)' : from, transition: 'opacity 0.65s ease, transform 0.65s ease' }];
}

function VoiceWaveform({ active }) {
  const heights = [3,6,10,15,20,18,13,8,5,9,16,21,19,14,8,4,7,13,20,17,11,6,3,8,14,19,16,10];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2.5, height: 30, marginTop: 18, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      {heights.map((h, i) => (
        <div key={i} style={{
          width: 3, borderRadius: 2,
          background: `rgba(16,185,129,${0.35 + (h / 21) * 0.55})`,
          height: `${h}px`,
          transformOrigin: 'bottom',
          animation: active ? `waveform-bar ${0.55 + (i % 7) * 0.09}s ease-in-out infinite alternate` : 'none',
          animationDelay: `${i * 0.038}s`,
          transition: 'height 0.4s ease',
        }} />
      ))}
      <span style={{ marginLeft: 10, fontSize: 10, color: '#10b981', fontFamily: 'JetBrains Mono, monospace', opacity: 0.65, whiteSpace: 'nowrap' }}>
        AI Voice Agent · Live
      </span>
    </div>
  );
}

const Badge = ({ label }) => (
  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981', padding: '3px 9px', borderRadius: 4, display: 'inline-block' }}>{label}</span>
);

function ExpCard({ role, company, duration, location, current, bullets, tech, align, showWaveform, promotedFrom }) {
  const dir = align === 'left' ? 'left' : 'right';
  const [ref, style] = useFadeDir(dir);
  const [cardRef, cardVisible] = (() => {
    const r = useRef(null);
    const [v, setV] = useState(false);
    useEffect(() => {
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.3 });
      if (r.current) obs.observe(r.current);
      return () => obs.disconnect();
    }, []);
    return [r, v];
  })();

  return (
    <div ref={ref} style={{ ...style, background: 'rgba(17,24,39,0.85)', border: `1px solid ${current ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.07)'}`, borderRadius: 14, padding: '24px 28px', backdropFilter: 'blur(8px)', boxShadow: current ? '0 0 30px rgba(16,185,129,0.06)' : 'none' }} ref2={cardRef}>
      <div ref={cardRef} style={{ display: 'contents' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6, gap: 12, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#f1f5f9' }}>{role}</div>
            <div style={{ fontSize: 14, color: '#10b981', fontWeight: 600, marginTop: 2 }}>{company}</div>
            {promotedFrom && (
              <div style={{ fontSize: 11.5, color: '#475569', marginTop: 5, display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'JetBrains Mono, monospace' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                Promoted from {promotedFrom}
              </div>
            )}
          </div>
          {current && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 99, padding: '4px 12px', fontSize: 11, color: '#10b981', fontFamily: 'JetBrains Mono, monospace' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse-dot 1.8s infinite' }} />
                CURRENT
              </span>
              {promotedFrom && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 99, padding: '4px 12px', fontSize: 10.5, color: '#f59e0b', fontFamily: 'JetBrains Mono, monospace' }}>
                  PROMOTED
                </span>
              )}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 18, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: '#475569', display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {duration}
          </span>
          <span style={{ fontSize: 12, color: '#475569', display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {location}
          </span>
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#10b981', marginTop: 6, flexShrink: 0, fontSize: 6 }}>◆</span>
              <span style={{ fontSize: 13.5, color: '#94a3b8', lineHeight: 1.65 }}>{b}</span>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {tech.map(t => <Badge key={t} label={t} />)}
        </div>

        {showWaveform && <VoiceWaveform active={cardVisible} />}
      </div>
    </div>
  );
}

function ExperienceComp() {
  const [r0, s0] = useFadeDir('up');

  const experiences = [
    {
      role: 'AI Product Engineer',
      company: 'OTO Capital',
      duration: 'Nov 2025 – Present',
      location: 'Bengaluru, India',
      current: true,
      align: 'left',
      showWaveform: true,
      promotedFrom: 'AI Product Intern · Apr 2026',
      bullets: [
        'Engineered prompt systems for a production AI Voice Agent built on Google Gemini Live API for ultra-low-latency real-time borrower conversations.',
        'Designed an AI-driven outreach orchestration engine that autonomously selects the optimal channel (AI Call / WhatsApp / SMS / Manual) per borrower based on behavioral signals.',
        'Built a disposition analysis system: call recordings to structured insights to feedback loop, creating a self-improving AI with zero human intervention.',
        'Owned end-to-end decisions on AI behavior, escalation logic, and learning across the entire fintech collections pipeline.',
        'Collaborated with senior engineers and product teams to debug, deploy, and continuously improve reliable AI systems in a fast-moving fintech environment.',
      ],
      tech: ['Gemini Live API', 'Prompt Engineering', 'LLM', 'Python', 'Fintech AI'],
    },
    {
      role: 'Machine Learning Intern',
      company: 'Vivada Tech',
      duration: 'May 2024 – Aug 2024',
      location: 'Chennai, India',
      current: false,
      align: 'right',
      showWaveform: false,
      bullets: [
        'Developed and optimized ML models using prompt engineering, improving SDK performance by 20% for AI evaluation tools.',
        'Designed and integrated REST APIs and SDKs, reducing model deployment time by 15%.',
        'Authored technical documentation, increasing team onboarding efficiency by 30%.',
      ],
      tech: ['Python', 'REST APIs', 'Prompt Engineering', 'SDK', 'Cloud ML'],
    },
  ];

  return (
    <section id="experience" style={{ padding: '100px 0', background: '#0a0f1e' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>
        <h2 ref={r0} style={{ textAlign: 'center', fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 700, color: '#f1f5f9', marginBottom: 72, ...s0 }}>
          Experience
        </h2>

        <div style={{ position: 'relative' }} className="timeline-wrap">
          <div className="timeline-center-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, transform: 'translateX(-50%)', background: 'linear-gradient(to bottom, transparent, rgba(16,185,129,0.5) 15%, rgba(16,185,129,0.5) 85%, transparent)' }} />

          {experiences.map((exp, i) => (
            <div key={exp.company} className="timeline-row" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: i < experiences.length - 1 ? 60 : 0, position: 'relative' }}>
              <div className="timeline-slot-left" style={{ width: 'calc(50% - 24px)', display: 'flex', justifyContent: 'flex-end' }}>
                {exp.align === 'left' && <div style={{ width: '100%', paddingRight: 32 }}><ExpCard {...exp} /></div>}
              </div>
              <div style={{ flexShrink: 0, width: 48, display: 'flex', justifyContent: 'center', paddingTop: 24 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: exp.current ? '#10b981' : '#334155', border: `2px solid ${exp.current ? '#10b981' : '#475569'}`, boxShadow: exp.current ? '0 0 16px rgba(16,185,129,0.5)' : 'none' }} />
              </div>
              <div className="timeline-slot-right" style={{ width: 'calc(50% - 24px)', display: 'flex', justifyContent: 'flex-start' }}>
                {exp.align === 'right' && <div style={{ width: '100%', paddingLeft: 32 }}><ExpCard {...exp} /></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ExperienceComp });
