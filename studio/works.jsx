const { useRef, useState, useEffect } = React;

const WORKS_DATA = [
  {
    year: '2025', date: '07.18', title: 'LangGraph Agentic Workflow',
    subtitle: 'An agentic cybersecurity engine orchestrating LLM-driven recon tasks with concurrent execution and a live Streamlit dashboard.',
    metric: '50% scan time reduction', image: 'assets/images/project1.jpg',
    tags: ['LangGraph', 'LLM', 'Python', 'Streamlit'], role: 'Design · Build · Ship',
    link: 'https://arnavzz-langgraph-agentic-workflow-app-nqwjzw.streamlit.app/',
  },
  {
    year: '2024', date: '11.02', title: 'Super Resolution',
    subtitle: 'Enhanced Super-Resolution GAN (ESRGAN) outperforming SOTA methods in sharpness and detail recovery for image upscaling.',
    metric: 'SOTA sharpness recovery', image: 'assets/images/project2.png',
    tags: ['PyTorch', 'TensorFlow', 'GAN', 'RRDB'], role: 'Research · Implementation',
    link: 'https://github.com/arnavzz',
  },
  {
    year: '2024', date: '03.20', title: 'Liver Tumor Segmentation',
    subtitle: 'Comparative study of U-Net, V-Net & AH-Net for liver CT segmentation using MONAI. Published as a Springer book chapter.',
    metric: 'Dice 0.93 · Springer 2024', image: 'assets/images/project3.jpg',
    tags: ['MONAI', 'V-Net', 'Medical AI', 'Published'], role: 'Co-author · Experiments',
    link: 'https://link.springer.com/chapter/10.1007/978-981-96-3333-3_6',
  },
  {
    year: '2025', date: '07.29', title: 'Generative SEO Augmenter',
    subtitle: 'A GenAI tool analyzing SERP results to surface content gaps and auto-generate FAQs, fact tables, and SEO schema markup.',
    metric: 'SERP gap analysis engine', image: 'assets/images/project4.png',
    tags: ['RAG', 'LLM', 'React', 'SEO'], role: 'Full-stack · GenAI',
    link: 'https://augai.netlify.app/',
  },
];

/* ════════════════════════════════════════════
   3D COVERFLOW CAROUSEL  (scroll-driven)
   The ring rotates as you scroll through a tall
   pinned section. Center card faces front.
   ════════════════════════════════════════════ */
function WorksCarousel() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);   // float index
  const n = WORKS_DATA.length;

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setActive(p * (n - 1));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const idx = Math.round(active);
  const cur = WORKS_DATA[idx];

  const jumpTo = (i) => {
    const el = sectionRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + (i / (n - 1)) * total;
    if (window.__lenis) window.__lenis.scrollTo(target);
    else window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <section id="works" ref={sectionRef} style={{ height: `${n * 95 + 30}vh`, background: '#060709', position: 'relative' }}>
      {/* pinned viewport */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* faint giant index behind */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-58%)', fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(16rem,40vw,40rem)', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.035)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}>
          {String(idx + 1).padStart(2, '0')}
        </div>

        {/* 3D stage */}
        <div style={{ flex: 1, position: 'relative', perspective: '2200px', perspectiveOrigin: '50% 45%' }}>
          {WORKS_DATA.map((p, i) => {
            const offset = i - active;
            const abs = Math.abs(offset);
            const hidden = abs > 2.4;
            const cardStyle = {
              position: 'absolute', left: '50%', top: '50%',
              width: 'min(60vw, 660px)', aspectRatio: '16 / 10',
              transform: `translate(-50%,-50%) translateX(${offset * 58}%) translateZ(${-abs * 280}px) rotateY(${-offset * 40}deg) scale(${1 - abs * 0.04})`,
              opacity: hidden ? 0 : 1 - abs * 0.22,
              zIndex: 100 - Math.round(abs * 10),
              transition: 'transform 0.12s linear, opacity 0.25s linear',
              pointerEvents: Math.round(active) === i ? 'auto' : 'none',
              borderRadius: 6, overflow: 'hidden',
              boxShadow: `0 40px 90px rgba(0,0,0,${0.6 - abs * 0.15})`,
              cursor: 'pointer',
            };
            return (
              <a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer" style={cardStyle}>
                <img src={p.image} alt={p.title} draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: Math.round(active) === i ? 'none' : 'grayscale(55%) brightness(0.7)', transition: 'filter 0.4s' }} />
                {/* chromatic edge */}
                <div style={{ position: 'absolute', inset: 0, mixBlendMode: 'screen', background: 'linear-gradient(115deg, rgba(255,0,80,0.05), transparent 45%, rgba(0,200,255,0.05))', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,7,9,0.72), transparent 55%)' }} />
                {/* date stamp */}
                <div style={{ position: 'absolute', top: 14, left: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#f4f5f7', background: 'rgba(6,7,9,0.55)', backdropFilter: 'blur(6px)', padding: '4px 9px', borderRadius: 3 }}>
                  {p.year} · {p.date}
                </div>
                {/* metric callout (neon) */}
                <div style={{ position: 'absolute', bottom: 14, left: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(0.7rem,1vw,0.85rem)', color: '#6ee7b7', fontWeight: 500, textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
                  {p.metric}
                </div>
              </a>
            );
          })}
        </div>

        {/* bottom info bar */}
        <div style={{ position: 'relative', zIndex: 120, padding: '0 clamp(20px,5vw,80px) clamp(28px,4vw,46px)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 22 }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#10b981' }}>({String(idx + 1).padStart(2, '0')}/{String(n).padStart(2, '0')})</span>
                <div style={{ display: 'flex', gap: 7 }}>
                  {cur.tags.map(t => (
                    <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#9aa3ad', border: '1px solid rgba(255,255,255,0.12)', padding: '3px 9px', borderRadius: 99 }}>{t}</span>
                  ))}
                </div>
              </div>
              {/* scramble title — re-scrambles on every active change */}
              <ScrambleText
                key={cur.title}
                text={cur.title.toUpperCase()}
                as="h3"
                style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.5rem,4vw,3.2rem)', color: '#f4f5f7', lineHeight: 1, letterSpacing: '-0.02em', margin: 0 }}
              />
            </div>

            {/* dots */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              {WORKS_DATA.map((_, i) => (
                <button key={i} onClick={() => jumpTo(i)} aria-label={`Project ${i+1}`} style={{ width: i === idx ? 26 : 8, height: 8, borderRadius: 99, border: 'none', background: i === idx ? '#10b981' : 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* persistent More Works link */}
      <a href="Works.html" className="more-works-link" style={{ position: 'absolute', top: 'calc(100vh - 84px)', right: 'clamp(20px,5vw,80px)', zIndex: 130, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#f4f5f7', display: 'none' }}>
        More Works ↗
      </a>
    </section>
  );
}

/* ── mobile fallback: bold edge-to-edge vertical stack ── */
function WorksStack() {
  return (
    <section id="works" style={{ background: '#060709', padding: '10px 0 50px' }}>
      {WORKS_DATA.map((p, i) => {
        const [ref, v] = useReveal(0.16);
        return (
          <a key={p.title} ref={ref} href={p.link} target="_blank" rel="noopener noreferrer"
            style={{ display: 'block', marginBottom: 52, opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(34px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1)' }}>
            {/* edge-to-edge image */}
            <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', marginBottom: 16 }}>
              <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,7,9,0.85), transparent 50%)' }} />
              <div style={{ position: 'absolute', top: 14, left: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#f4f5f7', background: 'rgba(6,7,9,0.55)', padding: '4px 9px', borderRadius: 3 }}>{p.year} · {p.date}</div>
              <div style={{ position: 'absolute', bottom: 16, left: 18, right: 18 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6ee7b7', marginBottom: 8 }}>{p.metric}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.6rem,7vw,2.4rem)', color: '#f4f5f7', lineHeight: 1, letterSpacing: '-0.02em', margin: 0 }}>{p.title}</h3>
              </div>
            </div>
            <div style={{ padding: '0 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.tags.map(t => <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#9aa3ad', border: '1px solid rgba(255,255,255,0.12)', padding: '3px 8px', borderRadius: 99 }}>{t}</span>)}
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#10b981' }}>({String(i + 1).padStart(2, '0')}) ↗</span>
            </div>
          </a>
        );
      })}
    </section>
  );
}

function StudioWorks() {
  const [mobile, setMobile] = useState(window.innerWidth < 860);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 860);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  return (
    <>
      {mobile ? <WorksStack /> : <WorksCarousel />}
      {/* all works link */}
      <div style={{ background: '#060709', borderTop: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(40px,6vw,70px) clamp(20px,5vw,80px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#5b636e', letterSpacing: '0.05em' }}>04 selected · view the full archive</span>
        <a href="Works.html" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(1.1rem,2vw,1.6rem)', color: '#f4f5f7', display: 'inline-flex', alignItems: 'center', gap: 12, transition: 'color 0.2s, gap 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#10b981'; e.currentTarget.style.gap = '20px'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#f4f5f7'; e.currentTarget.style.gap = '12px'; }}>
          All Works <span style={{ fontSize: '0.8em' }}>↗</span>
        </a>
      </div>
    </>
  );
}

Object.assign(window, { StudioWorks });
