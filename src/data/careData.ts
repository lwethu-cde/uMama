/**
 * data/careData.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Mock data for the "Find Care" tab (see `screens/MapScreen.tsx`): clinics
 * on one list, free sanitary-pad donation points on the other.
 *
 * Distances (`dist`, in km) are static strings, not computed from the
 * user's real location — the map itself is a decorative gradient with
 * fixed pin positions, not a real map/geolocation integration.
 *
 * TO PERSONALISE: swap this for data from a real backend/API (e.g. a
 * clinics directory or a maps provider), and compute `dist` from the
 * user's actual coordinates.
 */

export interface Clinic {
  name: string
  dist: string
  hours: string
  type: 'clinic'
}

export interface PadPoint {
  name: string
  dist: string
  stock: string
  type: 'pads'
}

export const clinics: Clinic[] = [
  { name: 'Soweto Community Clinic', dist: '1.2', hours: '07:00–17:00', type: 'clinic' },
  { name: 'Baragwanath Health Centre', dist: '2.8', hours: '24 hours', type: 'clinic' },
  { name: "Ubuntu Women's Health", dist: '3.5', hours: '08:00–16:00', type: 'clinic' },
]

export const pads: PadPoint[] = [
  { name: 'Nomvula Community Hall', dist: '0.4', stock: 'In stock', type: 'pads' },
  { name: "St. Peter's Church Outreach", dist: '1.1', stock: 'In stock', type: 'pads' },
  { name: 'Diepkloof Library', dist: '2.3', stock: 'Low stock', type: 'pads' },
]
