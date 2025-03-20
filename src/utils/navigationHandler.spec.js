import { describe, it, expect } from 'vitest'
import { handleNavigation } from '@/utils/navigationHandler'
import { DIRECTION } from '@/data/direction'

describe('handleNavigation', () => {
  it('increments currentSlide when direction is NEXT', () => {
    const state = { currentSlide: 1, direction: '' }
    handleNavigation(state, DIRECTION.NEXT)
    expect(state.currentSlide).toBe(2)
    expect(state.direction).toBe(DIRECTION.NEXT)
  })

  it('decrements currentSlide when direction is PREV', () => {
    const state = { currentSlide: 2, direction: '' }
    handleNavigation(state, DIRECTION.PREV)
    expect(state.currentSlide).toBe(1)
    expect(state.direction).toBe(DIRECTION.PREV)
  })
})
