/**
 * components/CycleCalendar.tsx
 * ─────────────────────────────────────────────────────────────────────────
 * The mini "August 2026" calendar card at the top of the Home screen.
 * Renders 28 hardcoded days (see `data/cycleData.ts`) as colour-coded dots
 * (period / fertile / ovulation / today / upcoming) and lets the user tap
 * a day to "select" it — selection is purely visual (a scale + shadow),
 * it doesn't change any other data on screen.
 *
 * The "Cycle Day 24" and "next period in 4 days" stat tiles below the grid
 * are also hardcoded, not derived from `selected` or `cycleDays` — see the
 * TODO-style note below.
 *
 * TO PERSONALISE:
 *  - Generate `cycleDays` from a real start date + user-entered cycle
 *    length instead of a static array (see `data/cycleData.ts`).
 *  - Make the "24" / "4" stat tiles react to the actually-selected day.
 *  - The month label ("August 2026") is hardcoded; derive it from `Date`.
 */
import { useState } from 'react'
import { cycleDays, type CycleDayType } from '../data/cycleData'
import type { Translations } from '../types'

interface CycleCalendarProps {
  tr: Translations
}

/** Maps a day's type to the Tailwind classes for its dot. */
function dotColor(type: CycleDayType): string {
  switch (type) {
    case 'period':
      return 'bg-blush-500 text-white'
    case 'fertile':
      return 'bg-green-200 text-green-800'
    case 'ovulation':
      return 'bg-emerald-400 text-white'
    case 'today':
      return 'bg-blush-400 text-white ring-2 ring-blush-300 ring-offset-1'
    case 'upcoming':
      return 'bg-blush-100 text-blush-600 ring-1 ring-dashed ring-blush-300'
    default:
      return 'bg-white text-gray-500'
  }
}

export function CycleCalendar({ tr }: CycleCalendarProps) {
  // Which day number is currently tapped/highlighted. Starts on 24 to
  // match the hardcoded "today" marker in `cycleDays`.
  const [selected, setSelected] = useState(24)

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-blush-100">
      <div className="flex justify-between items-center mb-3">
        <span style={{ fontFamily: 'Fraunces, serif' }} className="text-base font-semibold text-gray-800">
          August 2026
        </span>
        <div className="flex gap-2 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blush-500 inline-block" /> {tr.fertile && 'Period'}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Ovulation
          </span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className="text-center text-xs text-gray-400 font-semibold pb-1">
            {d}
          </div>
        ))}
        {/* offset for Aug starting on Saturday index 6 */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`e${i}`} />
        ))}
        {cycleDays.map(({ day, type }) => (
          <button
            key={day}
            onClick={() => setSelected(day)}
            className={`aspect-square rounded-full text-xs font-semibold flex items-center justify-center transition-all
              ${selected === day ? 'scale-110 shadow-md ' : ''}
              ${dotColor(type)}`}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        {/* NOTE: these two values are hardcoded, not derived from `selected` */}
        <div className="flex-1 bg-blush-50 rounded-xl p-2 text-center">
          <div className="text-lg font-bold text-blush-600" style={{ fontFamily: 'Fraunces, serif' }}>
            24
          </div>
          <div className="text-xs text-gray-500">{tr.cycleDay}</div>
        </div>
        <div className="flex-1 bg-green-50 rounded-xl p-2 text-center">
          <div className="text-lg font-bold text-green-600" style={{ fontFamily: 'Fraunces, serif' }}>
            4
          </div>
          <div className="text-xs text-gray-500">{tr.nextPeriod}</div>
        </div>
      </div>
    </div>
  )
}
