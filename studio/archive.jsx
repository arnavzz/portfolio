const { useRef, useState, useEffect } = React;

const ARCHIVE = [
  { year: '2025', date: '07.18', title: 'LangGraph Agentic Workflow', cats: ['Agentic AI', 'LLM', 'Tooling'], image: 'assets/images/project1.jpg', metric: '50% scan time reduction', link: 'https://arnavzz-langgraph-agentic-workflow-app-nqwjzw.streamlit.app/' },
  { year: '2025', date: '07.29', title: 'Generative SEO Augmenter', cats: ['Generative AI', 'RAG', 'Web'], image: 'assets/images/project4.png', metric: 'SERP gap analysis engine', link: 'https://augai.netlify.app/' },
  { year: '2024', date: '11.02', title: 'Super Resolution (ESRGAN)', cats: ['Computer Vision', 'Research'], image: 'assets/images/project2.png', metric: 'SOTA sharpness recovery', link: 'https://github.com/arnavzz' },
  { year: '2024', date: '03.20', title: 'Liver Tumor Segmentation', cats: ['Medical AI', 'Research', 'Published'], image: 'assets/images/project3.jpg', metric: 'Dice 0.93 · Springer 2024', link: 'https://link.springer.com/chapter/10.1007/978-981-96-3333-3_6' },
];

const ALL_CATS = ['All', 'Agentic AI', 'Generative AI', 'Computer Vision', 'Medical AI', 'RAG', 'LLM', 'Research', 'Published', 'Web', 'Tooling'];

function ArchiveCard({ p, i }) {
  const [ref, v] = useReveal(0.12);
  const [hover, setHover] = useState(false);
  return (
    <a ref={ref} href={p.link} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'block', opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(30px)', transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${(i % 2) * 0.08}s` }}>
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 5, aspectRatio: '16/10', marginBottom: 16 }}>
        <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.4s', transform: hover ? 'scale(1.05)' : 'scale(1)', filter: hover ? 'none' : 'grayscale(50%) brightness(0.8)' }} />
        <div style={{ position: 'absolute', inset: 0, mixBlendMode: 'screen', background: hover ? 'linear-gradient(115deg, rgba(255,0,80,0.07), transparent 45%, rgba(0,200,255,0.07))' : 'transparent', transition: 'background 0.4s' }} />
        <div style={{ position: 'absolute', top: 13, left: 13, fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#f4f5f7', background: 'rgba(6,7,9,0.55)', backdropFilter: 'blur(6px)', padding: '4px 9px', borderRadius: 3 }}>{p.year} · {p.date}</div>
        <div style={{ position: 'absolute', top: 13, right: 13, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#9aa3ad', display: 'flex', gap: 5 }}>
          {p.cats.slice(0, 2).map(c => <span key={c}>[{c}]</span>)}
        </div>
        <div style={{ position: 'absolute', bottom: 13, left: 15, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6ee7b7', opacity: hover ? 1 : 0, transform: hover ? 'translateY(0)' : 'translateY(6px)', transition: 'all 0.3s' }}>{p.metric}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(1.1rem,1.8vw,1.5rem)', color: hover ? '#10b981' : '#f4f5f7', lineHeight: 1.15, transition: 'color 0.2s', margin: 0 }}>{p.title}</h3>
        <span style={{ color: hover ? '#10b981' : '#5b636e', transition: 'color 0.2s', fontSize: 14 }}>↗</span>
      </div>
    </a>
  );
}

function Archive() {
  const [filter, setFilter] = useState('All');
  const counts = {};
  ALL_CATS.forEach(c => { counts[c] = c === 'All' ? ARCHIVE.length : ARCHIVE.filter(p => p.cats.includes(c)).length; });
  const shown = filter === 'All' ? ARCHIVE : ARCHIVE.filter(p => p.cats.includes(filter));

  return (
    <main style={{ background: '#060709', minHeight: '100vh', paddingTop: 120 }}>
      {/* header */}
      <div style={{ padding: '0 clamp(20px,5vw,80px) clamp(30px,4vw,50px)' }}>
        <a href="index.html" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#5b636e', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 30, transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#10b981'} onMouseLeave={e => e.currentTarget.style.color = '#5b636e'}>
          ← Back home
        </a>
        <div style={{ overflow: 'hidden' }}>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(3rem,12vw,9rem)', color: '#f4f5f7', lineHeight: 0.9, letterSpacing: '-0.03em', margin: 0 }}>WORKS</h1>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#5b636e', marginTop: 16 }}>{ARCHIVE.length} projects · 2024 – 2025</div>
      </div>

      {/* layout: sidebar + grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'clamp(24px,4vw,56px)', padding: '0 clamp(20px,5vw,80px) clamp(60px,10vh,120px)', alignItems: 'flex-start' }} className="archive-layout">
        {/* sidebar */}
        <aside className="archive-sidebar" style={{ position: 'sticky', top: 100, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20 }}>
          {ALL_CATS.map(c => (
            <button key={c} onClick={() => setFilter(c)} disabled={counts[c] === 0}
              style={{ display: 'flex', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', padding: '9px 0', cursor: counts[c] === 0 ? 'default' : 'pointer', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: filter === c ? '#10b981' : counts[c] === 0 ? '#2d3748' : '#9aa3ad', textAlign: 'left', transition: 'color 0.2s' }}
              onMouseEnter={e => { if (counts[c] && filter !== c) e.currentTarget.style.color = '#f4f5f7'; }}
              onMouseLeave={e => { if (filter !== c) e.currentTarget.style.color = counts[c] === 0 ? '#2d3748' : '#9aa3ad'; }}>
              <span>{c}</span>
              <span style={{ opacity: 0.6 }}>[{counts[c]}]</span>
            </button>
          ))}
        </aside>

        {/* grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))', gap: 'clamp(24px,3vw,44px)' }}>
          {shown.map((p, i) => <ArchiveCard key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { Archive });
