import React, { useState } from 'react';
import { 
  ArrowRight, Settings, Copy, Check, ExternalLink, Zap, 
  Layers, Users, Calculator, Mail, Menu, X, Lock, Sparkles 
} from 'lucide-react';
import { getSupabaseCredentials, saveSupabaseCredentials, sendKeepAlivePing, getSqlSetupScript } from '../lib/supabase';

export default function Header({ keepAliveStatus, onTriggerPing }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        background: 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #E2E8F0',
        boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
          
          {/* Prominent Official Brand Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 1 }}>
            <img 
              src="/logo.png" 
              alt="Chhatrapati Software Services" 
              className="header-logo"
              style={{
                height: '48px',
                width: 'auto',
                maxWidth: '260px',
                objectFit: 'contain'
              }}
            />
          </a>

          {/* Desktop Nav with Icons */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <a href="#services" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s' }}>
              <Layers size={16} style={{ color: 'var(--color-orange-dark)' }} />
              <span>Services</span>
            </a>
            <a href="#leadership" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s' }}>
              <Users size={16} style={{ color: 'var(--color-blue)' }} />
              <span>Leadership</span>
            </a>
            <a href="#estimator" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s' }}>
              <Calculator size={16} style={{ color: 'var(--color-mint)' }} />
              <span>MVP Estimator</span>
            </a>
            <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s' }}>
              <Mail size={16} style={{ color: 'var(--color-orange)' }} />
              <span>Contact</span>
            </a>
          </nav>

          {/* Right Action CTA & Mobile Hamburger Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <a href="#contact" className="btn btn-primary header-cta-desktop" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              <span>Get Started</span>
              <ArrowRight size={16} />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: '#F1F5F9',
                border: '1px solid #CBD5E1',
                color: '#0F172A',
                cursor: 'pointer'
              }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            background: '#FFFFFF',
            borderBottom: '1px solid #E2E8F0',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
          }}>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)} 
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', textDecoration: 'none', color: '#0F172A', fontWeight: 600 }}
            >
              <Layers size={18} style={{ color: 'var(--color-orange-dark)' }} />
              <span>Services</span>
            </a>
            <a 
              href="#leadership" 
              onClick={() => setMobileMenuOpen(false)} 
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', textDecoration: 'none', color: '#0F172A', fontWeight: 600 }}
            >
              <Users size={18} style={{ color: 'var(--color-blue)' }} />
              <span>Leadership</span>
            </a>
            <a 
              href="#estimator" 
              onClick={() => setMobileMenuOpen(false)} 
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', textDecoration: 'none', color: '#0F172A', fontWeight: 600 }}
            >
              <Calculator size={18} style={{ color: 'var(--color-mint)' }} />
              <span>MVP Estimator</span>
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)} 
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', textDecoration: 'none', color: '#0F172A', fontWeight: 600 }}
            >
              <Mail size={18} style={{ color: 'var(--color-orange)' }} />
              <span>Contact Us</span>
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)} 
              className="btn btn-primary"
              style={{ padding: '12px', textAlign: 'center', marginTop: '4px' }}
            >
              <span>Get Started</span>
              <ArrowRight size={16} />
            </a>
            <a 
              href="#admin" 
              onClick={() => setMobileMenuOpen(false)} 
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', textDecoration: 'none', color: 'var(--color-orange-dark)', fontWeight: 700, background: 'var(--color-orange-light)', borderRadius: '8px' }}
            >
              <Lock size={18} />
              <span>Admin Portal Login</span>
            </a>
          </div>
        )}
      </header>
    </>
  );
}
