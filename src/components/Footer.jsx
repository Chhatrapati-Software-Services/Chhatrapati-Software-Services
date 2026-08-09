import React from 'react';
import { Database, Lock, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: '#FFFFFF',
      borderTop: '1px solid #E2E8F0',
      padding: '48px 0 32px 0',
      color: 'var(--text-muted)'
    }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '36px', marginBottom: '40px' }}>
          
          {/* Col 1 */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <img 
                src="/logo.png" 
                alt="Chhatrapati Software Services" 
                style={{ height: '42px', width: 'auto', maxWidth: '200px', objectFit: 'contain' }} 
              />
            </div>

            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Building intelligent software, AI/ML models, and scalable web solutions for startups worldwide.
            </p>

            <div style={{ fontSize: '0.82rem', color: 'var(--color-orange-dark)', fontWeight: 700, marginBottom: '4px' }}>
              Founder: Avdhut Salunkhe | Co-Founder: Tejas Madane
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 600 }}>
              ॥ योगः कर्मसु कौशलम् ॥
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 style={{ color: '#0F172A', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px' }}>
              Services & Capabilities
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>Artificial Intelligence & ML</li>
              <li>LLMs & RAG Architectures</li>
              <li>Full-Stack Web Applications</li>
              <li>Startup MVP Acceleration</li>
              <li>Supabase Serverless Integrations</li>
            </ul>
          </div>

          {/* Col 3: Architecture & Admin */}
          <div>
            <h4 style={{ color: '#0F172A', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px' }}>
              Supabase Keep-Alive Engine
            </h4>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Automated background engine keeps your free Supabase instance active 24/7. Admin panel handles keep-alive trail logs and leads.
            </p>
            
            <a 
              href="#admin" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                background: 'var(--color-orange-light)',
                border: '1px solid var(--color-orange-border)',
                color: 'var(--color-orange-dark)',
                fontSize: '0.82rem',
                fontWeight: 700,
                textDecoration: 'none'
              }}
            >
              <Lock size={13} />
              <span>Admin Portal Login</span>
            </a>
          </div>

        </div>

        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.82rem'
        }}>
          <div>
            © {new Date().getFullYear()} <strong>Chhatrapati Software Services (CSS)</strong>. All rights reserved.
          </div>
          <div className="footer-links" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#services" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Services</a>
            <a href="#leadership" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Leadership</a>
            <a href="#estimator" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>MVP Estimator</a>
            <a href="#contact" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Contact</a>
            <a href="#admin" style={{ color: 'var(--color-orange-dark)', textDecoration: 'none', fontWeight: 700 }}>Admin Portal</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
