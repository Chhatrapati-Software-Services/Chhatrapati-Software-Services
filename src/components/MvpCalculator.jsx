import React, { useState } from 'react';
import { Calculator, Sparkles, Clock, Layers, Cpu, ArrowRight } from 'lucide-react';

export default function MvpCalculator() {
  const [productType, setProductType] = useState('saas');
  const [aiLevel, setAiLevel] = useState('rag');
  const [timelineSpeed, setTimelineSpeed] = useState('express');

  const options = {
    productTypes: [
      { id: 'saas', name: 'SaaS Platform', weeks: 3, tech: 'React + Supabase' },
      { id: 'chatbot', name: 'AI Assistant / RAG Agent', weeks: 2, tech: 'Python + LLMs + Supabase' },
      { id: 'dashboard', name: 'Admin & Analytics Dashboard', weeks: 2, tech: 'React + Chart.js + REST' },
      { id: 'custom', name: 'Custom Startup MVP', weeks: 4, tech: 'Full-Stack Modern Web' }
    ],
    aiLevels: [
      { id: 'none', name: 'Standard Full-Stack (No AI)', addWeeks: 0, desc: 'Clean database & UI logic' },
      { id: 'rag', name: 'RAG & Custom Knowledge AI', addWeeks: 1, desc: 'Document chat & smart search' },
      { id: 'vision', name: 'Computer Vision & ML', addWeeks: 2, desc: 'Image recognition & predictive ML' }
    ]
  };

  const selectedProduct = options.productTypes.find(p => p.id === productType);
  const selectedAi = options.aiLevels.find(a => a.id === aiLevel);
  const totalWeeks = selectedProduct.weeks + selectedAi.addWeeks;

  return (
    <section id="estimator" className="section" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
      <div className="container">
        
        <div className="section-title">
          <div className="badge">
            <Calculator size={14} />
            <span>Interactive Tool</span>
          </div>
          <h2>Estimate Your <span className="gradient-text">Startup MVP</span> Timeline</h2>
          <p>
            Configure your product requirements to view recommended architecture and estimated delivery timeframe.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px' }}>
            
            {/* Left Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* Product Type Selector */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-main)' }}>
                  1. Select Product Type
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {options.productTypes.map((pt) => (
                    <div
                      key={pt.id}
                      onClick={() => setProductType(pt.id)}
                      style={{
                        padding: '14px',
                        borderRadius: '10px',
                        background: productType === pt.id ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                        border: productType === pt.id ? '1px solid var(--color-cyan)' : '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: productType === pt.id ? 'var(--color-cyan)' : '#FFF' }}>
                        {pt.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Base ~{pt.weeks} weeks
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Integration Level */}
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-main)' }}>
                  2. AI / ML Integration Level
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {options.aiLevels.map((ai) => (
                    <div
                      key={ai.id}
                      onClick={() => setAiLevel(ai.id)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: aiLevel === ai.id ? 'rgba(168, 85, 247, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                        border: aiLevel === ai.id ? '1px solid var(--color-violet)' : '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: aiLevel === ai.id ? 'var(--color-violet)' : '#FFF' }}>
                          {ai.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {ai.desc}
                        </div>
                      </div>
                      <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        +{ai.addWeeks} wk
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Summary Box */}
            <div style={{
              background: 'rgba(7, 9, 19, 0.8)',
              borderRadius: '16px',
              padding: '28px',
              border: '1px solid var(--border-glow)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <div className="badge badge-emerald" style={{ marginBottom: '16px' }}>
                  <Sparkles size={14} />
                  <span>Estimated Specs</span>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Estimated Timeframe</div>
                  <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--color-cyan)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={28} />
                    <span>{totalWeeks} - {totalWeeks + 1} Weeks</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  <div>
                    <strong style={{ color: '#FFF' }}>Stack:</strong> React, Supabase, Tailwind, Modern JS
                  </div>
                  <div>
                    <strong style={{ color: '#FFF' }}>Database:</strong> Supabase PostgreSQL (Frontend Direct + Auto Keep-Alive)
                  </div>
                  <div>
                    <strong style={{ color: '#FFF' }}>Delivery:</strong> Production Ready, Clean Code, CI/CD Pipeline
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
                <a href="#contact" className="btn btn-primary" style={{ width: '100%' }}>
                  <span>Request Custom Quote</span>
                  <ArrowRight size={16} />
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
