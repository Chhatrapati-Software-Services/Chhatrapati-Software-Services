import React, { useState, useEffect } from 'react';
import { Database, Activity, Zap, RefreshCw, ShieldCheck, AlertTriangle, Clock, Copy, Check, Terminal, Play, Pause, Radio } from 'lucide-react';
import { getSupabaseCredentials, getPingHistory, getSqlSetupScript } from '../lib/supabase';

export default function KeepAliveWidget({ keepAliveStatus, onTriggerPing }) {
  const [isPinging, setIsPinging] = useState(false);
  const [autoPingEnabled, setAutoPingEnabled] = useState(true);
  const [pingHistory, setPingHistory] = useState([]);
  const [copiedSql, setCopiedSql] = useState(false);
  const credentials = getSupabaseCredentials();

  useEffect(() => {
    setPingHistory(getPingHistory());
  }, [keepAliveStatus]);

  const handleManualPing = async () => {
    setIsPinging(true);
    await onTriggerPing();
    setTimeout(() => {
      setIsPinging(false);
      setPingHistory(getPingHistory());
    }, 600);
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
    <section id="keepalive" className="section">
      <div className="container">
        
        <div className="section-title">
          <div className="badge badge-emerald" style={{ marginBottom: '12px' }}>
            <Activity size={14} />
            <span>Core Feature</span>
          </div>
          <h2>Automated Supabase <span className="gradient-text">Keep-Alive Engine</span></h2>
          <p>
            Supabase free-tier projects enter a cooling state and pause after 7 days of inactivity. Our integrated engine sends automated health pings directly from the frontend to keep your database active 24/7.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '36px', maxWidth: '1080px', margin: '0 auto', position: 'relative' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '36px', alignItems: 'flex-start' }}>
            
            {/* Left Status & Automated Engine Controls */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'var(--color-mint-light)',
                    border: '1px solid #A7F3D0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-mint)'
                  }}>
                    <Zap size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>Keep-Alive Control Panel</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      Frontend Automated Background Heartbeat
                    </div>
                  </div>
                </div>

                <div className={`badge ${credentials.isConfigured ? 'badge-emerald' : 'badge-amber'}`}>
                  <span>{credentials.isConfigured ? 'Supabase Connected' : 'Demo Mode'}</span>
                </div>
              </div>

              {/* Auto-Ping Engine Mode Switch Card */}
              <div style={{
                background: autoPingEnabled ? 'var(--color-mint-light)' : '#F8FAFC',
                borderRadius: '14px',
                padding: '20px',
                border: autoPingEnabled ? '1.5px solid #A7F3D0' : '1px solid #E2E8F0',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, color: autoPingEnabled ? 'var(--color-mint)' : '#0F172A', fontSize: '0.95rem' }}>
                    <Radio size={18} className={autoPingEnabled ? 'animate-pulse' : ''} />
                    <span>Automated Background Auto-Ping</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {autoPingEnabled 
                      ? 'Sends pings automatically on page load & every 5 mins' 
                      : 'Auto-ping disabled. Manual pinging only.'}
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
                    boxShadow: autoPingEnabled ? '0 4px 12px rgba(5, 150, 105, 0.3)' : 'none',
                    transition: 'all 0.2s'
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
                      <span>{keepAliveStatus?.error || 'Configure your Supabase URL in `.env` or header.'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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

            </div>

            {/* Right: Recent Ping Log Table */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', color: '#0F172A' }}>
                  <Terminal size={16} style={{ color: 'var(--color-orange-dark)' }} />
                  Recent Ping Trail Log
                </h4>
                <button 
                  onClick={handleCopySql} 
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.78rem', gap: '4px' }}
                >
                  {copiedSql ? <Check size={12} color="var(--color-mint)" /> : <Copy size={12} />}
                  <span>{copiedSql ? 'Copied SQL' : 'SQL Table Generator'}</span>
                </button>
              </div>

              <div style={{
                background: '#0F172A',
                borderRadius: '12px',
                border: '1px solid #334155',
                maxHeight: '260px',
                overflowY: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem'
              }}>
                {pingHistory.length === 0 ? (
                  <div style={{ padding: '24px', textAlign: 'center', color: '#94A3B8' }}>
                    No ping logs captured yet. Click "Trigger Manual Ping Now".
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #334155', color: '#94A3B8' }}>
                        <th style={{ padding: '10px 14px' }}>Time</th>
                        <th style={{ padding: '10px 14px' }}>Status</th>
                        <th style={{ padding: '10px 14px' }}>Latency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pingHistory.map((ping, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                          <td style={{ padding: '10px 14px', color: '#F8FAFC' }}>
                            {new Date(ping.timestamp).toLocaleTimeString()}
                          </td>
                          <td style={{ padding: '10px 14px' }}>
                            <span style={{
                              color: ping.success ? '#34D399' : '#FBBF24',
                              fontWeight: 600
                            }}>
                              {ping.success ? '200 OK' : 'LOCAL/DEMO'}
                            </span>
                          </td>
                          <td style={{ padding: '10px 14px', color: '#F97316' }}>
                            {ping.latencyMs} ms
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div style={{ marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                💡 <strong>How it works:</strong> With <strong>Automated Background Auto-Ping ENABLED</strong>, visiting your website automatically sends pings to Supabase on page load and every 5 minutes, preventing your free Supabase instance from pausing!
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
