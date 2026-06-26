const { useRef, useState, useEffect } = React;

function useFadeUp(delay = 0) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, { opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(28px)', transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms` }];
}

function RecognitionComp() {
  const [r0, s0] = useFadeUp(0);
  const [r1, s1] = useFadeUp(100);
  const [r2, s2] = useFadeUp(180);
  const [r3, s3] = useFadeUp(260);

  return (
    <section id="publications" style={{ padding: '100px 0', background: '#0d1424' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>

        {/* ── Publications ── */}
        <h2 ref={r0} style={{ textAlign: 'center', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, color: '#f1f5f9', marginBottom: 16, ...s0 }}>
          Publications
        </h2>
        <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', marginBottom: 52 }}>
          peer-reviewed research
        </p>

        <div ref={r1} style={{ ...s1, marginBottom: 80 }}>
          <div style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 16, padding: '32px 36px', backdropFilter: 'blur(8px)', display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Icon */}
            <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.8">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
                <h3 style={{ fontSize: 16.5, fontWeight: 700, color: '#f1f5f9', flex: 1 }}>
                  Liver Tumor Segmentation with U-Net, V-Net and AH-Net Using MONAI
                </h3>
                <span style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8', fontSize: 11, fontFamily: 'JetBrains Mono, monospace', padding: '4px 10px', borderRadius: 4, flexShrink: 0 }}>
                  Dice: 0.93
                </span>
              </div>

              <div style={{ display: 'flex', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12.5, color: '#6366f1', fontWeight: 600 }}>Springer Book Series</span>
                <span style={{ fontSize: 12.5, color: '#475569' }}>· 2024</span>
                <span style={{ fontSize: 12, color: '#475569', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  Co-authored
                </span>
              </div>

              <p style={{ fontSize: 13.5, color: '#64748b', lineHeight: 1.7, marginBottom: 20 }}>
                Comparative study of U-Net, V-Net, and AH-Net architectures for liver CT scan segmentation using the MONAI framework. V-Net achieved the highest Dice score of 0.93, excelling in volumetric segmentation.
              </p>

              <a href="https://link.springer.com/chapter/10.1007/978-981-96-3333-3_6" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: '#6366f1', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', padding: '8px 18px', borderRadius: 7, transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.18)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,102,241,0.1)'}>
                View Publication
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── Accolades ── */}
        <h2 ref={r2} style={{ textAlign: 'center', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, color: '#f1f5f9', marginBottom: 52, ...s2 }}>
          Leadership & Recognition
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))', gap: 20 }} ref={r3}>
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.8">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              ),
              color: '#10b981',
              title: 'Technical Lead',
              org: 'Artificial Intelligence Club',
              bullets: [
                'Led 10+ team projects and hands-on workshops on AI/ML topics',
                'Mentored 20+ students in Python and TensorFlow',
                'Drove successful deployment of student-built AI projects',
              ],
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                  <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
                </svg>
              ),
              color: '#f59e0b',
              title: 'Content Coordinator',
              org: 'MITS Alumni Community',
              bullets: [
                'Developed content strategies for newsletters and social campaigns',
                'Increased alumni engagement by 40% through targeted outreach',
                'Managed editorial calendar across multiple communication channels',
              ],
            },
          ].map((item, i) => (
            <div key={item.title} style={{ ...s3, transitionDelay: `${260 + i * 80}ms`, background: 'rgba(17,24,39,0.85)', border: `1px solid rgba(255,255,255,0.07)`, borderRadius: 14, padding: '26px 28px', backdropFilter: 'blur(8px)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `${item.color}12`, border: `1px solid ${item.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 15.5, fontWeight: 700, color: '#f1f5f9', marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: item.color, fontWeight: 600, marginBottom: 16 }}>{item.org}</div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {item.bullets.map((b, bi) => (
                      <li key={bi} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{ color: item.color, fontSize: 6, marginTop: 7, flexShrink: 0 }}>◆</span>
                        <span style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { RecognitionComp });
