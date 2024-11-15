import { gsap } from 'gsap'
import { animationConfig } from '@/utils/animationConfig.js'
import { DIRECTION } from '@/utils/direction.js'

const setActive = (el, direction) => {
  if (!el) return
  gsap.fromTo(el, animationConfig.active[direction].from, animationConfig.active[direction].to)
}
const setInactive = (el, direction) => {
  if (!el) return
  gsap.to(el, animationConfig.inactive[direction])
}

export const handleNavigation = (state, direction) => {
  state.direction = direction;
  const nextSlideIndex =
    direction === DIRECTION.NEXT ? state.currentSlide + 1 : state.currentSlide - 1

  setInactive(state.slides[state.currentSlide], direction)
  setActive(state.slides[nextSlideIndex], direction)
  state.currentSlide = nextSlideIndex
}
