import React from 'react';
import { ArrowRight, Bot, Cpu, Sparkles, Code2, Database, ShieldCheck, Activity, Rocket } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  return (
    <section style={{
      position: 'relative',
      padding: '120px 0 80px 0',
      overflow: 'hidden'
    }}>
      {/* Background glow effects */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(168, 85, 247, 0.1) 40%, transparent 70%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Hero Text */}
          <div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <div className="badge">
                <Sparkles size={14} />
                <span>AI & Machine Learning Solutions</span>
              </div>
              <div className="badge badge-emerald">
                <Rocket size={14} />
                <span>Startup MVP Development</span>
              </div>
            </div>

            <h1 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px' }}>
              Building <span className="gradient-text">Intelligent Software</span> for High-Growth Startups.
            </h1>

            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '36px', maxWidth: '580px', lineHeight: 1.6 }}>
              <strong>Chhatrapati Software Services (CSS)</strong> combines cutting-edge AI/ML, LLMs, RAG, and scalable full-stack engineering to convert visionary ideas into production-ready digital products.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <a href="#contact" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1.05rem' }}>
                <span>Start Your Project</span>
                <ArrowRight size={18} />
              </a>
              <a href="#keepalive" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>
                <Database size={18} style={{ color: 'var(--color-cyan)' }} />
                <span>Supabase Engine</span>
              </a>
            </div>

            {/* Quick Metrics / Founders Pill */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              paddingTop: '24px',
              borderTop: '1px solid var(--border-subtle)'
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-cyan)' }}>
                  AI / ML
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>LLMs, RAG & Vision</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-violet)' }}>
                  Full-Stack
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>React, Node & Supabase</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-emerald)' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Frontend + DB Architecture</div>
              </div>
            </div>

          </div>

          {/* Right Hero Interactive Glass Visualizer */}
          <div>
            <div className="glass-card animate-float" style={{ padding: '32px', position: 'relative' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }} />
                </div>
                <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                  css_ai_pipeline.v2.js
                </span>
              </div>

              {/* Code / Visual Box */}
              <div style={{
                background: 'rgba(7, 9, 19, 0.9)',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid var(--border-subtle)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: '#E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-cyan)' }}>
                  <Bot size={18} />
                  <span>// Initializing CSS Intelligence Stack</span>
                </div>

                <div style={{ paddingLeft: '12px', borderLeft: '2px solid var(--color-cyan)' }}>
                  <div><span style={{ color: 'var(--color-violet)' }}>const</span> company = <span style={{ color: '#FCD34D' }}>"Chhatrapati Software Services"</span>;</div>
                  <div><span style={{ color: 'var(--color-violet)' }}>const</span> founder = <span style={{ color: '#FCD34D' }}>"Avdhut Salunkhe"</span>;</div>
                  <div><span style={{ color: 'var(--color-violet)' }}>const</span> coFounder = <span style={{ color: '#FCD34D' }}>"Tejas Madane"</span>;</div>
                </div>

                <div style={{ background: 'rgba(56, 189, 248, 0.08)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--color-emerald)', fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Activity size={15} /> Supabase Auto Keep-Alive: ACTIVE
                    </span>
                    <span>200 OK</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Automated background ping engine prevents free-tier cooling deactivation.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '4px' }}>
                  {['Python', 'RAG', 'LLMs', 'React', 'Supabase', 'Node.js', 'PostgreSQL'].map((tech) => (
                    <span key={tech} style={{
                      padding: '4px 10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <span>Founders: Avdhut Salunkhe & Tejas Madane</span>
                <span style={{ color: 'var(--color-emerald)', fontWeight: 600 }}>● Ready for Hire</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
