import { MIN_LIKES, MIN_ADDS } from '../lib/constants'

describe('gating logic', () => {
  test('allows build when likes meet threshold', () => {
    const liked = Array(MIN_LIKES).fill('x')
    const added: string[] = []
    const canBuild = liked.length >= MIN_LIKES || added.length >= MIN_ADDS
    expect(canBuild).toBe(true)
  })

  test('allows build when adds meet threshold', () => {
    const liked: string[] = []
    const added = Array(MIN_ADDS).fill('x')
    const canBuild = liked.length >= MIN_LIKES || added.length >= MIN_ADDS
    expect(canBuild).toBe(true)
  })

  test('disallows build when thresholds not met', () => {
    const liked = Array(MIN_LIKES - 1).fill('x')
    const added = Array(MIN_ADDS - 1).fill('x')
    const canBuild = liked.length >= MIN_LIKES || added.length >= MIN_ADDS
    expect(canBuild).toBe(false)
  })
})
