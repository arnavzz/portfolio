const { useRef, useState, useEffect } = React;

function useFadeUp() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

const borderColors = ['#10b981','#6366f1','#6366f1','#f59e0b'];
const projectMetrics = [
  '50% scan time reduction · LLM-orchestrated',
  'SOTA sharpness · Enhanced GAN discriminator',
  'Dice 0.93  ·  Published Springer 2024',
  'SERP gap analysis  ·  Schema markup generation',
];

function ProjectCard({ title, description, image, tech, link, githubLink, featured, accentColor, metric }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(17,24,39,0.9)', borderRadius: 14, overflow: 'hidden',
        border: `1px solid ${hovered ? accentColor+'55' : 'rgba(255,255,255,0.07)'}`,
        borderTop: `3px solid ${accentColor}`,
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 48px rgba(0,0,0,0.45), 0 0 28px ${accentColor}18` : '0 4px 16px rgba(0,0,0,0.2)',
        transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
        height: '100%', display: 'flex', flexDirection: 'column',
      }}>

      {/* Image */}
      <div style={{ position:'relative', overflow:'hidden', height:200, flexShrink:0 }}>
        <img src={image} alt={title} style={{
          width:'100%', height:'100%', objectFit:'cover',
          transition:'transform 0.5s ease, filter 0.4s ease',
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
          filter: hovered ? 'none' : 'grayscale(60%) brightness(0.75)',
        }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 40%,rgba(17,24,39,0.92) 100%)' }} />

        {/* Metrics panel */}
        <div style={{
          position:'absolute', bottom:0, left:0, right:0,
          background:`linear-gradient(to top, ${accentColor}e0, ${accentColor}88 60%, transparent)`,
          padding:'28px 16px 12px',
          transform: hovered ? 'translateY(0)' : 'translateY(108%)',
          transition:'transform 0.38s cubic-bezier(0.22,1,0.36,1)',
          fontSize:11.5, color:'#fff', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.03em',
        }}>{metric}</div>

        {featured && (
          <div style={{ position:'absolute', top:12, left:12, background:'#6366f1', color:'#fff', fontSize:10, fontWeight:700, padding:'4px 10px', borderRadius:4, letterSpacing:'0.06em', fontFamily:'JetBrains Mono, monospace' }}>
            PUBLISHED · SPRINGER
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding:'20px 22px', display:'flex', flexDirection:'column', flex:1 }}>
        <h3 style={{ fontSize:15.5, fontWeight:700, color:'#f1f5f9', marginBottom:10, lineHeight:1.35 }}>{title}</h3>
        <p style={{ fontSize:13, color:'#64748b', lineHeight:1.7, flex:1, marginBottom:16 }}>{description}</p>

        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:18 }}>
          {tech.map(t => (
            <span key={t} style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10.5, background:'rgba(30,41,59,0.9)', border:'1px solid rgba(255,255,255,0.08)', color:'#94a3b8', padding:'3px 8px', borderRadius:4 }}>{t}</span>
          ))}
        </div>

        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
          {link && link !== '#' && (
            <a href={link} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12.5, fontWeight:600, color:accentColor, background:`${accentColor}14`, border:`1px solid ${accentColor}33`, padding:'6px 14px', borderRadius:6 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </a>
          )}
          {githubLink && (
            <a href={githubLink} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12.5, fontWeight:600, color:'#94a3b8', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.08)', padding:'6px 14px', borderRadius:6 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              GitHub
            </a>
          )}
          {(!link || link==='#') && !githubLink && (
            <span style={{ fontSize:11.5, color:'#334155', fontFamily:'JetBrains Mono, monospace' }}>Research Project</span>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectsComp() {
  const [r0, v0]        = useFadeUp();
  const trackRef        = useRef(null);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag            = useRef({ x: 0, scroll: 0 });

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const onDown = (e) => {
    setDragging(true);
    drag.current = { x: e.pageX, scroll: trackRef.current.scrollLeft };
  };
  const onUp = () => setDragging(false);
  const onMove = (e) => {
    if (!dragging) return;
    e.preventDefault();
    const dx = (e.pageX - drag.current.x) * 1.6;
    trackRef.current.scrollLeft = drag.current.scroll - dx;
  };

  const projects = [
    { title:'LangGraph Agentic Workflow', description:'Built an agentic cybersecurity workflow using LangGraph, orchestrating LLM-driven tasks for Nmap, Gobuster, FFUF, and SQLmap with concurrent processing — reducing scan time by 50%, with a Streamlit dashboard for real-time vulnerability tracking.', image:'assets/images/project1.jpg', tech:['Python','LangGraph','LLM','Streamlit','Regex'], link:'https://arnavzz-langgraph-agentic-workflow-app-nqwjzw.streamlit.app/', githubLink:'https://github.com/arnavzz', accentColor:borderColors[0], featured:false, metric:projectMetrics[0] },
    { title:'Super Resolution (ESRGAN)', description:'Developed an Enhanced Super-Resolution GAN (ESRGAN) using PyTorch and TensorFlow, outperforming state-of-the-art methods in sharpness and detail recovery. Enhanced the GAN discriminator for improved visual quality with optimized concurrent training.', image:'assets/images/project2.png', tech:['PyTorch','TensorFlow','GAN','RRDB'], link:null, githubLink:'https://github.com/arnavzz', accentColor:borderColors[1], featured:false, metric:projectMetrics[1] },
    { title:'Liver Tumor Segmentation', description:'Comparative study of U-Net, V-Net and AH-Net for liver CT scan segmentation using the MONAI framework. V-Net achieved the highest Dice score of 0.93. Published as a book chapter in Springer (2024).', image:'assets/images/project3.jpg', tech:['MONAI','U-Net','V-Net','Medical AI'], link:'https://link.springer.com/chapter/10.1007/978-981-96-3333-3_6', githubLink:null, accentColor:borderColors[2], featured:true, metric:projectMetrics[2] },
    { title:'Generative AI SEO Augmenter', description:'A Generative AI tool that analyzes top-ranking SERP results and augments existing content by identifying competitive gaps, generating FAQs, Myth vs. Fact tables, and SEO-optimized Schema markup to improve engagement and search performance.', image:'assets/images/project4.png', tech:['RAG','LLM','SEO','React','Tailwind'], link:'https://augai.netlify.app/', githubLink:null, accentColor:borderColors[3], featured:false, metric:projectMetrics[3] },
  ];

  return (
    <section id="projects" style={{ padding:'100px 0', background:'#0d1424', overflow:'hidden' }}>
      {/* Header */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 28px', marginBottom:20 }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <h2 ref={r0} style={{ fontSize:'clamp(1.8rem,4vw,2.4rem)', fontWeight:700, color:'#f1f5f9', opacity: v0?1:0, transition:'opacity 0.6s ease' }}>
            Featured Projects
          </h2>
          <span style={{ fontSize:11, fontFamily:'JetBrains Mono, monospace', color:'#2d3748', letterSpacing:'0.1em', paddingBottom:6 }}>
            ← drag to explore →
          </span>
        </div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onMouseLeave={onUp}
        onScroll={onScroll}
        style={{
          display:'flex', overflowX:'auto', gap:20,
          paddingLeft:'max(28px, calc((100vw - 1100px) / 2 + 28px))',
          paddingBottom:8, paddingTop:8,
          cursor: dragging ? 'grabbing' : 'grab',
          scrollSnapType:'x mandatory',
          scrollbarWidth:'none', WebkitOverflowScrolling:'touch',
          userSelect:'none',
        }}>
        {projects.map(p => (
          <div key={p.title} style={{ minWidth:380, maxWidth:380, scrollSnapAlign:'start', flexShrink:0 }}>
            <ProjectCard {...p} />
          </div>
        ))}
        {/* Trailing spacer */}
        <div style={{ minWidth:'max(28px, calc((100vw - 1100px) / 2 + 28px))', flexShrink:0 }} />
      </div>

      {/* Progress bar + CTA */}
      <div style={{ maxWidth:1100, margin:'28px auto 0', padding:'0 28px', display:'flex', alignItems:'center', gap:24 }}>
        <div style={{ flex:1, height:2, background:'rgba(255,255,255,0.06)', borderRadius:1, position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', left:0, top:0, height:'100%', width:`${progress*100}%`, background:'#10b981', borderRadius:1, transition:'width 0.1s linear' }} />
        </div>
        <a href="https://github.com/arnavzz" target="_blank" rel="noopener noreferrer"
          style={{ display:'inline-flex', alignItems:'center', gap:8, color:'#475569', fontSize:13, fontWeight:500, transition:'color 0.2s', whiteSpace:'nowrap' }}
          onMouseEnter={e=>e.currentTarget.style.color='#10b981'}
          onMouseLeave={e=>e.currentTarget.style.color='#475569'}>
          All projects on GitHub →
        </a>
      </div>
    </section>
  );
}

Object.assign(window, { ProjectsComp });
