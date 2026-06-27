const { useRef, useState, useEffect } = React;

/* ════════════════════════════════════════════
   MISSION + VISION  —  light acts
   ════════════════════════════════════════════ */
function MissionVision() {
  const [r1, v1] = useReveal(0.3);
  const [r2, v2] = useReveal(0.3);

  const line = (txt, show, i) => (
    <span style={{ display: 'block', overflow: 'hidden' }}>
      <span style={{ display: 'block', transform: show ? 'translateY(0)' : 'translateY(102%)', transition: `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s` }}>{txt}</span>
    </span>
  );

  return (
    <section id="mission" data-light style={{ background: '#eceef0', color: '#0a0c10', position: 'relative' }}>
      {/* MISSION */}
      <div ref={r1} style={{ minHeight: '88vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(60px,12vh,140px) clamp(20px,8vw,140px)', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 'clamp(28px,4vw,48px)' }}>
          <NeuralMark size={26} color="#0a0c10" />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.2em', color: '#5b636e', textTransform: 'uppercase' }}>Mission / 01</span>
        </div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,5.5vw,4.2rem)', lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0, maxWidth: 1100 }}>
          {line('Ship AI that survives', v1, 0)}
          {line('contact with the real world.', v1, 1)}
        </h2>
        <p style={{ marginTop: 'clamp(24px,3vw,36px)', maxWidth: 560, fontSize: 'clamp(0.95rem,1.4vw,1.1rem)', color: '#5b636e', lineHeight: 1.7 }}>
          Most models look good in a notebook. The hard part is the messy edge: latency, escalation, failure modes, the moment a real borrower says something unexpected. That's the work I care about.
        </p>
      </div>

      {/* divider */}
      <div style={{ height: 1, background: 'rgba(10,12,16,0.1)', margin: '0 clamp(20px,8vw,140px)' }} />

      {/* VISION */}
      <div ref={r2} style={{ minHeight: '88vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(60px,12vh,140px) clamp(20px,8vw,140px)', position: 'relative' }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(3rem,11vw,9rem)', color: 'transparent', WebkitTextStroke: '1.4px rgba(10,12,16,0.25)', lineHeight: 0.9, letterSpacing: '-0.03em', marginBottom: 'clamp(24px,4vw,48px)', transform: v2 ? 'translateX(0)' : 'translateX(-30px)', opacity: v2 ? 1 : 0, transition: 'all 1s cubic-bezier(0.16,1,0.3,1)' }}>
          VISION
        </div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem,5.5vw,4.2rem)', lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0, maxWidth: 1100, textAlign: 'right', marginLeft: 'auto' }}>
          {line('Build AI that reduces friction,', v2, 0)}
          {line('creates clarity, and earns trust.', v2, 1)}
        </h2>
        <p style={{ marginTop: 'clamp(24px,3vw,36px)', maxWidth: 560, marginLeft: 'auto', fontSize: 'clamp(0.95rem,1.4vw,1.1rem)', color: '#5b636e', lineHeight: 1.7, textAlign: 'right' }}>
          From medical image segmentation to autonomous collections, the throughline is the same: AI should make hard things calmer, faster, and more human, not more opaque.
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   PROCESS  —  numbered, dark blueprint
   ════════════════════════════════════════════ */
function ProcessStep({ num, title, en, body, tags, isLast }) {
  const [ref, v] = useReveal(0.25);
  return (
    <div ref={ref} style={{ minHeight: '78vh', display: 'flex', alignItems: 'center', position: 'relative', padding: 'clamp(40px,6vw,72px) clamp(20px,5vw,80px)' }}>
      {/* node dot on the rail */}
      <div style={{ position: 'absolute', left: 'clamp(28px,4.4vw,68px)', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 2 }}>
        <div style={{ width: 13, height: 13, borderRadius: '50%', background: v ? '#10b981' : '#0d1117', border: `2px solid ${v ? '#10b981' : '#2d3748'}`, boxShadow: v ? '0 0 18px rgba(16,185,129,0.6)' : 'none', transition: 'all 0.5s ease' }} />
      </div>

      {/* big stroked number */}
      <div style={{ position: 'absolute', top: 'clamp(24px,4vw,48px)', right: 'clamp(20px,5vw,80px)', fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(3rem,9vw,8rem)', color: 'transparent', WebkitTextStroke: '1.2px rgba(255,255,255,0.1)', lineHeight: 1, opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)' }}>
        {num}
      </div>

      <div style={{ maxWidth: 720, marginLeft: 'clamp(34px,4vw,70px)', opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(28px)', transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1)' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: '#10b981', letterSpacing: '0.18em', marginBottom: 18, textTransform: 'uppercase' }}>{en}</div>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.7rem,4vw,3.2rem)', color: '#f4f5f7', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 20 }}>{title}</h3>
        <p style={{ fontSize: 'clamp(0.95rem,1.4vw,1.1rem)', color: '#9aa3ad', lineHeight: 1.75, marginBottom: 24, maxWidth: 560 }}>{body}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {tags.map(t => (
            <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#9aa3ad', border: '1px solid rgba(255,255,255,0.12)', padding: '4px 10px', borderRadius: 99 }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudioProcess() {
  const secRef = useRef(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const fn = () => {
      const el = secRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: from when section top hits 50% vh, to when bottom hits 50% vh
      const start = rect.top - vh * 0.5;
      const span = rect.height;
      const p = Math.min(Math.max(-start / span, 0), 1);
      setFill(p);
    };
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const steps = [
    { num: '01', en: 'Frame', title: 'Find the real problem', body: 'Before any model, I map where AI actually reduces friction: the borrower who needs a callback, the scan a radiologist can\'t miss. The problem statement is the most important artifact.', tags: ['Product thinking', 'Discovery', 'Prompt design'] },
    { num: '02', en: 'Build', title: 'Engineer for production', body: 'LLM pipelines, RAG, LangGraph agents, voice on Gemini Live API. I build for latency, escalation, and failure, not just the happy path. Python, REST, and the right model for the job.', tags: ['LLMs', 'RAG', 'LangGraph', 'Python'] },
    { num: '03', en: 'Close the loop', title: 'Make it self-improving', body: 'Outputs become structured insights, insights become feedback, feedback retrains behavior. Disposition analysis that improves the agent with zero human in the loop.', tags: ['Eval', 'Feedback loops', 'Observability'] },
    { num: '04', en: 'Ship & own', title: 'Own the outcome', body: 'I own end-to-end decisions on how the AI behaves, escalates, and learns across the whole pipeline, then measure the result in numbers that matter to the business.', tags: ['Deployment', 'Ownership', 'Impact'] },
  ];
  return (
    <section id="process" ref={secRef} style={{ background: '#060709', position: 'relative' }}>
      {/* connector rail */}
      <div className="process-rail" style={{ position: 'absolute', left: 'clamp(28px,4.4vw,68px)', top: 0, bottom: 0, width: 2, transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.08)', zIndex: 1 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: `${fill * 100}%`, background: 'linear-gradient(to bottom, #10b981, #6ee7b7)', boxShadow: '0 0 12px rgba(16,185,129,0.5)', transition: 'height 0.1s linear' }} />
      </div>
      {steps.map((s, i) => <ProcessStep key={s.num} {...s} isLast={i === steps.length - 1} />)}
    </section>
  );
}

/* ════════════════════════════════════════════
   CURRENTLY  —  voice-agent beat (kept waveform)
   ════════════════════════════════════════════ */
function VoiceWaveform({ active }) {
  const heights = [4,8,14,20,28,24,17,10,6,12,22,30,26,18,10,5,9,17,27,23,14,7,4,11,19,26,21,13,6,10];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 56 }}>
      {heights.map((h, i) => (
        <div key={i} style={{ width: 4, borderRadius: 2, background: `rgba(16,185,129,${0.4 + (h / 30) * 0.5})`, height: `${h}px`, transformOrigin: 'center', animation: active ? `studio-wave ${0.6 + (i % 7) * 0.08}s ease-in-out infinite alternate` : 'none', animationDelay: `${i * 0.035}s` }} />
      ))}
    </div>
  );
}

function PillarCard({ num, title, body, delay, v }) {
  return (
    <div style={{ textAlign: 'left', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 10, padding: 'clamp(22px,2.5vw,30px)', background: 'rgba(255,255,255,0.012)', opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(24px)', transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#10b981' }}>{num}</span>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(1.1rem,1.7vw,1.4rem)', color: '#f4f5f7', letterSpacing: '-0.01em', margin: 0 }}>{title}</h3>
      </div>
      <p style={{ fontSize: 'clamp(0.85rem,1.15vw,0.95rem)', color: '#9aa3ad', lineHeight: 1.7, margin: 0 }}>{body}</p>
    </div>
  );
}

function StudioCurrently() {
  const [ref, v] = useReveal(0.25);
  return (
    <section style={{ background: '#060709', borderTop: '1px solid rgba(255,255,255,0.07)', padding: 'clamp(60px,12vh,140px) clamp(20px,5vw,80px)' }}>
      <div ref={ref} style={{ maxWidth: 1080, margin: '0 auto' }}>
        {/* header — centered */}
        <div style={{ textAlign: 'center', opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(30px)', transition: 'all 1s cubic-bezier(0.16,1,0.3,1)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: '#10b981', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 30 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', animation: 'studio-pulse 2s infinite' }} />
            Currently building
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.7rem,4.5vw,3.4rem)', color: '#f4f5f7', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 26 }}>
            An autonomous AI collections suite.<br/>I own the intelligence layer that makes it work.
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 26 }}>
            <VoiceWaveform active={v} />
          </div>
          <p style={{ maxWidth: 640, margin: '0 auto', fontSize: 'clamp(0.95rem,1.4vw,1.1rem)', color: '#9aa3ad', lineHeight: 1.75 }}>
            Most collection systems treat borrowers as segments and never learn from outcomes. Every call ends and nothing feeds back. I designed this suite to fix that from the ground up.
          </p>
        </div>

        {/* three pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(14px,1.6vw,20px)', marginTop: 'clamp(40px,5vw,60px)' }}>
          <PillarCard v={v} delay={150} num="01" title="Orchestration Engine"
            body="Decides per borrower, per moment, which channel to engage (AI Call, WhatsApp, SMS), what strategy to use, and when to escalate to a human. Not rule-based: ML scoring on behavioral signals that re-evaluates after every touchpoint." />
          <PillarCard v={v} delay={250} num="02" title="Voice Agent"
            body="Prompt architecture on Google Gemini Live API for real-time, ultra-low-latency conversations. Detects language from the first response, switches mid-call without re-prompting, and adapts strategy from the borrower's live history. No new prompts per call: it reasons in real time." />
          <PillarCard v={v} delay={350} num="03" title="Disposition Loop"
            body="Call recordings in, structured behavioral insights out, fed straight back into the engine. The learning loop is fully closed. Zero human intervention: the system self-corrects. That's what separates it from a sophisticated dialer." />
        </div>

        {/* ownership line */}
        <p style={{ maxWidth: 760, margin: 'clamp(36px,4vw,52px) auto 0', textAlign: 'center', fontSize: 'clamp(0.95rem,1.35vw,1.08rem)', color: '#c3cbd4', lineHeight: 1.75, opacity: v ? 1 : 0, transition: 'opacity 0.9s ease 0.5s' }}>
          I own end-to-end decisions on AI behavior, escalation logic, and channel strategy. I know where it performs, where it breaks, and exactly what it needs to scale.
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════
   WORKED WITH / PUBLISHED IN  —  light
   ════════════════════════════════════════════ */
function StudioMarks() {
  const [ref, v] = useReveal(0.25);
  const marks = [
    { name: 'OTO Capital', meta: 'AI Product Engineer · 2025 onward', kind: 'Building' },
    { name: 'Vivada Tech', meta: 'ML Intern · 2024', kind: 'Built' },
    { name: 'Springer', meta: 'Book Chapter · 2024', kind: 'Published' },
  ];
  return (
    <section style={{ background: '#eceef0', color: '#0a0c10', padding: 'clamp(60px,11vh,130px) clamp(20px,5vw,80px)' }} data-light>
      <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.2em', color: '#5b636e', textTransform: 'uppercase', marginBottom: 'clamp(36px,5vw,60px)' }}>
          Worked with · Published in
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 0, borderTop: '1px solid rgba(10,12,16,0.12)' }}>
          {marks.map((m, i) => (
            <div key={m.name} style={{ padding: 'clamp(28px,3.5vw,44px) 0', borderBottom: '1px solid rgba(10,12,16,0.12)', borderRight: '1px solid rgba(10,12,16,0.12)', paddingLeft: 24, paddingRight: 24, opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(24px)', transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s` }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#10b981', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>{m.kind}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 'clamp(1.3rem,2.4vw,1.9rem)', letterSpacing: '-0.01em', marginBottom: 8 }}>{m.name}</div>
              <div style={{ fontSize: 12.5, color: '#5b636e' }}>{m.meta}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { MissionVision, StudioProcess, StudioCurrently, StudioMarks });
