const { useRef, useState, useEffect } = React;

function useFadeUp() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

const categoryIcons = {
  'Machine Learning': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="4" r="2"/><circle cx="4" cy="20" r="2"/><circle cx="20" cy="20" r="2"/>
      <line x1="12" y1="6" x2="4" y2="18"/><line x1="12" y1="6" x2="20" y2="18"/><line x1="4" y1="18" x2="20" y2="18"/>
    </svg>
  ),
  'Programming': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  'Domains': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  'Tools & Platforms': (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/>
    </svg>
  ),
};

const proficiencies = {
  'TensorFlow': 4, 'PyTorch': 4, 'Scikit-learn': 4, 'LangChain': 4, 'LangGraph': 5,
  'LLMs': 5, 'RAG': 4, 'BERT': 3, 'GPT': 4, 'T5': 3, 'Prompt Engineering': 5,
  'Python': 5, 'SQL': 3,
  'Deep Learning': 4, 'Generative AI': 5, 'NLP': 4, 'Computer Vision': 3, 'Data Structures & Algorithms': 3,
  'Git': 4, 'Streamlit': 4, 'REST APIs': 4, 'Postman': 3, 'AWS': 3,
};

function SkillBadge({ skill }) {
  const [hov, setHov] = useState(false);
  const level = proficiencies[skill] || 3;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
        background: hov ? 'rgba(16,185,129,0.12)' : 'rgba(30,41,59,0.8)',
        border: `1px solid ${hov ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.07)'}`,
        color: hov ? '#10b981' : '#94a3b8',
        padding: '5px 10px', borderRadius: 5, cursor: 'default',
        transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6
      }}>
      {skill}
      <span style={{ display: 'flex', gap: 2, opacity: hov ? 1 : 0.4, transition: 'opacity 0.2s' }}>
        {[1,2,3,4,5].map(i => (
          <span key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: i <= level ? '#10b981' : 'rgba(255,255,255,0.15)', display: 'inline-block' }} />
        ))}
      </span>
    </div>
  );
}

function SkillsComp() {
  const [r0, v0] = useFadeUp();

  const categories = [
    {
      title: 'Machine Learning',
      skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'LangChain', 'LangGraph', 'LLMs', 'RAG', 'BERT', 'GPT', 'T5', 'Prompt Engineering'],
    },
    {
      title: 'Programming',
      skills: ['Python', 'SQL'],
    },
    {
      title: 'Domains',
      skills: ['Deep Learning', 'Generative AI', 'NLP', 'Computer Vision', 'Data Structures & Algorithms'],
    },
    {
      title: 'Tools & Platforms',
      skills: ['Git', 'Streamlit', 'REST APIs', 'Postman', 'AWS'],
    },
  ];

  return (
    <section id="skills" style={{ padding: '100px 0', background: '#0a0f1e' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>
        <h2 ref={r0} style={{ textAlign: 'center', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, color: '#f1f5f9', marginBottom: 16, opacity: v0 ? 1 : 0, transform: v0 ? 'none' : 'translateY(24px)', transition: 'all 0.6s ease' }}>
          Skills & Expertise
        </h2>
        <p style={{ textAlign: 'center', color: '#475569', fontSize: 13.5, marginBottom: 64, fontFamily: 'JetBrains Mono, monospace' }}>
          hover a skill to see proficiency
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: 20 }}>
          {categories.map((cat, ci) => {
            const [ref, vis] = useFadeUp();
            return (
              <div key={cat.title} ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.6s ease ${ci * 80}ms, transform 0.6s ease ${ci * 80}ms`, background: 'rgba(17,24,39,0.85)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '24px 20px', backdropFilter: 'blur(8px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ color: '#10b981', flexShrink: 0 }}>{categoryIcons[cat.title]}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>{cat.title}</h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {cat.skills.map(s => <SkillBadge key={s} skill={s} />)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SkillsComp });
