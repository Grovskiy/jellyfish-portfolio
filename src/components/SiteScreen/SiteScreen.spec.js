import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SiteScreen from '@/components/SiteScreen/SiteScreen.vue'

vi.mock('@/utils/basePath', () => ({
  basePath: vi.fn(() => '/test-path/'),
}))

describe('SiteScreen computed properties', () => {
  it('formats link correctly', () => {
    const wrapper = mount(SiteScreen, {
      props: {
        id: 1,
        name: 'Test Site',
        link: 'test-link',
        description: 'Test description',
      },
      global: {
        stubs: ['SlideSection', 'BaseButton'],
      },
    })

    expect(wrapper.vm.linkFormatted).toBe('/test-path/sites/test-link/index.html')
  })

  it('formats preview correctly', () => {
    const wrapper = mount(SiteScreen, {
      props: {
        id: 1,
        name: 'Test Site',
        link: 'test-link',
        description: 'Test description',
      },
      global: {
        stubs: ['SlideSection', 'BaseButton'],
      },
    })

    expect(wrapper.vm.previewFormatted).toBe('/test-path/sites/test-link/preview.png')
  })
})

describe('SiteScreen rendering', () => {
  it('formats ID with leading zero when ID is less than 10', () => {
    const wrapper = mount(SiteScreen, {
      props: {
        id: 9,
        name: 'Test Site',
        link: 'test-link',
        description: 'Test description',
      },
      global: {
        stubs: ['BaseButton'],
      },
    })

    expect(wrapper.find('.section__number').text()).toBe('09')
  })

  it('renders ID without leading zero when ID is 10 or greater', () => {
    const wrapper = mount(SiteScreen, {
      props: {
        id: 10,
        name: 'Test Site',
        link: 'test-link',
        description: 'Test description',
      },
      global: {
        stubs: ['BaseButton'],
      },
    })

    expect(wrapper.find('.section__number').text()).toBe('10')
  })

  it('shows description when provided', () => {
    const description = 'Test description'
    const wrapper = mount(SiteScreen, {
      props: {
        id: 1,
        name: 'Test Site',
        link: 'test-link',
        description,
      },
      global: {
        stubs: ['BaseButton'],
      },
    })

    expect(wrapper.find('.section__text').text()).toBe(description)
  })

  it('shows "Hello" as fallback when description is not provided', () => {
    const wrapper = mount(SiteScreen, {
      props: {
        id: 1,
        name: 'Test Site',
        link: 'test-link',
      },
      global: {
        stubs: ['BaseButton'],
      },
    })

    expect(wrapper.find('.section__text').text()).toBe('Hello')
  })
})
