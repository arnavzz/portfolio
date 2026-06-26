const { useState, useEffect, useRef } = React;

function useIsMobile() {
  const [m, setM] = useState(window.innerWidth < 900);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 900);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

function useLiveClock() {
  const [time, setTime]   = useState('');
  const [avail, setAvail] = useState(true);
  useEffect(() => {
    const tick = () => {
      const now   = new Date();
      const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
      const ist   = new Date(utcMs + 5.5 * 3600000);
      const h = ist.getHours(), m = ist.getMinutes().toString().padStart(2,'0');
      setTime(`${(h%12)||12}:${m} ${h>=12?'PM':'AM'} IST`);
      const d = ist.getDay();
      setAvail(d>=1 && d<=5 && h>=9 && h<20);
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);
  return { time, avail };
}

function HeroComp() {
  const canvasRef = useRef(null);
  const [displayed, setDisplayed] = useState('');
  const [roleIdx, setRoleIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);
  const { time, avail }           = useLiveClock();
  const isMobile                  = useIsMobile();

  const roles = ['LLM Architect','AI Systems Builder','Published Researcher','AI Product Engineer'];

  /* ── Three.js neural network ── */
  useEffect(() => {
    const THREE = window.THREE;
    if (!THREE) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const getSize = () => ({ w: canvas.offsetWidth, h: canvas.offsetHeight });
    let { w, h } = getSize();

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(55, w/h, 1, 2000);
    camera.position.z = 390;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const group = new THREE.Group();
    scene.add(group);

    const nodeCount = 85, radius = 145;
    const nodePts = [];
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(1 - 2*(i+0.5)/nodeCount);
      const theta = Math.PI*(1+Math.sqrt(5))*i;
      nodePts.push(new THREE.Vector3(
        radius*Math.sin(phi)*Math.cos(theta),
        radius*Math.sin(phi)*Math.sin(theta),
        radius*Math.cos(phi)
      ));
    }
    for (let i = 0; i < 22; i++) {
      const r = radius*(0.25+Math.random()*0.55);
      nodePts.push(new THREE.Vector3((Math.random()-.5)*r*2,(Math.random()-.5)*r*2,(Math.random()-.5)*r*2));
    }

    const pGeo = new THREE.BufferGeometry();
    const pArr = new Float32Array(nodePts.length*3);
    nodePts.forEach((p,i)=>{pArr[i*3]=p.x;pArr[i*3+1]=p.y;pArr[i*3+2]=p.z;});
    pGeo.setAttribute('position', new THREE.BufferAttribute(pArr,3));
    group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({color:0x10b981,size:3.2,sizeAttenuation:true,transparent:true,opacity:0.9})));

    const bArr = new Float32Array(18*3);
    for(let i=0;i<18;i++){const s=nodePts[i*4%nodePts.length];bArr[i*3]=s.x;bArr[i*3+1]=s.y;bArr[i*3+2]=s.z;}
    const bGeo = new THREE.BufferGeometry();
    bGeo.setAttribute('position', new THREE.BufferAttribute(bArr,3));
    group.add(new THREE.Points(bGeo, new THREE.PointsMaterial({color:0x34d399,size:5.5,sizeAttenuation:true,transparent:true,opacity:0.6})));

    const lArr=[];
    for(let i=0;i<nodePts.length;i++)
      for(let j=i+1;j<nodePts.length;j++)
        if(nodePts[i].distanceTo(nodePts[j])<88)
          lArr.push(nodePts[i].x,nodePts[i].y,nodePts[i].z,nodePts[j].x,nodePts[j].y,nodePts[j].z);
    const lGeo=new THREE.BufferGeometry();
    lGeo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(lArr),3));
    group.add(new THREE.LineSegments(lGeo,new THREE.LineBasicMaterial({color:0x10b981,transparent:true,opacity:0.16})));

    let tX=0,tY=0,cX=0,cY=0,autoY=0,animId;
    const onMove=(e)=>{tX=(e.clientX-window.innerWidth/2)*0.0009;tY=(e.clientY-window.innerHeight/2)*0.00045;};
    window.addEventListener('mousemove',onMove);
    const animate=()=>{
      animId=requestAnimationFrame(animate);
      autoY+=0.0022; cX+=(tX-cX)*0.045; cY+=(tY-cY)*0.045;
      group.rotation.y=autoY+cX; group.rotation.x=cY;
      renderer.render(scene,camera);
    };
    animate();
    const onResize=()=>{const{w,h}=getSize();camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);};
    window.addEventListener('resize',onResize);
    return ()=>{cancelAnimationFrame(animId);window.removeEventListener('mousemove',onMove);window.removeEventListener('resize',onResize);renderer.dispose();};
  }, []);

  /* ── Typewriter ── */
  useEffect(() => {
    const t = roles[roleIdx];
    let timer;
    if (!deleting && displayed.length < t.length)        timer = setTimeout(()=>setDisplayed(t.slice(0,displayed.length+1)),80);
    else if (!deleting && displayed.length===t.length)   timer = setTimeout(()=>setDeleting(true),2300);
    else if (deleting && displayed.length>0)             timer = setTimeout(()=>setDisplayed(displayed.slice(0,-1)),44);
    else { setDeleting(false); setRoleIdx((roleIdx+1)%roles.length); }
    return ()=>clearTimeout(timer);
  },[displayed,deleting,roleIdx]);

  const go = (id) => { const el=document.getElementById(id); if(el) window.scrollTo({top:el.offsetTop-72,behavior:'smooth'}); };

  const stats = [{v:'2+',l:'Years in AI'},{v:'4',l:'Projects'},{v:'1',l:'Publication'},{v:'2',l:'Internships'}];

  const floatingBadges = [
    {label:'LangGraph',     top:'22%', right:'18%', delay:'0s',   dur:'4.2s'},
    {label:'Gemini API',    top:'38%', right:'6%',  delay:'0.7s', dur:'3.8s'},
    {label:'RAG',           top:'55%', right:'20%', delay:'1.1s', dur:'4.6s'},
    {label:'PyTorch',       top:'68%', right:'8%',  delay:'0.4s', dur:'5.0s'},
    {label:'Transformers',  top:'78%', right:'22%', delay:'1.4s', dur:'3.5s'},
  ];

  /* Gradient: on desktop covers left so text is readable, clears on right to show 3D */
  const overlayStyle = isMobile
    ? { position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 50%, rgba(10,15,30,0.1) 0%, rgba(10,15,30,0.78) 70%)' }
    : { position:'absolute', inset:0, background:'linear-gradient(to right, rgba(10,15,30,0.97) 0%, rgba(10,15,30,0.82) 35%, rgba(10,15,30,0.35) 65%, rgba(10,15,30,0.05) 100%)' };

  const contentStyle = isMobile
    ? { position:'relative', zIndex:2, textAlign:'center', padding:'80px 24px 40px', width:'100%' }
    : { position:'relative', zIndex:2, textAlign:'left', padding:'0 0 0 10%', maxWidth:'54%', width:'100%' };

  return (
    <section id="hero" style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', background:'#0a0f1e' }}>
      {/* Full-bleed Three.js canvas */}
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} />
      <div style={overlayStyle} />

      {/* Floating badges — right side only, desktop */}
      {!isMobile && floatingBadges.map(b=>(
        <div key={b.label} className="floating-badge" style={{
          position:'absolute', top:b.top, right:b.right, zIndex:1,
          fontFamily:'JetBrains Mono, monospace', fontSize:10.5,
          color:'rgba(16,185,129,0.5)', background:'rgba(16,185,129,0.05)',
          border:'1px solid rgba(16,185,129,0.16)', borderRadius:5,
          padding:'4px 9px', pointerEvents:'none',
          animation:`float-badge ${b.dur} ease-in-out infinite`,
          animationDelay:b.delay,
        }}>{b.label}</div>
      ))}

      {/* LEFT content column */}
      <div style={contentStyle}>
        {/* Clock pill */}
        <div style={{ display:'inline-flex', alignItems:'center', gap:10, background:'rgba(16,185,129,0.07)', border:'1px solid rgba(16,185,129,0.25)', borderRadius:99, padding:'7px 18px', marginBottom:36, fontSize:12, fontFamily:'JetBrains Mono, monospace', flexWrap:'wrap' }}>
          <span style={{ display:'flex', alignItems:'center', gap:6, color: avail ? '#10b981' : '#f59e0b' }}>
            <span style={{ width:7, height:7, borderRadius:'50%', background: avail ? '#10b981' : '#f59e0b', display:'inline-block', animation:'pulse-dot 2s infinite' }} />
            {avail ? 'Open to full-time roles' : 'Currently building'}
          </span>
          {time && <><span style={{color:'#2d3748'}}>·</span><span style={{color:'#475569',fontSize:11}}>{time}</span></>}
        </div>

        {/* Name */}
        <h1 style={{ fontSize:'clamp(2.6rem,6vw,5rem)', fontWeight:800, lineHeight:1.05, background:'linear-gradient(130deg,#f1f5f9 35%,#10b981 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', marginBottom:20 }}>
          Arnav<br/>Khamparia
        </h1>

        {/* Typewriter */}
        <div style={{ fontSize:'clamp(1rem,2.2vw,1.35rem)', marginBottom:20, height:40, display:'flex', alignItems:'center', gap:4, justifyContent: isMobile ? 'center' : 'flex-start' }}>
          <span style={{ color:'#10b981', fontFamily:'JetBrains Mono, monospace', opacity:0.7 }}>&#x3e; </span>
          <span style={{ color:'#e2e8f0', fontFamily:'JetBrains Mono, monospace' }}>{displayed}</span>
          <span style={{ display:'inline-block', width:2, height:'1.1em', background:'#10b981', animation:'blink 1s step-end infinite', marginLeft:1 }} />
        </div>

        {/* Tagline */}
        <p style={{ fontSize:'clamp(0.9rem,1.5vw,1.05rem)', color:'#64748b', maxWidth:460, marginBottom:40, lineHeight:1.8 }}>
          Building AI systems that work in production. From LLM pipelines and RAG architectures to real-time voice agents at scale.
        </p>

        {/* CTAs — magnetic */}
        <div style={{ display:'flex', gap:14, flexWrap:'wrap', marginBottom:56, justifyContent: isMobile ? 'center' : 'flex-start' }}>
          <button className="magnetic-btn" onClick={()=>go('projects')} style={{ background:'#10b981', color:'#fff', border:'none', padding:'13px 30px', borderRadius:8, fontSize:14.5, fontWeight:600, fontFamily:'Inter, sans-serif', boxShadow:'0 0 28px rgba(16,185,129,0.28)', transition:'transform 0.15s ease, box-shadow 0.2s' }}>
            View My Work
          </button>
          <a className="magnetic-btn" href="assets/documents/Arnav_khamparia_cv.pdf" download style={{ background:'transparent', color:'#cbd5e1', border:'1px solid rgba(203,213,225,0.18)', padding:'13px 30px', borderRadius:8, fontSize:14.5, fontWeight:600, fontFamily:'Inter, sans-serif', display:'inline-flex', alignItems:'center', gap:8, transition:'border-color 0.2s, color 0.2s, transform 0.15s ease' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Resume
          </a>
        </div>

        {/* Stats */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:0, justifyContent: isMobile ? 'center' : 'flex-start', borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:28 }}>
          {stats.map((s,i)=>(
            <div key={s.l} style={{ padding:'0 24px', borderRight: i<stats.length-1 ? '1px solid rgba(255,255,255,0.07)' : 'none', textAlign:'center', minWidth:80 }}>
              <div style={{ fontSize:24, fontWeight:700, color:'#10b981', fontFamily:'JetBrains Mono, monospace', lineHeight:1 }}>{s.v}</div>
              <div style={{ fontSize:10, color:'#475569', marginTop:5, textTransform:'uppercase', letterSpacing:'0.1em' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll chevron */}
      <div onClick={()=>go('about')} style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', cursor:'pointer', color:'#334155', animation:'bounce 2s ease-in-out infinite', zIndex:2 }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </section>
  );
}

Object.assign(window, { HeroComp });
