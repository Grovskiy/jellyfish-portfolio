import { DIRECTION } from '@/data/direction.js'

export const handleNavigation = (state, direction) => {
  state.direction = direction
  state.currentSlide =
    direction === DIRECTION.NEXT ? state.currentSlide + 1 : state.currentSlide - 1
}
