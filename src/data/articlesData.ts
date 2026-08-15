/**
 * data/articlesData.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Mock "For You" health article cards shown on the Home screen.
 * Titles are English-only regardless of the selected app language (see
 * the note in `screens/HomeScreen.tsx`), and there's no article detail
 * page yet — tapping a card currently does nothing.
 *
 * TO PERSONALISE: pull real articles from a CMS, translate titles per
 * `Lang`, and wire the card's onClick to a real article view.
 */

export interface Article {
  title: string
  tag: string
  emoji: string
  color: string
}

export const articles: Article[] = [
  { title: 'Understanding your menstrual cycle', tag: 'Education', emoji: '📖', color: 'bg-blush-50' },
  { title: 'Managing period pain naturally', tag: 'Wellness', emoji: '🌿', color: 'bg-green-50' },
  { title: 'What is endometriosis?', tag: 'Conditions', emoji: '🔬', color: 'bg-purple-50' },
]
