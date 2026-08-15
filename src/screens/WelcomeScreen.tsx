/**
 * screens/WelcomeScreen.tsx
 * ─────────────────────────────────────────────────────────────────────────
 * The onboarding/splash screen — the very first thing a user sees. Shown
 * only while `App.tsx`'s `screen` state equals `'welcome'`; there's no way
 * to navigate back to it once the user taps "Get Started" (short of
 * refreshing the app, since state isn't persisted anywhere).
 *
 * Lets the user pick a UI language (the same four options as
 * `ProfileScreen`'s language picker — if you add a language in one place,
 * add it in both) and confirms the choice by highlighting the selected
 * button. Language selection here is live: `setLang` updates `App.tsx`'s
 * shared `lang` state immediately, so `tr.tagline` / `tr.subtitle` update
 * as soon as a language is tapped, before "Get Started" is even pressed.
 *
 * TO PERSONALISE: the three feature bullets ("Track your menstrual
 * cycle", etc.) are hardcoded English-only strings, not translated —
 * consider moving them into `i18n/translations.ts` if full localisation
 * matters here.
 */
import { UMamaIcon } from '../components/UMamaIcon'
import { translations } from '../i18n/translations'
import type { Lang } from '../types'

interface WelcomeScreenProps {
  /** Called when the user taps "Get Started" — advances App.tsx's `screen` to 'home'. */
  onStart: () => void
  lang: Lang
  setLang: (l: Lang) => void
}

export function WelcomeScreen({ onStart, lang, setLang }: WelcomeScreenProps) {
  const tr = translations[lang]
  const langs: { code: Lang; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'Hello' },
    { code: 'zu', label: 'isiZulu', native: 'Sawubona' },
    { code: 'xh', label: 'isiXhosa', native: 'Molo' },
    { code: 'af', label: 'Afrikaans', native: 'Hallo' },
  ]

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-blush-50 via-white to-blush-50">
      {/* Top decoration */}
      <div className="bg-gradient-to-br from-blush-500 via-pink-400 to-blush-400 pt-10 pb-16 px-6 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -left-4 bottom-4 w-24 h-24 rounded-full bg-white/10" />
        {/* App icon */}
        <div className="flex flex-col items-center mt-2">
          <div className="w-24 h-24 rounded-3xl shadow-xl mb-4 border-4 border-white/40 bg-white/20 flex items-center justify-center">
            <UMamaIcon size={96} fontSize={20} />
          </div>
          <div style={{ fontFamily: 'Fraunces, serif' }} className="text-3xl font-bold text-white tracking-tight">
            uMama
          </div>
          <div className="text-white/80 text-xs mt-1 font-medium tracking-widest uppercase">
            Reproductive Health Companion
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="-mt-8 px-0">
        <svg viewBox="0 0 390 40" className="w-full" fill="white">
          <path d="M0 40 C130 0 260 40 390 20 L390 40 Z" />
        </svg>
      </div>

      <div className="flex-1 px-6 -mt-2 space-y-5">
        <div className="text-center">
          <div style={{ fontFamily: 'Fraunces, serif' }} className="text-xl font-semibold text-gray-800 leading-snug">
            {tr.tagline}
          </div>
          <div className="text-sm text-gray-500 mt-2 leading-relaxed">{tr.subtitle}</div>
        </div>

        {/* Language selector */}
        <div>
          <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2 text-center">
            {tr.selectLang}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {langs.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`py-3 rounded-2xl border text-sm font-semibold flex flex-col items-center gap-0.5 transition-all
                  ${lang === l.code ? 'bg-blush-500 text-white border-blush-500 shadow-md scale-105' : 'bg-white text-gray-700 border-blush-200 hover:border-blush-400'}`}
              >
                <span>{l.native}</span>
                <span className={`text-xs ${lang === l.code ? 'text-white/75' : 'text-gray-400'}`}>{l.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          {[
            { icon: '🌸', text: 'Track your menstrual cycle' },
            { icon: '💬', text: 'AI health guidance in your language' },
            { icon: '📍', text: 'Find clinics & free pads nearby' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-blush-50/60 rounded-xl px-3 py-2.5">
              <span className="text-base">{f.icon}</span>
              <span className="text-sm text-gray-600 font-medium">{f.text}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-blush-500 to-pink-400 text-white py-4 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl hover:opacity-95 transition-all active:scale-[0.98]"
        >
          {tr.getStarted} →
        </button>
      </div>
    </div>
  )
}
