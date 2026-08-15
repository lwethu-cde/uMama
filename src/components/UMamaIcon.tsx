/**
 * components/UMamaIcon.tsx
 * ─────────────────────────────────────────────────────────────────────────
 * The app's "logo mark" — currently just the wordmark "uMama" set in the
 * Fraunces serif font, used everywhere the app icon appears (welcome
 * screen, header, chat avatar, home banner watermark, profile avatar).
 *
 * There's a saved-but-unexecuted plan in `plans/okay-just-let-the-serene-
 * moore.md` describing exactly this text-based icon, suggesting this is
 * the intended long-term direction rather than a placeholder.
 *
 * `size` controls the diameter of the circular/rounded box this is
 * typically placed inside (the box itself lives in the parent), and
 * `fontSize` is derived from it unless explicitly overridden — smaller
 * boxes get proportionally smaller text so "uMama" doesn't overflow.
 *
 * TO PERSONALISE: swap this for a real SVG/image logo by replacing the
 * <span> body — every call site already wraps it in a sized container, so
 * no caller changes should be needed as long as the new icon also accepts
 * `size` and renders within that box.
 */

interface UMamaIconProps {
  /** Diameter (px) of the container this icon is placed in. Default 80. */
  size?: number
  /** Text colour. Default white, since the icon usually sits on a pink background. */
  color?: string
  /** Explicit font size (px). Defaults to ~28% of `size` if omitted. */
  fontSize?: number
}

export function UMamaIcon({ size = 80, color = '#fff', fontSize: fontSizeProp }: UMamaIconProps) {
  const fontSize = fontSizeProp ?? Math.round(size * 0.28)
  return (
    <span
      style={{
        fontFamily: 'Fraunces, serif',
        fontSize,
        fontWeight: 700,
        color,
        lineHeight: 1,
        letterSpacing: '-0.02em',
        userSelect: 'none',
      }}
    >
      uMama
    </span>
  )
}
