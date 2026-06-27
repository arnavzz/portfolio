const { useRef, useState, useEffect } = React;

/* ════════════════════════════════════════════
   CONTACT  +  GIANT WORDMARK FOOTER  (dark)
   ════════════════════════════════════════════ */
function StudioContact() {
  const [ref, v] = useReveal(0.25);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setSending(true); setError('');
    try {
      const res = await fetch('https://formspree.io/f/mzdykenz', { method: 'POST', body: new FormData(e.target), headers: { Accept: 'application/json' } });
      if (res.ok) { setSent(true); e.target.reset(); }
      else setError('Something went wrong. Email me directly.');
    } catch { setError('Network error. Email me directly.'); }
    setSending(false);
  };

  const field = { width: '100%', padding: '13px 0', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.14)', color: '#f4f5f7', fontSize: 15, fontFamily: "'Inter', sans-serif", outline: 'none', transition: 'border-color 0.3s' };
  const onF = e => e.target.style.borderBottomColor = '#10b981';
  const onB = e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.14)';

  const socials = [
    { label: 'GitHub', href: 'https://github.com/arnavzz' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/arnavkhamparia/' },
    { label: 'Email', href: 'mailto:arnav.worko@gmail.com' },
    { label: 'Résumé ↗', href: 'assets/documents/Arnav_khamparia_cv.pdf' },
  ];

  return (
    <footer id="contact" style={{ background: '#060709', position: 'relative', overflow: 'hidden' }}>
      {/* aurora */}
      <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.06), transparent 70%)', pointerEvents: 'none' }} />

      {/* contact body */}
      <div ref={ref} style={{ position: 'relative', zIndex: 1, padding: 'clamp(70px,14vh,160px) clamp(20px,5vw,80px) clamp(50px,8vh,90px)', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: '#10b981', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 28, opacity: v ? 1 : 0, transition: 'opacity 0.8s ease' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', animation: 'studio-pulse 2s infinite' }} />
          Open to opportunities · responds in 24h
        </div>

        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(2.2rem,7vw,5.5rem)', color: '#f4f5f7', lineHeight: 0.98, letterSpacing: '-0.03em', marginBottom: 'clamp(40px,6vw,72px)', opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(28px)', transition: 'all 1s cubic-bezier(0.16,1,0.3,1)' }}>
          Let's build something<br/>that ships.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)', gap: 'clamp(40px,6vw,90px)', alignItems: 'flex-start' }} className="contact-cols">
          {/* form */}
          <div style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s' }}>
            {sent ? (
              <div style={{ padding: '20px 0' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 24, color: '#10b981', marginBottom: 10 }}>Message sent ✦</div>
                <div style={{ fontSize: 14, color: '#9aa3ad' }}>I'll get back to you within 24 hours.</div>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
                <input style={field} onFocus={onF} onBlur={onB} type="text" name="name" placeholder="Your name" required />
                <input style={field} onFocus={onF} onBlur={onB} type="email" name="email" placeholder="Your email" required />
                <textarea style={{ ...field, resize: 'none' }} onFocus={onF} onBlur={onB} name="message" rows={3} placeholder="What are you building?" required />
                {error && <div style={{ fontSize: 12.5, color: '#f87171' }}>{error}</div>}
                <button type="submit" disabled={sending} style={{ alignSelf: 'flex-start', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#060709', background: sending ? '#3a4150' : '#10b981', border: 'none', padding: '13px 28px', borderRadius: 99, cursor: sending ? 'default' : 'pointer', letterSpacing: '0.04em', transition: 'transform 0.2s, background 0.2s', marginTop: 6 }}
                  onMouseEnter={e => { if (!sending) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  {sending ? 'Sending…' : 'Send message ↗'}
                </button>
              </form>
            )}
          </div>

          {/* links */}
          <div style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s' }}>
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" download={s.label.includes('Résumé') ? true : undefined}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: '#f4f5f7', transition: 'color 0.2s, padding-left 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#10b981'; e.currentTarget.style.paddingLeft = '8px'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#f4f5f7'; e.currentTarget.style.paddingLeft = '0'; }}>
                <ScrambleText text={s.label} scrambleOnHover duration={550} style={{ color: 'inherit', fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }} />
                <span style={{ opacity: 0.5 }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* giant wordmark */}
      <div style={{ position: 'relative', zIndex: 1, overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 'clamp(30px,4vw,50px)' }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(4rem,21vw,20rem)', color: '#f4f5f7', lineHeight: 0.8, letterSpacing: '-0.04em', textAlign: 'center', whiteSpace: 'nowrap', opacity: 0.97 }}>
          ARNAV
        </div>
        {/* footer meta row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, padding: 'clamp(20px,3vw,30px) clamp(20px,5vw,80px) clamp(24px,3vw,34px)', borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 'clamp(20px,3vw,40px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <NeuralMark size={22} color="#f4f5f7" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#5b636e' }}>AI Product Engineer · Bengaluru, India</span>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#3a4150' }}>© 2026 Arnav Khamparia</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { StudioContact });
