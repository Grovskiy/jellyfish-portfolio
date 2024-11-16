import { defineAsyncComponent } from 'vue'

const template = defineAsyncComponent(() => import('@/components/SiteScreen/SiteScreen.vue'))

export const sites = [
  {
    props: {
      id: 1,
      number: '01',
    },
    template,
  },
  {
    props: {
      id: 2,
      number: '02',
    },
    template,
  },
  {
    props: {
      id: 3,
      number: '03',
    },
    template,
  },
  // Add other sections as needed
]
