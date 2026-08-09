import React from 'react';
import { Bot, Code, Cpu, Database, Layout, Sparkles, Layers, Shield, Zap, Search, Eye, BarChart3, LineChart } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Bot size={32} style={{ color: 'var(--color-cyan)' }} />,
      badge: 'AI & ML Capabilities',
      title: 'Artificial Intelligence & Machine Learning',
      description: 'We develop state-of-the-art AI/ML solutions seamlessly integrated into your business workflows.',
      tags: ['LLMs', 'RAG Engine', 'NLP', 'Computer Vision', 'Predictive Analytics', 'AI Chatbots'],
      highlights: [
        'Retrieval-Augmented Generation (RAG) for custom knowledge bases',
        'Large Language Model (LLM) fine-tuning & prompt engineering',
        'Intelligent automation & conversational AI agents',
        'Computer vision & automated data analytics'
      ]
    },
    {
      icon: <Code size={32} style={{ color: 'var(--color-violet)' }} />,
      badge: 'Web & Custom Software',
      title: 'Full-Stack Web & Software Engineering',
      description: 'Modern, high-performance web applications built with clean architecture and scalable codebases.',
      tags: ['React', 'JavaScript', 'Node.js', 'REST APIs', 'Supabase', 'Dashboards'],
      highlights: [
        'Full-stack SaaS platform development',
        'Real-time admin panels & business analytics dashboards',
        'Robust REST API & microservices integration',
        'Database-driven responsive web applications'
      ]
    },
    {
      icon: <Zap size={32} style={{ color: 'var(--color-emerald)' }} />,
      badge: 'Startup Accelerator',
      title: 'Startup MVP & Product Acceleration',
      description: 'Transform your startup concept into a functional, investor-ready Minimum Viable Product fast.',
      tags: ['MVP Launch', 'Fast Iteration', 'Clean Architecture', 'User Centric'],
      highlights: [
        'End-to-end product architecture & UI/UX execution',
        'Rapid prototyping with Supabase & Serverless stack',
        'Scalable foundation designed for future expansion',
        'Cost-effective tech stack selection for early-stage startups'
      ]
    }
  ];

  return (
    <section id="services" className="section" style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
      <div className="container">
        
        <div className="section-title">
          <div className="badge" style={{ marginBottom: '12px' }}>
            <Sparkles size={14} />
            <span>Our Core Expertise</span>
          </div>
          <h2>Innovative Services Engineered for <span className="gradient-text">Growth</span></h2>
          <p>
            From custom AI models to scalable web platforms, we provide end-to-end technology solutions tailored to startup speed and precision.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px' }}>
          {services.map((service, index) => (
            <div key={index} className="glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {service.icon}
                </div>
                <span className="badge" style={{ fontSize: '0.75rem' }}>{service.badge}</span>
              </div>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>
                {service.title}
              </h3>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>
                {service.description}
              </p>

              <div style={{ marginBottom: '24px', flexGrow: 1 }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '10px' }}>
                  Key Solutions:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {service.highlights.map((h, i) => (
                    <li key={i} style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: 'var(--color-cyan)', marginTop: '2px' }}>✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                {service.tags.map((tag) => (
                  <span key={tag} className="mono" style={{
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    color: 'var(--color-cyan)'
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
