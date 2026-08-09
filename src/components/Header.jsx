import React, { useState } from 'react';
import { ArrowRight, Settings, Copy, Check, ExternalLink, Zap } from 'lucide-react';
import { getSupabaseCredentials, saveSupabaseCredentials, sendKeepAlivePing, getSqlSetupScript } from '../lib/supabase';

export default function Header({ keepAliveStatus, onTriggerPing }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  
  const credentials = getSupabaseCredentials();
  const [urlInput, setUrlInput] = useState(credentials.url);
  const [keyInput, setKeyInput] = useState(credentials.anonKey);
  const [saveSuccess, setSaveSuccess] = useState('');

  const handleSaveConfig = (e) => {
    e.preventDefault();
    saveSupabaseCredentials(urlInput, keyInput);
    setSaveSuccess('Configuration saved! Running connection test...');
    setTimeout(() => {
      onTriggerPing();
      setSaveSuccess('Connection test completed!');
    }, 500);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(getSqlSetupScript());
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <>
      {/* Main Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E2E8F0',
        boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
          
          {/* Brand Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#0F172A',
              border: '1.5px solid #F97316',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.25)',
              position: 'relative'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L19 7V17L12 21L5 17V7L12 3Z" stroke="#F97316" strokeWidth="2" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" fill="#F97316"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem', color: '#0F172A', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Chhatrapati <span className="gradient-text">Software Services</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700 }}>
                AI Solutions & Web Development
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <a href="#services" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600, fontSize: '0.92rem', transition: 'color 0.2s' }}>Services</a>
            <a href="#leadership" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600, fontSize: '0.92rem', transition: 'color 0.2s' }}>Leadership</a>
            <a href="#estimator" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600, fontSize: '0.92rem', transition: 'color 0.2s' }}>MVP Estimator</a>
            <a href="#keepalive" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600, fontSize: '0.92rem', transition: 'color 0.2s' }}>Supabase Engine</a>
            <a href="#contact" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600, fontSize: '0.92rem', transition: 'color 0.2s' }}>Contact</a>
          </nav>

          {/* Right Action CTA */}
          <div>
            <a href="#contact" className="btn btn-primary btn-sm" style={{ padding: '9px 18px', fontSize: '0.88rem' }}>
              <span>Get Started</span>
              <ArrowRight size={15} />
            </a>
          </div>

        </div>

        {/* Supabase Configuration Modal */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', color: '#0F172A' }}>
                    <Settings style={{ color: 'var(--color-orange)' }} />
                    Supabase Project Settings
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
                    Frontend-only database connection & automated keep-alive parameters.
                  </p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}
                >
                  &times;
                </button>
              </div>

              {saveSuccess && (
                <div style={{ padding: '10px 14px', background: 'var(--color-mint-light)', border: '1px solid #A7F3D0', borderRadius: '8px', color: 'var(--color-mint)', fontSize: '0.88rem', marginBottom: '16px' }}>
                  {saveSuccess}
                </div>
              )}

              <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                    Supabase Project URL
                  </label>
                  <input 
                    type="url"
                    placeholder="https://your-project-id.supabase.co"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      background: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      color: '#0F172A',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                    Supabase Anon Key (Public)
                  </label>
                  <input 
                    type="text"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      background: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      color: '#0F172A',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    Save Credentials
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      saveSupabaseCredentials('', '');
                      setUrlInput('');
                      setKeyInput('');
                      setSaveSuccess('Credentials cleared!');
                    }}
                  >
                    Reset
                  </button>
                </div>
              </form>

              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-orange-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Zap size={16} /> Supabase SQL Setup Generator
                  </span>
                  <button 
                    onClick={handleCopySql}
                    className="btn btn-secondary btn-sm"
                    style={{ gap: '4px' }}
                  >
                    {copiedSql ? <Check size={14} color="var(--color-mint)" /> : <Copy size={14} />}
                    <span>{copiedSql ? 'Copied!' : 'Copy SQL Schema'}</span>
                  </button>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  Paste this into your <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" style={{ color: 'var(--color-orange)', fontWeight: 600 }}>Supabase SQL Editor <ExternalLink size={12} /></a> to automatically enable lead inquiries and keep-alive pings:
                </p>
                <pre style={{
                  background: '#0F172A',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '0.75rem',
                  color: '#F97316',
                  fontFamily: 'var(--font-mono)',
                  maxHeight: '130px',
                  overflowY: 'auto'
                }}>
                  {getSqlSetupScript()}
                </pre>
              </div>

            </div>
          </div>
        )}
      </header>
    </>
  );
}
