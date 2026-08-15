# Plan: Replace icon with "uMama" text

## Context
The app icon currently renders a `MomDaughterIcon` SVG cartoon. The user wants to drop all imagery and simply show the text **"uMama"** as the icon mark everywhere the icon appears.

## Changes to `src/App.tsx`

1. **Delete** the `MomDaughterIcon` function entirely.
2. Replace every `<MomDaughterIcon size={N} />` usage with a styled `<span>` (or `<div>`) showing **"uMama"** in Fraunces serif, sized proportionally to the context:

| Location | Current | Replacement |
|---|---|---|
| Welcome screen hero icon (96 px box) | `<MomDaughterIcon size={96} />` | `"uMama"` in ~18px Fraunces bold, white, centered in the rounded box |
| Header (32 px box) | `<MomDaughterIcon size={32} />` | `"uM"` abbreviation or `"uMama"` at ~9px, centered |
| Chat bot avatar (28 px circle) | `<MomDaughterIcon size={28} />` | `"uM"` at ~8px |
| Home banner corner (72 px, opacity 30%) | `<MomDaughterIcon size={72} />` | `"uMama"` at ~14px, white, opacity decoration |
| Profile avatar (72 px circle) | `<MomDaughterIcon size={72} />` | `"uMama"` at ~13px, white, centered |

3. Keep all wrapping `<div>` containers (rounded corners, border, background colors) exactly as-is — only swap the inner content.

## Verification
- Preview panel should show the welcome screen with a pink rounded box containing "uMama" text as the icon.
- Navigating to Home, Chat, Map, Profile screens should show the text mark in the header and relevant spots with no broken references.
