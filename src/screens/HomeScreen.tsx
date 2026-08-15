/**
 * screens/HomeScreen.tsx
 * ─────────────────────────────────────────────────────────────────────────
 * The "Home" tab: greeting banner, the cycle calendar, a 2x2 grid of quick
 * actions, and a list of health articles. This is the default screen the
 * user lands on right after `WelcomeScreen`.
 *
 * TO PERSONALISE:
 *  - `name` is passed in as a prop from `App.tsx` and currently hardcoded
 *    to "Naledi" there — wire it up to real user/profile data instead.
 *  - The "Quick Actions" buttons (Track Symptoms, Health Articles, Find
 *    Clinics, Free Pads) have no `onClick` yet — most naturally they'd
 *    call `setScreen('map')` / open a symptom tracker, etc. `setScreen`
 *    isn't currently passed down to this component, so you'd need to add
 *    it as a prop the same way `BottomNav` receives it.
 *  - Article titles/tags are English-only (see `data/articlesData.ts`)
 *    and cards have no tap handler — there's no article detail view yet.
 */
import { CycleCalendar } from '../components/CycleCalendar'
import { UMamaIcon } from '../components/UMamaIcon'
import { articles } from '../data/articlesData'
import type { Translations } from '../types'

interface HomeScreenProps {
  tr: Translations
  /** Display name shown in the greeting banner, e.g. "Naledi". */
  name: string
}

export function HomeScreen({ tr, name }: HomeScreenProps) {
  return (
    <div className="overflow-y-auto h-full px-4 py-4 space-y-4">
      {/* Greeting banner */}
      <div className="bg-gradient-to-r from-blush-500 to-pink-400 rounded-2xl p-4 text-white relative overflow-hidden">
        <div className="absolute right-3 bottom-2 opacity-20">
          <UMamaIcon size={72} />
        </div>
        <div className="text-xs font-semibold uppercase tracking-wide opacity-80">{tr.goodMorning}</div>
        <div style={{ fontFamily: 'Fraunces, serif' }} className="text-xl font-semibold mt-0.5">
          {name} 👋
        </div>
        <div className="text-xs mt-1 opacity-85 max-w-[70%] leading-relaxed">{tr.tagline}</div>
      </div>

      {/* Cycle tracker */}
      <CycleCalendar tr={tr} />

      {/* Quick actions */}
      <div>
        <div style={{ fontFamily: 'Fraunces, serif' }} className="text-sm font-semibold text-gray-700 mb-2">
          Quick Actions
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: tr.trackSymptoms, icon: '🩺', color: 'bg-blush-50 border-blush-200', text: 'text-blush-600' },
            { label: tr.readArticles, icon: '📖', color: 'bg-pink-50 border-pink-200', text: 'text-pink-600' },
            { label: tr.findClinics, icon: '🏥', color: 'bg-rose-50 border-rose-200', text: 'text-rose-600' },
            { label: tr.freePads, icon: '❤️', color: 'bg-purple-50 border-purple-200', text: 'text-purple-600' },
          ].map((a, i) => (
            <button
              key={i}
              className={`flex flex-col items-center py-3 px-2 rounded-2xl border ${a.color} ${a.text} hover:opacity-80 transition-opacity text-center gap-1`}
            >
              <span className="text-xl">{a.icon}</span>
              <span className="text-xs font-semibold leading-tight">{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div>
        <div style={{ fontFamily: 'Fraunces, serif' }} className="text-sm font-semibold text-gray-700 mb-2">
          {tr.articles}
        </div>
        <div className="space-y-2">
          {articles.map((a, i) => (
            <div key={i} className={`${a.color} rounded-2xl p-3 flex items-center gap-3 border border-white shadow-sm`}>
              <div className="text-2xl">{a.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800 leading-snug">{a.title}</div>
                <div className="text-xs text-gray-400 mt-0.5">{a.tag}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-gray-400 flex-shrink-0">
                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
