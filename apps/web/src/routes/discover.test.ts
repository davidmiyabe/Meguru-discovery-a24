import { MIN_LIKES, MIN_ADDS } from '../lib/constants'

describe('gating logic', () => {
  test('allows build when likes meet threshold', () => {
    const likes = MIN_LIKES
    const adds = 0
    const canBuild = likes >= MIN_LIKES || adds >= MIN_ADDS
    expect(canBuild).toBe(true)
  })

  test('allows build when adds meet threshold', () => {
    const likes = 0
    const adds = MIN_ADDS
    const canBuild = likes >= MIN_LIKES || adds >= MIN_ADDS
    expect(canBuild).toBe(true)
  })

  test('disallows build when thresholds not met', () => {
    const likes = MIN_LIKES - 1
    const adds = MIN_ADDS - 1
    const canBuild = likes >= MIN_LIKES || adds >= MIN_ADDS
    expect(canBuild).toBe(false)
  })
})
