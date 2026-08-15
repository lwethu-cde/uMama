/**
 * screens/MapScreen.tsx
 * ─────────────────────────────────────────────────────────────────────────
 * The "Find Care" tab: a decorative map header with fixed pin positions,
 * plus a toggle between two lists — nearby clinics and free pad donation
 * points (see `data/careData.ts`).
 *
 * IMPORTANT: the "map" is a static background photo with hardcoded pin
 * `left`/`top` percentages — it is not a real map (no Google Maps /
 * Mapbox / geolocation integration), and the pin positions don't
 * correspond to the list items' actual coordinates.
 *
 * TO PERSONALISE / MAKE FUNCTIONAL:
 *  - Swap the placeholder image + fake pins for a real map SDK, driven by
 *    the user's actual location and the clinics/pads' real coordinates.
 *  - The arrow button on each list row (bottom-right svg) has no
 *    `onClick` — it likely should open directions or a detail view.
 */
import { useState } from 'react'
import { clinics, pads, type Clinic, type PadPoint } from '../data/careData'
import type { Translations } from '../types'

interface MapScreenProps {
  tr: Translations
}

export function MapScreen({ tr }: MapScreenProps) {
  const [tab, setTab] = useState<'clinics' | 'pads'>('clinics')

  return (
    <div className="flex flex-col h-full">
      {/* Map placeholder — decorative only, not a real map */}
      <div className="relative h-44 bg-gradient-to-br from-rose-100 via-pink-50 to-blush-100 overflow-hidden flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1529245019870-59b249281fd3?w=600&h=200&fit=crop&auto=format"
          alt="South African landscape"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        {/* Fake map pins — fixed positions, not tied to real coordinates */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {[
              { left: '30%', top: '35%', label: 'Clinic' },
              { left: '55%', top: '50%', label: 'Clinic' },
              { left: '70%', top: '28%', label: 'Pads' },
              { left: '20%', top: '60%', label: 'Pads' },
              { left: '45%', top: '25%', label: 'You' },
            ].map((pin, i) => (
              <div
                key={i}
                style={{ left: pin.left, top: pin.top }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md text-xs font-bold
                  ${
                    pin.label === 'You'
                      ? 'bg-blush-500 text-white ring-2 ring-white'
                      : pin.label === 'Clinic'
                        ? 'bg-white text-blush-600 border-2 border-blush-400'
                        : 'bg-pink-50 text-pink-600 border-2 border-pink-300'
                  }`}
                >
                  {pin.label === 'You' ? '●' : pin.label === 'Clinic' ? '✚' : '♥'}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-3 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow">
          Soweto, Gauteng
        </div>
      </div>

      {/* Tabs */}
      <div className="flex px-4 pt-3 gap-2 flex-shrink-0">
        <button
          onClick={() => setTab('clinics')}
          className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all
            ${tab === 'clinics' ? 'bg-blush-500 text-white shadow-md' : 'bg-white text-gray-500 border border-blush-200'}`}
        >
          ✚ {tr.nearbyClinics}
        </button>
        <button
          onClick={() => setTab('pads')}
          className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all
            ${tab === 'pads' ? 'bg-pink-400 text-white shadow-md' : 'bg-white text-gray-500 border border-blush-200'}`}
        >
          ♥ {tr.donationPoints}
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {(tab === 'clinics' ? clinics : pads).map((item, i) => (
          <div key={i} className="bg-white rounded-2xl p-3 border border-blush-100 shadow-sm flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg
              ${tab === 'clinics' ? 'bg-blush-50 text-blush-500' : 'bg-pink-50 text-pink-400'}`}
            >
              {tab === 'clinics' ? '🏥' : '🩸'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-gray-800 truncate">{item.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                {tab === 'clinics'
                  ? `${(item as Clinic).hours} · ${item.dist} ${tr.km}`
                  : `${(item as PadPoint).stock} · ${item.dist} ${tr.km}`}
              </div>
              <div className="flex gap-1 mt-1">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium
                  ${tab === 'pads' ? 'bg-green-100 text-green-700' : 'bg-blush-50 text-blush-600'}`}
                >
                  {tab === 'pads' ? `${tr.free}` : tr.open}
                </span>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full bg-blush-50 flex items-center justify-center text-blush-500 hover:bg-blush-100 transition-colors flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L13 7L7 13M13 7H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
