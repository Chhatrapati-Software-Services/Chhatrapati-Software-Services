import React, { useState } from 'react';
import { Database, ShieldCheck, Settings, Sparkles, RefreshCw, Copy, Check, ExternalLink, Zap } from 'lucide-react';
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
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(7, 9, 19, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        
        {/* Brand Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--gradient-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#070913',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)'
          }}>
            CSS
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem', color: '#FFF', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Chhatrapati <span className="gradient-text">Software</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              AI & Web Solutions for Startups
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <a href="#services" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '0.92rem', transition: 'color 0.2s' }}>Services</a>
          <a href="#leadership" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '0.92rem', transition: 'color 0.2s' }}>Leadership</a>
          <a href="#estimator" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '0.92rem', transition: 'color 0.2s' }}>MVP Estimator</a>
          <a href="#keepalive" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '0.92rem', transition: 'color 0.2s' }}>Supabase Engine</a>
          <a href="#contact" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, fontSize: '0.92rem', transition: 'color 0.2s' }}>Contact</a>
        </nav>

        {/* Supabase Status Pill & Config Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            onClick={() => setIsModalOpen(true)}
            className={`badge ${credentials.isConfigured ? 'badge-emerald' : 'badge-amber'}`}
            style={{ cursor: 'pointer', padding: '6px 14px', fontSize: '0.82rem' }}
            title="Click to configure Supabase backend credentials"
          >
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: credentials.isConfigured ? 'var(--color-emerald)' : 'var(--color-amber)',
              boxShadow: credentials.isConfigured ? '0 0 10px var(--color-emerald)' : '0 0 10px var(--color-amber)',
              display: 'inline-block'
            }}></span>
            <Database size={14} />
            <span>{credentials.isConfigured ? 'Supabase Active' : 'Supabase Setup Needed'}</span>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Settings size={15} />
            <span>Backend</span>
          </button>
        </div>
      </div>

      {/* Supabase Configuration Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Database style={{ color: 'var(--color-cyan)' }} />
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
              <div style={{ padding: '10px 14px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid var(--color-emerald)', borderRadius: '8px', color: 'var(--color-emerald)', fontSize: '0.88rem', marginBottom: '16px' }}>
                {saveSuccess}
              </div>
            )}

            <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
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
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-subtle)',
                    color: '#FFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
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
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid var(--border-subtle)',
                    color: '#FFF',
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
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-cyan)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={16} /> Supabase SQL Setup Generator
                </span>
                <button 
                  onClick={handleCopySql}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '4px' }}
                >
                  {copiedSql ? <Check size={14} color="var(--color-emerald)" /> : <Copy size={14} />}
                  <span>{copiedSql ? 'Copied!' : 'Copy SQL Schema'}</span>
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                Paste this into your <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" style={{ color: 'var(--color-cyan)' }}>Supabase SQL Editor <ExternalLink size={12} /></a> to automatically enable lead inquiries and automated keep-alive pings:
              </p>
              <pre style={{
                background: '#070913',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                color: '#38BDF8',
                fontFamily: 'var(--font-mono)',
                maxHeight: '130px',
                overflowY: 'auto',
                border: '1px solid var(--border-subtle)'
              }}>
                {getSqlSetupScript()}
              </pre>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
