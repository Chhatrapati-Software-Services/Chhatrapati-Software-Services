import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Leadership from './components/Leadership';
import MvpCalculator from './components/MvpCalculator';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import { sendKeepAlivePing } from './lib/supabase';

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    Boolean(sessionStorage.getItem('CSS_ADMIN_AUTH'))
  );
  const [keepAliveStatus, setKeepAliveStatus] = useState(null);

  const triggerPing = async () => {
    const res = await sendKeepAlivePing();
    setKeepAliveStatus(res);
    return res;
  };

  useEffect(() => {
    // Listen for route changes via URL hash (#admin / #home)
    const handleHashChange = () => {
      setRoute(window.location.hash || '#home');
    };

    window.addEventListener('hashchange', handleHashChange);

    // 1. Fire automated Keep-Alive ping on app mount / page load!
    triggerPing();

    // 2. Set background timer to send keep-alive pings every 5 minutes while page is open
    const intervalId = setInterval(() => {
      triggerPing();
    }, 5 * 60 * 1000);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearInterval(intervalId);
    };
  }, []);

  const handleAdminLogout = () => {
    sessionStorage.removeItem('CSS_ADMIN_AUTH');
    setIsAdminAuthenticated(false);
  };

  // Render Admin Route if route is #admin
  if (route === '#admin') {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin 
          onLoginSuccess={() => setIsAdminAuthenticated(true)}
          onBackToSite={() => {
            window.location.hash = '#home';
          }}
        />
      );
    }

    return (
      <AdminDashboard 
        keepAliveStatus={keepAliveStatus}
        onTriggerPing={triggerPing}
        onLogout={handleAdminLogout}
        onBackToSite={() => {
          window.location.hash = '#home';
        }}
      />
    );
  }

  // Public Landing Page View
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
      <Header keepAliveStatus={keepAliveStatus} onTriggerPing={triggerPing} />
      
      {/* Centered Shri Ram Emblem with Unshaped Red, Black & Pink Radial Glow Aura (Mobile Responsive) */}
      <div style={{
        padding: '20px 0 4px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        maxWidth: '100%',
        overflow: 'hidden'
      }}>
        {/* Unshaped Soft Background Radial Glow Aura */}
        <div style={{
          position: 'absolute',
          width: 'min(280px, 85vw)',
          height: '130px',
          background: 'radial-gradient(ellipse at center, rgba(239, 68, 68, 0.45) 0%, rgba(236, 72, 153, 0.3) 40%, rgba(15, 23, 42, 0.25) 70%, transparent 100%)',
          filter: 'blur(28px)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        {/* Responsive Emblem Image */}
        <img 
          src="/shri_ram_emblem.png" 
          alt="Shri Ram Emblem" 
          style={{
            height: 'clamp(64px, 12vw, 92px)',
            width: 'auto',
            maxHeight: '92px',
            objectFit: 'contain',
            position: 'relative',
            zIndex: 1,
            filter: 'drop-shadow(0 4px 14px rgba(239, 68, 68, 0.6))'
          }}
        />
      </div>

      <main style={{ flexGrow: 1, width: '100%' }}>
        <Hero />
        <Services />
        <Leadership />
        <MvpCalculator />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
