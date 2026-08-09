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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header keepAliveStatus={keepAliveStatus} onTriggerPing={triggerPing} />
      
      <main style={{ flexGrow: 1 }}>
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
