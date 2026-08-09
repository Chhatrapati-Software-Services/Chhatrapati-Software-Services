import React from 'react';
import { UserCheck, Award, Terminal, Cpu, Lightbulb, Users, CheckCircle2, Shield, HeartHandshake } from 'lucide-react';

export default function Leadership() {
  const leaders = [
    {
      name: 'Avdhut Salunkhe',
      role: 'Founder & Owner',
      tagline: 'AI & Machine Learning Specialist | Full-Stack Architect',
      initials: 'AS',
      accentColor: 'var(--color-orange-dark)',
      bgColor: 'var(--color-orange-light)',
      borderColor: 'var(--color-orange-border)',
      bio: 'Pioneering intelligent AI/ML architectures and full-stack software solutions designed to give startups an unfair technology advantage.',
      skills: [
        'Artificial Intelligence & ML',
        'Full-Stack Architecture',
        'Large Language Models (LLMs)',
        'Product Engineering',
        'Emerging Technologies'
      ]
    },
    {
      name: 'Tejas Madane',
      role: 'Co-Founder',
      tagline: 'Software Engineer | Product & Solutions Lead',
      initials: 'TM',
      accentColor: 'var(--color-blue)',
      bgColor: 'var(--color-blue-light)',
      borderColor: '#BFDBFE',
      bio: 'Dedicated to turning complex tech requirements into intuitive, reliable, and high-performance software products.',
      skills: [
        'Software Development',
        'Product Engineering',
        'Technology Solutions',
        'Technical Collaboration',
        'System Optimization'
      ]
    }
  ];

  return (
    <section id="leadership" className="section">
      <div className="container">
        
        <div className="section-title">
          <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
            <Users size={14} />
            <span>Company Leadership</span>
          </div>
          <h2>Driven by <span className="gradient-text">Engineers & Founders</span></h2>
          <p>
            Meet the leadership behind Chhatrapati Software Services, dedicated to solving complex business problems with clean code and AI.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px', maxWidth: '960px', margin: '0 auto 48px auto' }}>
          {leaders.map((leader, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '36px', position: 'relative', overflow: 'hidden' }}>
              
              {/* Top Accent Line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: leader.accentColor
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '20px',
                  background: leader.bgColor,
                  border: `1px solid ${leader.borderColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: leader.accentColor,
                  boxShadow: `0 4px 12px ${leader.borderColor}`
                }}>
                  {leader.initials}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>{leader.name}</h3>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: leader.accentColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {leader.role}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    Chhatrapati Software Services
                  </div>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', marginBottom: '24px', lineHeight: 1.6 }}>
                "{leader.bio}"
              </p>

              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Terminal size={15} style={{ color: leader.accentColor }} />
                  <span>Core Technical Focus:</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {leader.skills.map((skill, sIdx) => (
                    <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                      <CheckCircle2 size={16} style={{ color: leader.accentColor, flexShrink: 0 }} />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Subtle Ethos & Cultural Heritage Accent Card */}
        <div style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '24px 32px',
          borderRadius: '16px',
          background: 'var(--color-orange-light)',
          border: '1px solid var(--color-orange-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Shield size={24} style={{ color: 'var(--color-orange-dark)', flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--color-orange-dark)' }}>
                ॥ कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ॥
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Inspired by timeless Indian ethos & Chhatrapati Shivaji Maharaj's legacy of duty, honor, and engineering perfection.
              </div>
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', background: '#FFFFFF', padding: '6px 14px', borderRadius: '9999px', border: '1px solid var(--color-orange-border)' }}>
            Excellence in Action
          </div>
        </div>

      </div>
    </section>
  );
}
