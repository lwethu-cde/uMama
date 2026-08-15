/**
 * types.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Shared TypeScript types used throughout the uMama app.
 *
 * There is no router and no backend: navigation and language are both
 * simple pieces of React state held in `App.tsx` and passed down as props
 * (see `Screen` / `Lang` below). Keeping the types here means every file
 * that needs them can import from one place instead of redefining them.
 */

/**
 * The five "pages" of the app. There's no URL routing — `App.tsx` just
 * conditionally renders a component based on which `Screen` is active.
 * 'welcome' is the onboarding/splash screen shown once at launch; the
 * other four correspond to the four BottomNav tabs.
 */
export type Screen = 'welcome' | 'home' | 'chat' | 'map' | 'profile'

/**
 * Supported UI languages. English, isiZulu, isiXhosa, and Afrikaans are
 * four of South Africa's official languages. Adding a new language means:
 *   1. Add its code here (e.g. 'st' for Sesotho)
 *   2. Add a matching translation block in `src/i18n/translations.ts`
 *   3. Add it to the `langs` array in `WelcomeScreen.tsx` and the
 *      `langLabels` map in `ProfileScreen.tsx`
 */
export type Lang = 'en' | 'zu' | 'xh' | 'af'

/**
 * A single language's set of translated UI strings. `Record<string, string>`
 * (rather than a strict key union) keeps things flexible, but it does mean
 * a typo in a translation key won't be caught by TypeScript — see the note
 * in `i18n/translations.ts` for how to tighten this if it becomes a problem.
 */
export type Translations = Record<string, string>
