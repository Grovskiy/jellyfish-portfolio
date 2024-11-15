import { gsap } from 'gsap'

export const setupSlides = (mainRef, slideRefs, state) => {
  state.slides = gsap.utils.toArray(slideRefs.value)
  if (!state.slides.length) {
    console.warn('No slides found')
    return
  }
  gsap.set(slideRefs.value, {
    autoAlpha: 0,
  })
  gsap.set(state.slides[state.currentSlide], {
    autoAlpha: 1,
  })

  gsap.defaults({ ease: 'easeInCubic' })
}
