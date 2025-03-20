import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavigationPanel from '@/components/NavigationPanel/NavigationPanel.vue'
import { DIRECTION } from '@/data/direction'

describe('NavigationPanel', () => {
  it('renders properly when not on first slide', () => {
    const wrapper = mount(NavigationPanel, {
      props: {
        isFirstSlide: false,
        isLastSlide: false,
        state: { currentSlide: 1, direction: DIRECTION.NEXT },
      },
    })

    expect(wrapper.find('.js-controls').exists()).toBe(true)
    expect(wrapper.find('.js-next').exists()).toBe(true)
    expect(wrapper.find('.js-prev').exists()).toBe(true)
  })

  it('hides when on first slide', () => {
    const wrapper = mount(NavigationPanel, {
      props: {
        isFirstSlide: true,
        isLastSlide: false,
        state: { currentSlide: 0, direction: DIRECTION.NEXT },
      },
    })

    expect(wrapper.find('.js-controls').isVisible()).toBe(false)
  })

  it('hides next button when on last slide', () => {
    const wrapper = mount(NavigationPanel, {
      props: {
        isFirstSlide: false,
        isLastSlide: true,
        state: { currentSlide: 12, direction: DIRECTION.NEXT },
      },
    })

    expect(wrapper.find('.js-next').isVisible()).toBe(false)
  })
})
