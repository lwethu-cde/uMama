# uMama — Architecture Overview

uMama is a **Figma Make** project: a React + Vite + Tailwind CSS prototype
of a reproductive health companion app for South African users. It has
**no backend** — all data (clinics, articles, chat replies, cycle
calendar) is hardcoded in the frontend.

## Stack

| Layer | Tech |
|---|---|
| UI framework | React 19 (function components + hooks only, no class components) |
| Language | TypeScript (`.tsx`) |
| Styling | Tailwind CSS v4, via `@tailwindcss/vite` (utility classes; custom theme/colors in `src/index.css`) |
| Fonts | Fraunces (headings/display) + Nunito (body), loaded via Google Fonts in `src/index.css` |
| Build tool | Vite 8 |
| State | Local `useState` only — no Redux/Zustand/Context, no router, no persistence |

## Navigation model

There is no URL routing. `App.tsx` holds a `screen: Screen` state value
(`'welcome' | 'home' | 'chat' | 'map' | 'profile'`) and conditionally
renders the matching screen component. "Navigating" = calling `setScreen(...)`,
most often from `BottomNav`.

## Localisation model

`App.tsx` holds a `lang: Lang` state value (`'en' | 'zu' | 'xh' | 'af'`).
`src/i18n/translations.ts` maps each language to a flat dictionary of UI
strings. `App.tsx` looks up `tr = translations[lang]` once and passes it
down as a `tr` prop to every screen/component that needs text. There's no
translation library — just object lookups.

## Folder structure

```
src/
├── App.tsx                 # Root: owns lang/screen state, renders phone-frame shell
├── main.tsx                # React entrypoint (mounts <App /> into #root)
├── index.css                # Tailwind import, font imports, custom color theme
├── types.ts                 # Screen, Lang, Translations shared types
├── i18n/
│   └── translations.ts     # All UI copy, per language
├── data/                    # Hardcoded mock data (see each file's header comment)
│   ├── cycleData.ts        # 28-day cycle calendar dots
│   ├── careData.ts         # Clinics + pad donation points
│   ├── articlesData.ts     # "For You" health articles
│   └── chatData.ts         # Seed chat transcript
├── components/               # Reusable pieces shared across screens
│   ├── UMamaIcon.tsx        # "uMama" wordmark logo
│   ├── Header.tsx            # Top bar (all screens except welcome)
│   ├── BottomNav.tsx        # 4-tab bottom nav
│   └── CycleCalendar.tsx    # Calendar card (used on Home)
└── screens/                  # One file per "page"
    ├── WelcomeScreen.tsx    # Onboarding + language picker
    ├── HomeScreen.tsx       # Home tab
    ├── ChatScreen.tsx       # uMama AI tab (canned replies — no real AI)
    ├── MapScreen.tsx        # Find Care tab (clinics / pads, fake map)
    └── ProfileScreen.tsx    # Me tab (profile + settings)
```

This mirrors the original single-file `src/App.tsx` (740 lines) 1:1 —
nothing was rewritten or reworked, only relocated, so behaviour is
unchanged. Each new file has a header comment explaining its role and,
where relevant, a "TO PERSONALISE" note pointing out what's currently
hardcoded/non-functional and would need real data or wiring to become a
production feature.

## Known gaps (things that look real but aren't wired up)

- **Chat is not AI-powered.** Every message you send gets the same fixed
  reply (`screens/ChatScreen.tsx`).
- **The map is a static image**, not a real map/geolocation integration
  (`screens/MapScreen.tsx`).
- **The cycle calendar is hardcoded**, not computed from a real start
  date or user input (`data/cycleData.ts`, `components/CycleCalendar.tsx`).
- **Profile data (name, age, cycle stats) is hardcoded** — there's no
  account/auth system (`screens/ProfileScreen.tsx`).
- Several buttons (settings rows, quick actions, notification/settings
  icons, article cards, list arrow buttons) have no `onClick` yet.

## Where to start for common changes

- **Change wording / add a language** → `src/i18n/translations.ts`
- **Change colors/fonts** → `src/index.css` (`@theme` block)
- **Change a screen's layout** → the matching file in `src/screens/`
- **Add a new tab/screen** → add to `Screen` in `types.ts`, add a case in
  `App.tsx`, add a tab entry in `components/BottomNav.tsx`
- **Replace mock data with real data** → the relevant file in `src/data/`
