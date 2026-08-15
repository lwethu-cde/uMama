/**
 * data/chatData.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Seed transcript for `screens/ChatScreen.tsx`.
 *
 * The first message's `text` is intentionally empty — `ChatScreen`
 * overwrites it with `tr.chatIntro` at render time so the greeting is
 * translated, while the sample user/bot exchange below it stays in
 * English regardless of the selected language. Any message the user
 * sends after that always gets the same canned bot reply — there is no
 * real AI backend wired up (see `ChatScreen.send()`).
 *
 * TO PERSONALISE: replace `send()`'s hardcoded reply with a call to a
 * real chat/LLM API, and consider translating the sample exchange below
 * (or dropping it) so first-time users in other languages don't see
 * English placeholder content.
 */

export interface ChatMessage {
  from: 'bot' | 'user'
  text: string
}

export const initialMessages: ChatMessage[] = [
  { from: 'bot', text: '' }, // replaced with tr.chatIntro at render time
  { from: 'user', text: 'I have been experiencing lower abdominal cramps and bloating for the past 2 days.' },
  {
    from: 'bot',
    text:
      "Thank you for sharing that with me. Lower abdominal cramps and bloating are very common premenstrual symptoms (PMS). Based on your cycle, your period is due in about 4 days, which aligns with what you're feeling. Staying hydrated, gentle exercise, and a warm compress can help ease the discomfort. Would you like me to find a nearby clinic or share more about PMS management?",
  },
]
