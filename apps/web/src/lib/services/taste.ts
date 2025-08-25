import { SUGGESTIONS } from './suggestions'

export type TasteProfile = string[]

export function buildTasteProfile(liked: string[], added: string[]): TasteProfile {
  const counts: Record<string, number> = {}
  const all = [...liked, ...added]
  all.forEach((id) => {
    const suggestion = SUGGESTIONS.find((s) => String(s.id) === id)
    if (suggestion) {
      suggestion.categories.forEach((cat) => {
        counts[cat] = (counts[cat] || 0) + 1
      })
    }
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([cat]) => cat)
}
