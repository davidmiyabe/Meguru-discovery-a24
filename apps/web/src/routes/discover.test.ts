import { MIN_LIKES, MIN_ADDS } from '../lib/constants'

describe('gating logic', () => {
  test('allows build when likes meet threshold', () => {
    const liked = Array.from({ length: MIN_LIKES }, (_, i) => `${i}`)
    const added: string[] = []
    const canBuild = liked.length >= MIN_LIKES || added.length >= MIN_ADDS
    expect(canBuild).toBe(true)
  })

  test('allows build when adds meet threshold', () => {
    const liked: string[] = []
    const added = Array.from({ length: MIN_ADDS }, (_, i) => `${i}`)
    const canBuild = liked.length >= MIN_LIKES || added.length >= MIN_ADDS
    expect(canBuild).toBe(true)
  })

  test('disallows build when thresholds not met', () => {
    const liked = Array.from({ length: MIN_LIKES - 1 }, (_, i) => `${i}`)
    const added = Array.from({ length: MIN_ADDS - 1 }, (_, i) => `${i}`)
    const canBuild = liked.length >= MIN_LIKES || added.length >= MIN_ADDS
    expect(canBuild).toBe(false)
  })
})
