import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Leadership from './components/Leadership';
import MvpCalculator from './components/MvpCalculator';
import KeepAliveWidget from './components/KeepAliveWidget';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { sendKeepAlivePing } from './lib/supabase';

export default function App() {
  const [keepAliveStatus, setKeepAliveStatus] = useState(null);

  const triggerPing = async () => {
    const res = await sendKeepAlivePing();
    setKeepAliveStatus(res);
    return res;
  };

  useEffect(() => {
    // 1. Fire automated Keep-Alive ping on app mount / page load!
    triggerPing();

    // 2. Set background timer to send keep-alive pings every 5 minutes while page is open
    const intervalId = setInterval(() => {
      triggerPing();
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header keepAliveStatus={keepAliveStatus} onTriggerPing={triggerPing} />
      
      <main style={{ flexGrow: 1 }}>
        <Hero />
        <Services />
        <Leadership />
        <MvpCalculator />
        <KeepAliveWidget keepAliveStatus={keepAliveStatus} onTriggerPing={triggerPing} />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
