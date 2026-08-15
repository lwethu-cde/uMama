/**
 * data/cycleData.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Mock data for the 28-day cycle calendar shown on the Home screen
 * (see `components/CycleCalendar.tsx`).
 *
 * This is entirely hardcoded — there is no real cycle-tracking logic or
 * user-entered period data anywhere in the app yet. `CycleDay.type` drives
 * which colour dot each day renders as.
 *
 * TO PERSONALISE: replace this static array with cycle days computed from
 * a real start date + cycle length (e.g. from `ProfileScreen`'s "Cycle
 * Length" / "Period Length" fields), or fetched from user-entered data.
 */

export type CycleDayType = 'period' | 'normal' | 'fertile' | 'ovulation' | 'today' | 'upcoming'

export interface CycleDay {
  day: number
  type: CycleDayType
}

export const cycleDays: CycleDay[] = [
  { day: 1, type: 'period' }, { day: 2, type: 'period' }, { day: 3, type: 'period' },
  { day: 4, type: 'period' }, { day: 5, type: 'period' }, { day: 6, type: 'normal' },
  { day: 7, type: 'normal' }, { day: 8, type: 'normal' }, { day: 9, type: 'normal' },
  { day: 10, type: 'normal' }, { day: 11, type: 'normal' }, { day: 12, type: 'fertile' },
  { day: 13, type: 'fertile' }, { day: 14, type: 'ovulation' }, { day: 15, type: 'fertile' },
  { day: 16, type: 'fertile' }, { day: 17, type: 'normal' }, { day: 18, type: 'normal' },
  { day: 19, type: 'normal' }, { day: 20, type: 'normal' }, { day: 21, type: 'normal' },
  { day: 22, type: 'normal' }, { day: 23, type: 'normal' }, { day: 24, type: 'today' },
  { day: 25, type: 'normal' }, { day: 26, type: 'normal' }, { day: 27, type: 'normal' },
  { day: 28, type: 'upcoming' },
]
