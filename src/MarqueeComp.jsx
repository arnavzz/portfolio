function MarqueeComp() {
  const items = [
    'LangGraph', 'Gemini Live API', 'Retrieval-Augmented Generation', 'LLMs',
    'PyTorch', 'TensorFlow', 'Prompt Engineering', 'Python',
    'Computer Vision', 'NLP', 'Deep Learning', 'Streamlit',
    'AWS', 'LangChain', 'Transformer Architectures', 'Medical AI',
  ];

  const dot = <span style={{ color: '#10b981', fontSize: 7, margin: '0 20px', opacity: 0.6 }}>◆</span>;

  const row = items.map((item, i) => (
    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
      <span style={{ fontSize: 12.5, fontFamily: 'JetBrains Mono, monospace', color: '#334155', letterSpacing: '0.04em' }}>{item}</span>
      {dot}
    </span>
  ));

  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '14px 0', background: '#060b18', userSelect: 'none' }}>
      <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 32s linear infinite' }}>
        {/* Duplicate for seamless loop */}
        {row}{row}
      </div>
    </div>
  );
}

Object.assign(window, { MarqueeComp });
