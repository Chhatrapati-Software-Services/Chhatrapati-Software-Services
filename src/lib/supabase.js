import { createClient } from '@supabase/supabase-js';

// Storage keys
const STORAGE_URL_KEY = 'CSS_SUPABASE_URL';
const STORAGE_ANON_KEY = 'CSS_SUPABASE_ANON_KEY';
const STORAGE_LAST_PING_KEY = 'CSS_LAST_PING_TIMESTAMP';
const STORAGE_PING_HISTORY = 'CSS_PING_HISTORY';
const STORAGE_LOCAL_INQUIRIES = 'CSS_LOCAL_INQUIRIES';

// Helper to get active credentials
export function getSupabaseCredentials() {
  const customUrl = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_URL_KEY) : null;
  const customKey = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_ANON_KEY) : null;

  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const url = customUrl || envUrl || '';
  const anonKey = customKey || envKey || '';

  const isConfigured = Boolean(url && anonKey && url.startsWith('http'));

  return { url, anonKey, isConfigured, isCustom: Boolean(customUrl && customKey) };
}

// Global active client instance
let supabaseInstance = null;

export function getSupabaseClient() {
  const { url, anonKey, isConfigured } = getSupabaseCredentials();
  if (!isConfigured) {
    return null;
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(url, anonKey, {
      auth: { persistSession: false }
    });
  }

  return supabaseInstance;
}

export function saveSupabaseCredentials(url, anonKey) {
  if (typeof window !== 'undefined') {
    if (url && anonKey) {
      localStorage.setItem(STORAGE_URL_KEY, url.trim());
      localStorage.setItem(STORAGE_ANON_KEY, anonKey.trim());
    } else {
      localStorage.removeItem(STORAGE_URL_KEY);
      localStorage.removeItem(STORAGE_ANON_KEY);
    }
    supabaseInstance = null; // reset client instance
  }
}

// -------------------------------------------------------------
// AUTOMATED SUPABASE KEEP-ALIVE PING ENGINE
// -------------------------------------------------------------
export async function sendKeepAlivePing() {
  const { isConfigured } = getSupabaseCredentials();
  const startTime = performance.now();
  const timestamp = new Date().toISOString();

  if (!isConfigured) {
    // Record mock ping for demonstration mode if not configured yet
    const pingResult = {
      success: false,
      timestamp,
      latencyMs: 0,
      error: 'Supabase URL & Anon Key not configured yet. Click "Configure Supabase" to add your project credentials.',
      isDemo: true
    };
    savePingToHistory(pingResult);
    return pingResult;
  }

  const client = getSupabaseClient();
  if (!client) {
    return { success: false, timestamp, latencyMs: 0, error: 'Client initialization failed.' };
  }

  try {
    // We attempt a lightweight keep-alive request to Supabase
    // First try pinging 'supabase_keep_alive' table
    let { error } = await client.from('supabase_keep_alive').upsert(
      { id: 'keep_alive_status', last_ping: timestamp, status: 'active' },
      { onConflict: 'id' }
    );

    // If table doesn't exist yet, fallback to a light RPC / auth query
    if (error && error.code === '42P01') { // relation does not exist
      const fallback = await client.from('_dummy_ping').select('count', { count: 'exact', head: true });
      error = fallback.error && fallback.error.code !== 'PGRST116' && fallback.error.code !== '42P01' ? fallback.error : null;
    }

    const endTime = performance.now();
    const latencyMs = Math.round(endTime - startTime);

    const isSuccess = !error || error.code === '42P01'; // Even if table missing, HTTP 200/REST response reached Supabase database!

    const result = {
      success: isSuccess,
      timestamp,
      latencyMs,
      error: isSuccess ? null : (error?.message || 'Database ping warning'),
      isDemo: false
    };

    savePingToHistory(result);
    localStorage.setItem(STORAGE_LAST_PING_KEY, timestamp);

    return result;
  } catch (err) {
    const endTime = performance.now();
    const result = {
      success: false,
      timestamp,
      latencyMs: Math.round(endTime - startTime),
      error: err.message || 'Network error reaching Supabase',
      isDemo: false
    };
    savePingToHistory(result);
    return result;
  }
}

function savePingToHistory(pingResult) {
  if (typeof window === 'undefined') return;
  try {
    const history = JSON.parse(localStorage.getItem(STORAGE_PING_HISTORY) || '[]');
    history.unshift(pingResult);
    const trimmed = history.slice(0, 15); // keep last 15 pings
    localStorage.setItem(STORAGE_PING_HISTORY, JSON.stringify(trimmed));
  } catch {
    // ignore local storage parse errors
  }
}

export function getPingHistory() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_PING_HISTORY) || '[]');
  } catch {
    return [];
  }
}

// -------------------------------------------------------------
// INQUIRY SUBMISSION (FRONTEND ONLY -> SUPABASE)
// -------------------------------------------------------------
export async function submitContactInquiry(inquiryData) {
  const timestamp = new Date().toISOString();
  const fullPayload = {
    ...inquiryData,
    created_at: timestamp
  };

  // Always back up locally first so leads are never lost!
  saveLocalInquiry(fullPayload);

  const client = getSupabaseClient();
  if (!client) {
    return {
      success: true,
      mode: 'local_fallback',
      message: 'Inquiry saved locally! Connect your Supabase project in the header to sync directly to your database.'
    };
  }

  try {
    const { error } = await client.from('contact_inquiries').insert([fullPayload]);
    if (error) {
      console.warn('Supabase insert warning:', error);
      return {
        success: true,
        mode: 'local_saved',
        message: 'Inquiry saved successfully! (Supabase notice: ' + error.message + ')'
      };
    }

    return {
      success: true,
      mode: 'supabase_direct',
      message: 'Inquiry sent directly to Supabase database!'
    };
  } catch (err) {
    return {
      success: true,
      mode: 'local_fallback',
      message: 'Inquiry saved locally! (Error: ' + err.message + ')'
    };
  }
}

function saveLocalInquiry(inquiry) {
  if (typeof window === 'undefined') return;
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_LOCAL_INQUIRIES) || '[]');
    existing.unshift(inquiry);
    localStorage.setItem(STORAGE_LOCAL_INQUIRIES, JSON.stringify(existing));
  } catch {
    // fallback ignore
  }
}

export function getLocalInquiries() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_LOCAL_INQUIRIES) || '[]');
  } catch {
    return [];
  }
}

// -------------------------------------------------------------
// SQL GENERATOR FOR EASY 1-CLICK SETUP
// -------------------------------------------------------------
export function getSqlSetupScript() {
  return `-- Copy and run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create table for automated Supabase Keep-Alive engine
CREATE TABLE IF NOT EXISTS public.supabase_keep_alive (
  id TEXT PRIMARY KEY,
  last_ping TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'active'
);

-- Enable RLS & allow public insert/update for keep alive pings
ALTER TABLE public.supabase_keep_alive ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public keep alive pings" ON public.supabase_keep_alive
  FOR ALL USING (true) WITH CHECK (true);

-- 2. Create table for Contact Inquiries / Lead generation
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service_type TEXT,
  budget TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS & allow public insert for inquiries
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public lead submission" ON public.contact_inquiries
  FOR INSERT WITH CHECK (true);
`;
}
