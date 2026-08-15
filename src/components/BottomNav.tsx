/**
 * components/BottomNav.tsx
 * ─────────────────────────────────────────────────────────────────────────
 * The 4-tab bottom navigation bar (Home / uMama AI / Find Care / Me),
 * shown on every screen except `WelcomeScreen`.
 *
 * This is the app's entire navigation system — there's no router, so
 * "navigating" just means calling `setScreen(tab.key)` on the shared
 * `screen` state owned by `App.tsx`. The active tab is highlighted via
 * `screen === tab.key` and gets a small underline indicator.
 *
 * TO PERSONALISE: add/remove tabs by editing the `tabs` array — each
 * entry just needs a `Screen` key, an emoji icon, and a translated label.
 * If you add a new tab, remember to also add a matching case in
 * `App.tsx`'s screen switch and (if it needs one) a new `Screen` value
 * in `types.ts`.
 */
import type { Screen, Translations } from '../types'

interface BottomNavProps {
  screen: Screen
  setScreen: (s: Screen) => void
  tr: Translations
}

export function BottomNav({ screen, setScreen, tr }: BottomNavProps) {
  const tabs: { key: Screen; icon: string; label: string }[] = [
    { key: 'home', icon: '🏠', label: tr.home },
    { key: 'chat', icon: '💬', label: tr.chat },
    { key: 'map', icon: '📍', label: tr.map },
    { key: 'profile', icon: '👤', label: tr.profile },
  ]

  return (
    <div className="flex border-t border-blush-100 bg-white px-2 py-1 flex-shrink-0">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => setScreen(tab.key)}
          className={`flex-1 flex flex-col items-center py-1.5 gap-0.5 rounded-xl transition-all
            ${screen === tab.key ? 'text-blush-600' : 'text-gray-400'}`}
        >
          <span className={`text-lg transition-transform ${screen === tab.key ? 'scale-110' : ''}`}>{tab.icon}</span>
          <span className={`text-xs font-semibold ${screen === tab.key ? 'text-blush-600' : 'text-gray-400'}`}>
            {tab.label}
          </span>
          {screen === tab.key && <div className="w-4 h-0.5 rounded-full bg-blush-500" />}
        </button>
      ))}
    </div>
  )
}
