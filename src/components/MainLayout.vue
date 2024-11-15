<script setup>
import { sites } from '@/utils/sites.js'
import { computed, onMounted, reactive, ref } from 'vue'
import { DIRECTION } from '@/utils/direction.js'
import { handleNavigation } from '@/utils/navigationHandler.js'
import { setupSlides } from '@/utils/setupSlides.js'
import MainScreen from '@/components/MainScreen/MainScreen.vue'
import NavigationPanel from '@/components/NavigationPanel/NavigationPanel.vue'

const state = reactive({
  currentSlide: 0,
  slides: [],
})

const mainRef = ref()
const slideRefs = ref([])
const uniqueSlide1 = ref()
const uniqueSlide2 = ref()

const isFirstSlide = computed(() => state.currentSlide === 0)
const isLastSlide = computed(() => state.currentSlide + 1 === state.slides.length)

onMounted(() => {
  slideRefs.value = [uniqueSlide1.value, uniqueSlide2.value, ...slideRefs.value]
  setupSlides(mainRef, slideRefs, state)
})
</script>

<template>
  <main
    class="main-container relative h-screen w-screen overflow-hidden bg-[#22283f]"
    ref="mainRef"
  >
        <section
          ref="uniqueSlide1"
          class="absolute left-0 top-0 flex flex-col w-full h-full bg-amber-200 justify-center items-center"
        >
          <MainScreen
            :is-first-slide="isFirstSlide"
            @handle-btn-down="handleNavigation(state, DIRECTION.NEXT)"
          />
        </section>
        <section
          ref="uniqueSlide2"
          class="absolute left-0 top-0 flex w-full h-full bg-amber-200 justify-center items-center"
        >
          <h1 class="text-7xl">secondary screen</h1>
        </section>
        <section
          v-for="(item, key) in sites"
          :key="key"
          class="absolute left-0 top-0 flex w-full h-full bg-amber-300 justify-center items-center"
          ref="slideRefs"
        >
          <div class="text-6xl">{{ item.number }} slide = {{ state.currentSlide + 1 }}</div>
          <div class="text-5xl">slides {{ state.slides.length }}</div>
        </section>
  </main>
  <NavigationPanel :state="state" :is-last-slide="isLastSlide" :is-first-slide="isFirstSlide" />
</template>

<style scoped>
.main-container {
  perspective: 122vh;
}
</style>
