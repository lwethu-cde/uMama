/**
 * screens/ProfileScreen.tsx
 * ─────────────────────────────────────────────────────────────────────────
 * The "Me" tab: avatar card with hardcoded user stats, a language
 * switcher (mirrors the one on `WelcomeScreen`), and a settings list.
 *
 * IMPORTANT: "Naledi Dlamini", age 28, cycle length 28d, period length 5d,
 * and "Member since January 2026" are all hardcoded — there's no real
 * user profile/account system behind this screen.
 *
 * TO PERSONALISE / MAKE FUNCTIONAL:
 *  - Replace the hardcoded name/stats with real user profile data (this
 *    would also let `HomeScreen`'s greeting and `CycleCalendar`'s cycle
 *    length reflect the same real data instead of separate hardcoded
 *    values).
 *  - The settings rows (Notifications, Privacy, Help & Support, Emergency
 *    Contacts) have no `onClick` — they need real destination
 *    screens/modals.
 */
import { UMamaIcon } from '../components/UMamaIcon'
import type { Lang, Translations } from '../types'

interface ProfileScreenProps {
  tr: Translations
  lang: Lang
  setLang: (l: Lang) => void
}

export function ProfileScreen({ tr, lang, setLang }: ProfileScreenProps) {
  const langLabels: Record<Lang, string> = { en: 'English', zu: 'isiZulu', xh: 'isiXhosa', af: 'Afrikaans' }

  return (
    <div className="overflow-y-auto h-full px-4 py-4 space-y-4">
      {/* Avatar */}
      <div className="bg-gradient-to-br from-blush-400 to-pink-500 rounded-2xl p-5 flex flex-col items-center text-white">
        <div className="w-20 h-20 rounded-full border-4 border-white/40 mb-3 bg-white/20 flex items-center justify-center">
          <UMamaIcon size={72} />
        </div>
        <div style={{ fontFamily: 'Fraunces, serif' }} className="text-lg font-semibold">
          Naledi Dlamini
        </div>
        <div className="text-xs opacity-80 mt-0.5">Member since January 2026</div>
        <div className="flex gap-4 mt-3">
          {[
            { label: tr.age, value: '28' },
            { label: tr.cycleLength, value: '28d' },
            { label: tr.periodLength, value: '5d' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-base font-bold">{s.value}</div>
              <div className="text-xs opacity-75">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Language selector */}
      <div className="bg-white rounded-2xl p-4 border border-blush-100 shadow-sm">
        <div style={{ fontFamily: 'Fraunces, serif' }} className="text-sm font-semibold text-gray-700 mb-3">
          {tr.language}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(Object.entries(langLabels) as [Lang, string][]).map(([code, label]) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`py-2.5 px-3 rounded-xl text-sm font-semibold border transition-all
                ${lang === code ? 'bg-blush-500 text-white border-blush-500 shadow-md' : 'bg-white text-gray-600 border-blush-200 hover:border-blush-400'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl border border-blush-100 shadow-sm overflow-hidden">
        {[
          { icon: '🔔', label: tr.notifications },
          { icon: '🔒', label: tr.privacy },
          { icon: '❓', label: 'Help & Support' },
          { icon: '📞', label: 'Emergency Contacts' },
        ].map((item, i) => (
          <button
            key={i}
            className="w-full flex items-center gap-3 px-4 py-3 border-b border-blush-50 last:border-0 hover:bg-blush-50 transition-colors text-left"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm text-gray-700 font-medium flex-1">{item.label}</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gray-300">
              <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
