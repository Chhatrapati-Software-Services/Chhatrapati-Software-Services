import React, { useState, useEffect } from 'react';
import { 
  Database, Activity, Zap, RefreshCw, ShieldCheck, AlertTriangle, Clock, 
  Copy, Check, Terminal, Play, Pause, Radio, LogOut, LayoutDashboard, 
  Inbox, Settings, FileText, ArrowLeft, ExternalLink, Sparkles 
} from 'lucide-react';
import { 
  getSupabaseCredentials, saveSupabaseCredentials, getPingHistory, 
  getSqlSetupScript, getLocalInquiries, getSupabaseClient 
} from '../../lib/supabase';

export default function AdminDashboard({ keepAliveStatus, onTriggerPing, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('engine');
  const [isPinging, setIsPinging] = useState(false);
  const [autoPingEnabled, setAutoPingEnabled] = useState(true);
  const [pingHistory, setPingHistory] = useState([]);
  const [copiedSql, setCopiedSql] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  const credentials = getSupabaseCredentials();
  const [urlInput, setUrlInput] = useState(credentials.url);
  const [keyInput, setKeyInput] = useState(credentials.anonKey);
  const [saveSuccess, setSaveSuccess] = useState('');

  useEffect(() => {
    setPingHistory(getPingHistory());
    fetchInquiries();
  }, [keepAliveStatus]);

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    const local = getLocalInquiries();
    const client = getSupabaseClient();

    if (client) {
      try {
        const { data, error } = await client.from('contact_inquiries').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          setInquiries(data);
          setLoadingInquiries(false);
          return;
        }
      } catch {
        // fallback to local
      }
    }

    setInquiries(local);
    setLoadingInquiries(false);
  };

  const handleManualPing = async () => {
    setIsPinging(true);
    await onTriggerPing();
    setTimeout(() => {
      setIsPinging(false);
      setPingHistory(getPingHistory());
    }, 600);
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    saveSupabaseCredentials(urlInput, keyInput);
    setSaveSuccess('Supabase credentials saved successfully!');
    setTimeout(() => {
      onTriggerPing();
      fetchInquiries();
    }, 500);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(getSqlSetupScript());
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const formatLastPingTime = (isoString) => {
    if (!isoString) return 'No ping recorded yet';
    const date = new Date(isoString);
    return date.toLocaleTimeString() + ' (' + date.toLocaleDateString() + ')';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Admin Top Navigation Header */}
      <header style={{
        background: '#0F172A',
        color: '#FFFFFF',
        borderBottom: '1px solid #334155',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img src="/logo.png" alt="CSS Logo" style={{ height: '36px', filter: 'brightness(0) invert(1)' }} />
            <div style={{ paddingLeft: '16px', borderLeft: '1px solid #334155', fontSize: '0.88rem', color: '#94A3B8', fontWeight: 600 }}>
              Administrative Portal
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={onBackToSite}
              className="btn btn-secondary btn-sm"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#FFF', border: '1px solid #334155' }}
            >
              <ArrowLeft size={15} />
              <span>Public Site</span>
            </button>

            <button 
              onClick={onLogout}
              className="btn btn-secondary btn-sm"
              style={{ background: '#EF4444', color: '#FFF', border: 'none' }}
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Admin Content Container */}
      <main style={{ flexGrow: 1, padding: '40px 0' }}>
        <div className="container">
          
          {/* Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0F172A' }}>
                Supabase & Operations <span className="gradient-text">Dashboard</span>
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '4px' }}>
                Manage automated keep-alive engine, backend project credentials, and startup client lead inquiries.
              </p>
            </div>

            <div className={`badge ${credentials.isConfigured ? 'badge-emerald' : 'badge-amber'}`} style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
              <Database size={16} />
              <span>{credentials.isConfigured ? 'Supabase Project Connected' : 'Demo Mode (No Credentials)'}</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #E2E8F0', marginBottom: '32px' }}>
            {[
              { id: 'engine', label: 'Keep-Alive Engine', icon: <Zap size={16} /> },
              { id: 'inquiries', label: `Lead Inquiries (${inquiries.length})`, icon: <Inbox size={16} /> },
              { id: 'settings', label: 'Database Credentials & SQL', icon: <Settings size={16} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 24px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: activeTab === tab.id ? 'var(--color-orange-dark)' : 'var(--text-muted)',
                  borderBottom: activeTab === tab.id ? '3px solid var(--color-orange-dark)' : '3px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* TAB 1: KEEP-ALIVE ENGINE */}
          {activeTab === 'engine' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '32px' }}>
              
              {/* Controls */}
              <div className="glass-card" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Zap style={{ color: 'var(--color-orange)' }} />
                    Automated Keep-Alive Engine
                  </h3>
                </div>

                {/* Auto-Ping Control Box */}
                <div style={{
                  background: autoPingEnabled ? 'var(--color-mint-light)' : '#F8FAFC',
                  borderRadius: '14px',
                  padding: '20px',
                  border: autoPingEnabled ? '1.5px solid #A7F3D0' : '1px solid #E2E8F0',
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: autoPingEnabled ? 'var(--color-mint)' : '#0F172A', fontSize: '0.95rem' }}>
                      <Radio size={18} className={autoPingEnabled ? 'animate-pulse' : ''} />
                      <span>Automated Background Auto-Ping</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Sends health pings automatically on page load & every 5 mins.
                    </div>
                  </div>

                  <button
                    onClick={() => setAutoPingEnabled(!autoPingEnabled)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '9999px',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: autoPingEnabled ? 'var(--color-mint)' : '#CBD5E1',
                      color: '#FFFFFF',
                      boxShadow: autoPingEnabled ? '0 4px 12px rgba(5, 150, 105, 0.3)' : 'none'
                    }}
                  >
                    {autoPingEnabled ? <Play size={14} /> : <Pause size={14} />}
                    <span>{autoPingEnabled ? 'ENABLED (ON)' : 'DISABLED (OFF)'}</span>
                  </button>
                </div>

                {/* Live Monitor Card */}
                <div style={{
                  background: '#F8FAFC',
                  borderRadius: '14px',
                  padding: '24px',
                  border: '1px solid #E2E8F0',
                  marginBottom: '24px'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                        Last Keep-Alive Ping
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={16} style={{ color: 'var(--color-orange-dark)' }} />
                        <span>{formatLastPingTime(keepAliveStatus?.timestamp)}</span>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                        Response Latency
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-mint)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Activity size={16} />
                        <span>{keepAliveStatus?.latencyMs || 0} ms</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ padding: '12px', borderRadius: '8px', background: '#FFFFFF', border: '1px solid #E2E8F0', fontSize: '0.85rem' }}>
                    {keepAliveStatus?.success ? (
                      <div style={{ color: 'var(--color-mint)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ShieldCheck size={16} />
                        <span>Ping acknowledged! Database activity timestamp refreshed.</span>
                      </div>
                    ) : (
                      <div style={{ color: 'var(--color-amber)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertTriangle size={16} />
                        <span>{keepAliveStatus?.error || 'Configure your Supabase URL in settings to ping live DB.'}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  onClick={handleManualPing} 
                  disabled={isPinging}
                  className="btn btn-primary"
                  style={{ gap: '8px' }}
                >
                  <RefreshCw size={16} className={isPinging ? 'animate-spin' : ''} />
                  <span>{isPinging ? 'Sending Ping...' : 'Trigger Manual Ping Now'}</span>
                </button>

              </div>

              {/* Ping Trail Logs Table */}
              <div className="glass-card" style={{ padding: '32px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Terminal size={18} style={{ color: 'var(--color-orange-dark)' }} />
                  Recent Ping Trail Log
                </h4>

                <div style={{
                  background: '#0F172A',
                  borderRadius: '12px',
                  border: '1px solid #334155',
                  maxHeight: '340px',
                  overflowY: 'auto',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem'
                }}>
                  {pingHistory.length === 0 ? (
                    <div style={{ padding: '24px', textAlign: 'center', color: '#94A3B8' }}>
                      No ping logs captured yet. Click "Trigger Manual Ping Now".
                    </div>
                  ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #334155', color: '#94A3B8' }}>
                          <th style={{ padding: '12px 14px' }}>Time</th>
                          <th style={{ padding: '12px 14px' }}>Status</th>
                          <th style={{ padding: '12px 14px' }}>Latency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pingHistory.map((ping, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <td style={{ padding: '12px 14px', color: '#F8FAFC' }}>
                              {new Date(ping.timestamp).toLocaleTimeString()}
                            </td>
                            <td style={{ padding: '12px 14px' }}>
                              <span style={{
                                color: ping.success ? '#34D399' : '#FBBF24',
                                fontWeight: 600
                              }}>
                                {ping.success ? '200 OK' : 'LOCAL/DEMO'}
                              </span>
                            </td>
                            <td style={{ padding: '12px 14px', color: '#F97316' }}>
                              {ping.latencyMs} ms
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CONTACT INQUIRIES & LEADS */}
          {activeTab === 'inquiries' && (
            <div className="glass-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Inbox style={{ color: 'var(--color-orange)' }} />
                    Submitted Client Leads ({inquiries.length})
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Inquiries submitted directly through the website contact form.
                  </p>
                </div>

                <button 
                  onClick={fetchInquiries} 
                  disabled={loadingInquiries}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '6px' }}
                >
                  <RefreshCw size={14} className={loadingInquiries ? 'animate-spin' : ''} />
                  <span>Refresh Leads</span>
                </button>
              </div>

              {inquiries.length === 0 ? (
                <div style={{ padding: '48px', textAlign: 'center', background: '#F8FAFC', borderRadius: '12px', border: '1px dashed #CBD5E1', color: 'var(--text-muted)' }}>
                  No lead inquiries recorded yet. Test the contact form on the public website!
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ background: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#0F172A', fontWeight: 700 }}>
                        <th style={{ padding: '14px' }}>Date</th>
                        <th style={{ padding: '14px' }}>Name & Email</th>
                        <th style={{ padding: '14px' }}>Company</th>
                        <th style={{ padding: '14px' }}>Service Requested</th>
                        <th style={{ padding: '14px' }}>Requirements / Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((lead, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #E2E8F0' }}>
                          <td style={{ padding: '14px', whiteSpace: 'nowrap', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                            {lead.created_at ? new Date(lead.created_at).toLocaleDateString() + ' ' + new Date(lead.created_at).toLocaleTimeString() : 'N/A'}
                          </td>
                          <td style={{ padding: '14px' }}>
                            <div style={{ fontWeight: 700, color: '#0F172A' }}>{lead.name}</div>
                            <a href={`mailto:${lead.email}`} style={{ color: 'var(--color-orange-dark)', fontSize: '0.82rem', textDecoration: 'none' }}>{lead.email}</a>
                          </td>
                          <td style={{ padding: '14px', fontWeight: 600, color: '#0F172A' }}>
                            {lead.company || 'N/A'}
                          </td>
                          <td style={{ padding: '14px' }}>
                            <span className="badge" style={{ fontSize: '0.75rem' }}>{lead.service_type || 'General'}</span>
                          </td>
                          <td style={{ padding: '14px', color: 'var(--text-muted)', maxWidth: '300px' }}>
                            {lead.message || 'No description provided.'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DATABASE SETTINGS & SQL */}
          {activeTab === 'settings' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              
              <div className="glass-card" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Settings style={{ color: 'var(--color-orange)' }} />
                  Supabase Project Credentials
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
                  Configure your live Supabase project URL and anon public key.
                </p>

                {saveSuccess && (
                  <div style={{ padding: '12px', background: 'var(--color-mint-light)', border: '1px solid #A7F3D0', borderRadius: '8px', color: 'var(--color-mint)', fontSize: '0.88rem', marginBottom: '20px' }}>
                    {saveSuccess}
                  </div>
                )}

                <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', marginBottom: '6px' }}>
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
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', marginBottom: '6px' }}>
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

                  <button type="submit" className="btn btn-primary" style={{ padding: '14px', fontSize: '1rem' }}>
                    Save & Reconnect Supabase
                  </button>
                </form>
              </div>

              <div className="glass-card" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Sparkles style={{ color: 'var(--color-orange-dark)' }} />
                    1-Click SQL Setup Script
                  </h3>
                  <button 
                    onClick={handleCopySql} 
                    className="btn btn-secondary btn-sm"
                    style={{ gap: '4px' }}
                  >
                    {copiedSql ? <Check size={14} color="var(--color-mint)" /> : <Copy size={14} />}
                    <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
                  </button>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
                  Copy and paste this script into your <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" style={{ color: 'var(--color-orange)', fontWeight: 600 }}>Supabase SQL Editor <ExternalLink size={12} /></a> to create the required tables:
                </p>

                <pre style={{
                  background: '#0F172A',
                  padding: '16px',
                  borderRadius: '12px',
                  fontSize: '0.78rem',
                  color: '#F97316',
                  fontFamily: 'var(--font-mono)',
                  maxHeight: '320px',
                  overflowY: 'auto'
                }}>
                  {getSqlSetupScript()}
                </pre>
              </div>

            </div>
          )}

        </div>
      </main>

    </div>
  );
}
