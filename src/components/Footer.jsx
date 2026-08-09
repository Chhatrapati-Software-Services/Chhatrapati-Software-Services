import React from 'react';
import { Database, Heart, Shield, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: '#FFFFFF',
      borderTop: '1px solid #E2E8F0',
      padding: '64px 0 32px 0',
      color: 'var(--text-muted)'
    }}>
      <div className="container">
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'var(--gradient-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 4px 10px rgba(249, 115, 22, 0.3)'
              }}>
                CSS
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', color: '#0F172A' }}>
                Chhatrapati Software
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Building intelligent software, AI/ML models, and scalable web solutions for startups worldwide.
            </p>

            <div style={{ fontSize: '0.82rem', color: 'var(--color-orange-dark)', fontWeight: 700 }}>
              Founder: Avdhut Salunkhe | Co-Founder: Tejas Madane
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

          {/* Col 3: Architecture & Keep Alive */}
          <div>
            <h4 style={{ color: '#0F172A', fontSize: '0.95rem', fontWeight: 700, marginBottom: '16px' }}>
              Supabase Keep-Alive Engine
            </h4>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '12px' }}>
              Designed to automatically send lightweight heartbeats to your Supabase instance on website load, bypassing free-tier 7-day cooling deactivations.
            </p>
            <div className="badge badge-emerald" style={{ fontSize: '0.78rem' }}>
              <Database size={12} />
              <span>100% Frontend Architecture</span>
            </div>
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
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#services" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Services</a>
            <a href="#leadership" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Leadership</a>
            <a href="#keepalive" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Supabase Engine</a>
            <a href="#contact" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
