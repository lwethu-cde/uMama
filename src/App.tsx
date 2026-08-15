/**
 * App.tsx
 * ─────────────────────────────────────────────────────────────────────────
 * Root component. Owns the two pieces of state that drive the whole app:
 *
 *   - `lang`   — the active UI language, looked up in `translations` to
 *                produce `tr`, which is passed down to every screen/
 *                component as a prop (see `i18n/translations.ts`).
 *   - `screen` — which of the 5 "pages" is currently showing. There is no
 *                router; navigating is just calling `setScreen(...)`
 *                (see `components/BottomNav.tsx` and `WelcomeScreen`'s
 *                `onStart`).
 *
 * Layout-wise, everything renders inside a fixed-size "phone frame" div
 * (390x844, roughly an iPhone 14 viewport) with a fake status bar on top —
 * this is a design-prototype convention carried over from Figma, not a
 * real mobile app shell. If this ever ships as an actual responsive web
 * app, that frame is the first thing to remove/rework.
 *
 * FILE MAP (see each file's own header comment for more detail):
 *   types.ts                      - Screen / Lang / Translations types
 *   i18n/translations.ts          - all UI copy, per language
 *   data/*.ts                     - mock data (cycle days, clinics, articles, chat)
 *   components/UMamaIcon.tsx      - shared "uMama" wordmark icon
 *   components/Header.tsx         - top bar (all screens except welcome)
 *   components/BottomNav.tsx      - 4-tab bottom navigation
 *   components/CycleCalendar.tsx  - calendar card on the Home screen
 *   screens/WelcomeScreen.tsx     - onboarding + language picker
 *   screens/HomeScreen.tsx        - Home tab
 *   screens/ChatScreen.tsx        - uMama AI tab (canned responses only)
 *   screens/MapScreen.tsx         - Find Care tab (clinics / pad points)
 *   screens/ProfileScreen.tsx     - Me tab (profile + settings)
 *
 * TO PERSONALISE: `name="Naledi"` below is the most visible hardcoded
 * placeholder — see `screens/HomeScreen.tsx` and `screens/ProfileScreen.tsx`
 * for where that would need to connect to real user data.
 */
import { useState } from 'react'
import { Header } from './components/Header'
import { BottomNav } from './components/BottomNav'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { HomeScreen } from './screens/HomeScreen'
import { ChatScreen } from './screens/ChatScreen'
import { MapScreen } from './screens/MapScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { translations } from './i18n/translations'
import type { Lang, Screen } from './types'

export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [screen, setScreen] = useState<Screen>('welcome')
  const tr = translations[lang]

  return (
    <div
      className="min-h-screen bg-blush-100 flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #fce7ed 0%, #fdf2f5 50%, #fce7ed 100%)' }}
    >
      {/* Phone frame */}
      <div
        className="relative w-[390px] h-[844px] rounded-[44px] bg-white shadow-2xl overflow-hidden border-4 border-gray-200"
        style={{ boxShadow: '0 40px 80px rgba(216, 27, 96, 0.15), 0 8px 24px rgba(0,0,0,0.1)' }}
      >
        {/* Status bar */}
        <div className="bg-white px-8 py-2 flex justify-between items-center text-xs text-gray-600 font-semibold flex-shrink-0">
          <span>9:41</span>
          <div className="w-28 h-5 bg-black rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-1" />
          <div className="flex gap-1 items-center">
            <span>📶</span>
            <span>🔋</span>
          </div>
        </div>

        {screen === 'welcome' ? (
          <div className="h-full flex flex-col" style={{ height: 'calc(100% - 32px)' }}>
            <WelcomeScreen onStart={() => setScreen('home')} lang={lang} setLang={setLang} />
          </div>
        ) : (
          <div className="flex flex-col" style={{ height: 'calc(100% - 32px)' }}>
            <Header screen={screen} tr={tr} />
            <div className="flex-1 overflow-hidden">
              {screen === 'home' && <HomeScreen tr={tr} name="Naledi" />}
              {screen === 'chat' && <ChatScreen tr={tr} />}
              {screen === 'map' && <MapScreen tr={tr} />}
              {screen === 'profile' && <ProfileScreen tr={tr} lang={lang} setLang={setLang} />}
            </div>
            <BottomNav screen={screen} setScreen={setScreen} tr={tr} />
          </div>
        )}
      </div>

      {/* App description below phone */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <div style={{ fontFamily: 'Fraunces, serif' }} className="text-sm text-blush-600 font-semibold opacity-70">
          uMama · Reproductive Health Companion · South Africa
        </div>
      </div>
    </div>
  )
}
