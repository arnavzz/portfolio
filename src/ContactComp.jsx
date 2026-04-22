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

function ContactComp() {
  const [r0, s0] = useFadeUp(0);
  const [r1, s1] = useFadeUp(80);
  const [r2, s2] = useFadeUp(160);
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    const form = e.target;
    const data = new FormData(form);
    try {
      const res = await fetch('https://formspree.io/f/mzdykenz', {
        method: 'POST', body: data, headers: { 'Accept': 'application/json' }
      });
      if (res.ok) { setSent(true); form.reset(); }
      else { setError('Something went wrong. Please email directly.'); }
    } catch {
      setError('Network error. Please email me directly.');
    }
    setSending(false);
  };

  const contactLinks = [
    {
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
      label: 'Email', value: 'arnav.worko@gmail.com', href: 'mailto:arnav.worko@gmail.com',
    },
    {
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
      label: 'LinkedIn', value: 'linkedin.com/in/arnavkhamparia/', href: 'https://linkedin.com/in/arnavkhamparia/',
    },
    {
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
      label: 'GitHub', value: 'github.com/arnavzz', href: 'https://github.com/arnavzz',
    },
  ];

  const inputStyle = { width: '100%', padding: '11px 14px', background: 'rgba(30,41,59,0.8)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#f1f5f9', fontSize: 14, fontFamily: 'Inter, sans-serif', outline: 'none', transition: 'border-color 0.2s' };

  return (
    <section id="contact" style={{ padding: '100px 0', background: '#0a0f1e', position: 'relative', overflow: 'hidden' }}>
      {/* Aurora bg */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>
        <h2 ref={r0} style={{ textAlign: 'center', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: 700, color: '#f1f5f9', marginBottom: 16, ...s0 }}>
          Get In Touch
        </h2>

        {/* Availability badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 99, padding: '7px 18px', fontSize: 13, color: '#10b981', fontFamily: 'JetBrains Mono, monospace' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'inline-block', animation: 'pulse-dot 2s infinite' }} />
            Open to opportunities · Responds within 24 hours
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.3fr)', gap: 60, alignItems: 'flex-start' }} className="contact-grid">
          {/* Left */}
          <div ref={r1} style={s1}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 12 }}>Let's Work Together</h3>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.75, marginBottom: 36 }}>
              Looking to build an AI system, need ML consultation, or just want to talk about what's possible? I'm always interested in ambitious projects at the intersection of AI and product.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 36 }}>
              {contactLinks.map(link => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
                    {link.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#f1f5f9', lineHeight: 1 }}>{link.label}</div>
                    <div style={{ fontSize: 12.5, color: '#475569', marginTop: 3 }}>{link.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <a href="assets/documents/Arnav_khamparia_cv.pdf" download style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#10b981', color: '#fff', padding: '11px 22px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, fontFamily: 'Inter, sans-serif', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 0 20px rgba(16,185,129,0.25)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 32px rgba(16,185,129,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(16,185,129,0.25)'; }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download Resume
            </a>
          </div>

          {/* Form */}
          <div ref={r2} style={{ ...s2, background: 'rgba(17,24,39,0.8)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '32px 28px', backdropFilter: 'blur(8px)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" style={{ margin: '0 auto', display: 'block' }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>Message Sent!</div>
                <div style={{ fontSize: 13.5, color: '#64748b' }}>I'll get back to you within 24 hours.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[['name', 'text', 'Name', 'Your name'], ['email', 'email', 'Email', 'your@email.com']].map(([id, type, label, ph]) => (
                  <div key={id}>
                    <label htmlFor={id} style={{ display: 'block', fontSize: 12.5, color: '#64748b', marginBottom: 6, fontWeight: 500 }}>{label}</label>
                    <input type={type} id={id} name={id} required placeholder={ph} style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(16,185,129,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" style={{ display: 'block', fontSize: 12.5, color: '#64748b', marginBottom: 6, fontWeight: 500 }}>Message</label>
                  <textarea id="message" name="message" required rows={5} placeholder="What are you working on?" style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(16,185,129,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                </div>
                {error && <div style={{ fontSize: 12.5, color: '#f87171' }}>{error}</div>}
                <button type="submit" disabled={sending} style={{ background: sending ? '#1e293b' : '#10b981', color: '#fff', border: 'none', padding: '13px', borderRadius: 8, fontSize: 14.5, fontWeight: 600, cursor: sending ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', transition: 'transform 0.2s, background 0.2s' }}>
                  {sending ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ContactComp });
