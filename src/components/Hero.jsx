import React from 'react';
import { ArrowRight, Bot, Cpu, Sparkles, Code2, Database, ShieldCheck, Activity, Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      padding: '80px 0 60px 0',
      overflow: 'hidden'
    }}>
      {/* Subtle radial background glow */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, rgba(245, 158, 11, 0.04) 50%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }}>
          
          {/* Left Hero Text */}
          <div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <div className="badge" style={{ background: 'var(--color-orange-light)', color: 'var(--color-orange-dark)', border: '1px solid var(--color-orange-border)', fontWeight: 700 }}>
                <span>॥ योगः कर्मसु कौशलम् ॥</span>
              </div>
              <div className="badge">
                <Sparkles size={14} />
                <span>AI & Machine Learning Solutions</span>
              </div>
              <div className="badge badge-emerald">
                <Rocket size={14} />
                <span>Startup MVP Acceleration</span>
              </div>
            </div>

            <h1 style={{ fontSize: '3.4rem', fontWeight: 900, lineHeight: 1.15, marginBottom: '24px', color: '#0F172A' }}>
              Building <span className="gradient-text">Intelligent Software</span> for High-Growth Startups.
            </h1>

            <p style={{ fontSize: '1.18rem', color: 'var(--text-muted)', marginBottom: '36px', maxWidth: '580px', lineHeight: 1.6 }}>
              <strong>Chhatrapati Software Services (CSS)</strong> combines cutting-edge AI/ML, LLMs, RAG, and scalable full-stack engineering to convert visionary ideas into production-ready digital products.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <a href="#contact" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '1.02rem' }}>
                <span>Start Your Project</span>
                <ArrowRight size={18} />
              </a>
              <a href="#keepalive" className="btn btn-secondary" style={{ padding: '14px 28px', fontSize: '1.02rem' }}>
                <Database size={18} style={{ color: 'var(--color-orange)' }} />
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
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-orange-dark)' }}>
                  AI / ML
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>LLMs, RAG & Vision</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-blue)' }}>
                  Full-Stack
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>React, Node & Supabase</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-mint)' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500 }}>Frontend + DB Architecture</div>
              </div>
            </div>

          </div>

          {/* Right Hero Interactive Techspot Panel */}
          <div>
            <div className="glass-card" style={{ padding: '32px', border: '1px solid #E2E8F0' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }} />
                </div>
                <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  css_system_control.v1
                </span>
              </div>

              {/* Dark Code Box inside Crisp Light Card */}
              <div style={{
                background: '#0F172A',
                borderRadius: '12px',
                padding: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: '#F8FAFC',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.4)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#F97316', fontWeight: 600 }}>
                  <Bot size={18} />
                  <span>// Initializing CSS Intelligence Stack</span>
                </div>

                <div style={{ paddingLeft: '12px', borderLeft: '2px solid #F97316' }}>
                  <div><span style={{ color: '#FB923C' }}>const</span> company = <span style={{ color: '#FCD34D' }}>"Chhatrapati Software Services"</span>;</div>
                  <div><span style={{ color: '#FB923C' }}>const</span> founder = <span style={{ color: '#FCD34D' }}>"Avdhut Salunkhe"</span>;</div>
                  <div><span style={{ color: '#FB923C' }}>const</span> coFounder = <span style={{ color: '#FCD34D' }}>"Tejas Madane"</span>;</div>
                  <div><span style={{ color: '#FB923C' }}>const</span> motto = <span style={{ color: '#FCD34D' }}>"योगः कर्मसु कौशलम्"</span>;</div>
                </div>

                <div style={{ background: 'rgba(249, 115, 22, 0.12)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#34D399', fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Activity size={15} /> Supabase Auto Keep-Alive: ACTIVE
                    </span>
                    <span>200 OK</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '4px' }}>
                    Automated background ping engine prevents free-tier cooling deactivation.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '4px' }}>
                  {['Python', 'RAG', 'LLMs', 'React', 'Supabase', 'Node.js', 'PostgreSQL'].map((tech) => (
                    <span key={tech} style={{
                      padding: '4px 10px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      color: '#E2E8F0'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <span style={{ fontWeight: 600 }}>Founders: Avdhut Salunkhe & Tejas Madane</span>
                <span style={{ color: 'var(--color-mint)', fontWeight: 700 }}>● Ready for Hire</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
