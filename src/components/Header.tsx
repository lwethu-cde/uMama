/**
 * components/Header.tsx
 * ─────────────────────────────────────────────────────────────────────────
 * The top bar shown on every screen except `WelcomeScreen`: the app icon
 * + a screen-specific title on the left, and two decorative buttons
 * (notifications 🔔, settings ⚙️) on the right.
 *
 * TO PERSONALISE: the 🔔 and ⚙️ buttons currently have no `onClick` — wire
 * them up to a real notifications panel / settings screen when those
 * exist. `titles` needs a new entry any time a new `Screen` is added.
 */
import { UMamaIcon } from './UMamaIcon'
import type { Screen, Translations } from '../types'

interface HeaderProps {
  screen: Screen
  tr: Translations
}

export function Header({ screen, tr }: HeaderProps) {
  const titles: Record<Screen, string> = {
    welcome: '',
    home: 'uMama',
    chat: tr.chat,
    map: tr.map,
    profile: tr.myProfile,
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-blush-100 flex-shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl border-2 border-blush-200 bg-blush-500 flex items-center justify-center overflow-hidden">
          <UMamaIcon size={32} />
        </div>
        <span style={{ fontFamily: 'Fraunces, serif' }} className="text-base font-bold text-gray-800">
          {titles[screen]}
        </span>
      </div>
      <div className="flex gap-2">
        <button className="w-8 h-8 rounded-full bg-blush-50 flex items-center justify-center text-blush-500 hover:bg-blush-100 transition-colors">
          🔔
        </button>
        <button className="w-8 h-8 rounded-full bg-blush-50 flex items-center justify-center text-blush-500 hover:bg-blush-100 transition-colors">
          ⚙️
        </button>
      </div>
    </div>
  )
}
