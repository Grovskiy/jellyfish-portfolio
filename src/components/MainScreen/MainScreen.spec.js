import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MainScreen from '@/components/MainScreen/MainScreen.vue'

describe('MainScreen', () => {
  it('emits handleBtnDown event when button is clicked', async () => {
    const wrapper = mount(MainScreen, {
      props: {
        isFirstSlide: true,
      },
      global: {
        // stubs: ['IconJellyfishUse', 'IconJellyfishSymbol', 'MainScreenCol'],
        stubs: {
          SlideSection: {
            template: '<div><slot></slot></div>',
            name: 'SlideSection',
          },
          IconJellyfishUse: true,
          IconJellyfishSymbol: true,
          MainScreenCol: {
            template: '<div><slot></slot></div>',
            name: 'MainScreenCol',
          },
        },
      },
    })

    await wrapper.find('.js-main-down').trigger('click')
    expect(wrapper.emitted('handleBtnDown')).toBeTruthy()
    expect(wrapper.emitted('handleBtnDown').length).toBe(1)
  })
})
