/**
 * supabase/functions/chat/index.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Deno Edge Function that stands between the app and whichever LLM
 * provider is currently configured. The app NEVER calls an LLM provider
 * directly — it always calls this function, so:
 *
 *   1. Your provider API key never ships in the frontend bundle.
 *   2. Swapping providers (free Gemini → paid Claude/OpenAI later) is a
 *      one-line env var change, not a rewrite.
 *   3. You can add safety rules (e.g. always suggesting a real clinic for
 *      urgent symptoms) in ONE place instead of duplicating them per screen.
 *
 * ── Deploy ──────────────────────────────────────────────────────────────
 *   supabase functions deploy chat
 *
 * ── Required secrets (set with `supabase secrets set KEY=value`) ────────
 *   LLM_PROVIDER      "gemini" (default/free) | "openai" | "anthropic"
 *   GEMINI_API_KEY     required if LLM_PROVIDER=gemini
 *   OPENAI_API_KEY      required if LLM_PROVIDER=openai
 *   ANTHROPIC_API_KEY   required if LLM_PROVIDER=anthropic
 *
 * ── Request body (sent by ChatScreen.tsx) ────────────────────────────────
 *   { messages: { from: 'user' | 'bot'; text: string }[], lang?: string }
 *
 * ── Response ──────────────────────────────────────────────────────────
 *   { reply: string }
 */
import { createClient } from 'jsr:@supabase/supabase-js@2'

// ── CORS ────────────────────────────────────────────────────────────────
// Edge Functions run on a different origin to your app, so the browser
// needs explicit permission (CORS) before it'll let the request through.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // TODO: lock this down to your real domain before launch
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ── System prompt ─────────────────────────────────────────────────────
// This is the ONE place that shapes how the assistant behaves. Edit this,
// not the frontend, to change tone/safety rules.
const SYSTEM_PROMPT = `You are uMama's in-app health assistant, supporting users in South Africa with
reproductive health questions (periods, cramps, cycle irregularities, contraception, pregnancy
basics, general wellbeing). Rules:
- Be warm, brief, and non-judgmental. Avoid clinical jargon.
- You are NOT a doctor. Never give a diagnosis. Never recommend a specific medication or dosage.
- For anything that sounds urgent (heavy/prolonged bleeding, severe pain, signs of pregnancy
  complications, thoughts of self-harm), gently but clearly recommend contacting a healthcare
  professional or clinic now, and mention the app's "Find Care" tab.
- Keep answers short (2-4 sentences) unless the user asks for more detail.
- If you don't know something, say so rather than guessing.`

interface ChatMessage {
  from: 'user' | 'bot'
  text: string
}

Deno.serve(async req => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Auth check: requires the caller to send the Supabase anon/user JWT
    // (the supabase-js client does this automatically). This stops random
    // people on the internet from running up your LLM bill by hitting the
    // function URL directly.
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } },
    )
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      // If you haven't wired up Supabase Auth yet (e.g. anonymous sign-in),
      // this will always fail. See the setup notes below for the one-line
      // fix (supabase.auth.signInAnonymously()) on the frontend.
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const { messages } = (await req.json()) as { messages: ChatMessage[] }
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const provider = Deno.env.get('LLM_PROVIDER') ?? 'gemini'
    const reply = await callProvider(provider, messages)

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Something went wrong. Please try again.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

// ── Provider router ───────────────────────────────────────────────────
// Add a new `case` here to support another provider. Every branch takes
// the same (provider-agnostic) messages array and returns a plain string.
async function callProvider(provider: string, messages: ChatMessage[]): Promise<string> {
  switch (provider) {
    case 'gemini':
      return callGemini(messages)
    case 'openai':
      return callOpenAI(messages)
    case 'anthropic':
      return callAnthropic(messages)
    default:
      throw new Error(`Unknown LLM_PROVIDER: ${provider}`)
  }
}

// ── Gemini (free tier — good default while building/testing) ────────────
async function callGemini(messages: ChatMessage[]): Promise<string> {
  const apiKey = Deno.env.get('GEMINI_API_KEY')
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set')

  const contents = messages.map(m => ({
    role: m.from === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }],
  }))

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { maxOutputTokens: 300, temperature: 0.6 },
      }),
    },
  )
  if (!res.ok) throw new Error(`Gemini error ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't come up with a reply."
}

// ── OpenAI (swap-in once you're ready to leave the free tier) ──────────
async function callOpenAI(messages: ChatMessage[]): Promise<string> {
  const apiKey = Deno.env.get('OPENAI_API_KEY')
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set')

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text })),
      ],
      max_tokens: 300,
    }),
  })
  if (!res.ok) throw new Error(`OpenAI error ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? "Sorry, I couldn't come up with a reply."
}

// ── Anthropic (swap-in alternative) ─────────────────────────────────────
async function callAnthropic(messages: ChatMessage[]): Promise<string> {
  const apiKey = Deno.env.get('ANTHROPIC_API_KEY')
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set')

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: messages.map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text })),
    }),
  })
  if (!res.ok) throw new Error(`Anthropic error ${res.status}: ${await res.text()}`)
  const data = await res.json()
  return data.content?.[0]?.text ?? "Sorry, I couldn't come up with a reply."
}
