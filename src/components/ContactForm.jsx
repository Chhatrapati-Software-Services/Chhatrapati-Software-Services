import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Database, Sparkles, MessageSquare, Building2, Mail, User } from 'lucide-react';
import { submitContactInquiry, getSupabaseCredentials } from '../lib/supabase';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service_type: 'AI & Machine Learning',
    budget: '$1,000 - $5,000',
    message: ''
  });

  const [status, setStatus] = useState({ loading: false, success: false, message: '', mode: '' });
  const credentials = getSupabaseCredentials();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setStatus({ loading: false, success: false, message: 'Please fill in your name and email.' });
      return;
    }

    setStatus({ loading: true, success: false, message: 'Submitting inquiry...' });

    const res = await submitContactInquiry(formData);

    setStatus({
      loading: false,
      success: true,
      message: res.message,
      mode: res.mode
    });

    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        company: '',
        service_type: 'AI & Machine Learning',
        budget: '$1,000 - $5,000',
        message: ''
      });
    }, 4000);
  };

  return (
    <section id="contact" className="section" style={{ background: '#F1F5F9' }}>
      <div className="container">
        
        <div className="section-title">
          <div className="badge">
            <MessageSquare size={14} />
            <span>Get In Touch</span>
          </div>
          <h2>Let's Build Your <span className="gradient-text">Intelligent Product</span></h2>
          <p>
            Have a project or startup MVP in mind? Send us your requirements and our team will get back to you within 24 hours.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '48px', maxWidth: '1080px', margin: '0 auto', alignItems: 'start' }}>
          
          {/* Left Info Card */}
          <div className="glass-card" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '16px', color: '#0F172A' }}>
              Chhatrapati Software Services
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '28px', lineHeight: 1.6 }}>
              We partner with visionary founders to engineer scalable software and AI solutions that drive real business impact.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Founder & Owner
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-orange-dark)', marginTop: '2px' }}>
                  Avdhut Salunkhe
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Co-Founder
                </div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-blue)', marginTop: '2px' }}>
                  Tejas Madane
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Primary Focus
                </div>
                <div style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginTop: '2px', fontWeight: 600 }}>
                  AI/ML, Full-Stack Web Dev & Startup MVPs
                </div>
              </div>
            </div>

            <div style={{
              padding: '16px',
              borderRadius: '12px',
              background: 'var(--color-orange-light)',
              border: '1px solid var(--color-orange-border)',
              fontSize: '0.85rem',
              color: 'var(--color-orange-dark)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Database size={20} style={{ color: 'var(--color-orange-dark)', flexShrink: 0 }} />
              <div>
                <strong>Direct Frontend DB:</strong> Form data is transmitted straight to Supabase tables.
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="glass-card" style={{ padding: '36px' }}>
            
            {status.success && (
              <div style={{
                padding: '16px',
                borderRadius: '10px',
                background: 'var(--color-mint-light)',
                border: '1px solid #A7F3D0',
                color: 'var(--color-mint)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                fontSize: '0.9rem'
              }}>
                <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700 }}>Inquiry Received!</div>
                  <div style={{ fontSize: '0.84rem', marginTop: '2px', opacity: 0.9 }}>
                    {status.message}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Avdhut Salunkhe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      background: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      color: '#0F172A',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="avdhut@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      background: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      color: '#0F172A',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                    Company / Startup Name
                  </label>
                  <input
                    type="text"
                    placeholder="CSS Tech"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      background: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      color: '#0F172A',
                      fontSize: '0.92rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                    Service Required
                  </label>
                  <select
                    value={formData.service_type}
                    onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      background: '#F8FAFC',
                      border: '1px solid #CBD5E1',
                      color: '#0F172A',
                      fontSize: '0.92rem'
                    }}
                  >
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                    <option value="Startup MVP Development">Startup MVP Development</option>
                    <option value="RAG & LLM Integration">RAG & LLM Integration</option>
                    <option value="Custom Business Software">Custom Business Software</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                  Project Description & Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your startup idea, AI features needed, timeline, etc..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    background: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    color: '#0F172A',
                    fontSize: '0.92rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={status.loading}
                className="btn btn-primary"
                style={{ padding: '14px', fontSize: '1rem' }}
              >
                <Send size={18} />
                <span>{status.loading ? 'Submitting to Supabase...' : 'Send Inquiry Now'}</span>
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
