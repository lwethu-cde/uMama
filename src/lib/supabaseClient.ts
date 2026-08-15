/**
 * lib/supabaseClient.ts
 * ─────────────────────────────────────────────────────────────────────────
 * One shared Supabase client for the whole app. Import `supabase` from
 * here wherever you need it (chat, auth, cycle data, etc.) instead of
 * creating new clients — Supabase docs recommend a single instance.
 *
 * Reads the project URL + anon (public) key from Vite env vars. These
 * MUST be prefixed with `VITE_` or Vite won't expose them to the browser.
 * Create a `.env.local` file (see `.env.example`) with:
 *
 *   VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
 *   VITE_SUPABASE_ANON_KEY=eyJ...
 *
 * The anon key is safe to ship in the frontend bundle — it's the public
 * key, protected by Row Level Security (RLS) policies on the Supabase
 * side, NOT a secret. Never put the "service_role" key here.
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Fails loudly in dev instead of silently breaking every screen that
  // touches Supabase later.
  console.error(
    'Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Copy .env.example to .env.local and fill in your project values.',
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Ensures there's a logged-in session before calling anything that needs
 * auth (like the `chat` Edge Function). uMama doesn't have a login screen
 * yet, so this uses Supabase's anonymous sign-in — it gives every device
 * a stable, private user id without asking for an email/password.
 *
 * Call this once, early (e.g. in App.tsx on mount), and await it before
 * rendering screens that need it.
 */
export async function ensureSession() {
  const { data } = await supabase.auth.getSession()
  if (!data.session) {
    const { error } = await supabase.auth.signInAnonymously()
    if (error) console.error('Anonymous sign-in failed:', error.message)
  }
}
