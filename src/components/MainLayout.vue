<script setup>
import { sites } from '@/utils/sites.js'
import { computed, reactive } from 'vue'
import { DIRECTION } from '@/utils/direction.js'
import { handleNavigation } from '@/utils/navigationHandler.js'
import MainScreen from '@/components/MainScreen/MainScreen.vue'
import NavigationPanel from '@/components/NavigationPanel/NavigationPanel.vue'

const state = reactive({
  currentSlide: 0,
  direction: DIRECTION.NEXT,
})

const isFirstSlide = computed(() => state.currentSlide === 0)
const isLastSlide = computed(() => state.currentSlide + 1 === components.length)

const components = [
  {
    props: { isFirstSlide: isFirstSlide.value },
    template: MainScreen,
  },
  ...sites,
]
</script>

<template>
  <main class="main-container relative h-screen w-screen overflow-hidden bg-[#22283f]">
    <Transition :name="state.direction">
      <component
        :is="components[state.currentSlide].template"
        :key="state.currentSlide"
        v-bind="components[state.currentSlide].props"
        @handle-btn-down="handleNavigation(state, DIRECTION.NEXT)"
      />
    </Transition>
  </main>
  <NavigationPanel :state="state" :is-last-slide="isLastSlide" :is-first-slide="isFirstSlide" />
</template>

<style scoped lang="scss">
.main-container {
  perspective: 135vh;
}

.prev-enter-active,
.prev-leave-active,
.next-enter-active,
.next-leave-active {
  transition:
    opacity 1s ease,
    transform 1s ease;
  transform-origin: center bottom;
}

// DIRECTION.PREV
.prev {
  &-enter-from {
    opacity: 0;
    transform: translateY(-100%) rotateX(70deg);
  }
  &-enter-to {
    transform: translateY(0) rotateX(0);
  }

  &-leave-from {
    transform: translateY(0);
  }
  &-leave-to {
    transform: translateY(100%);
  }
}

// DIRECTION.NEXT
.next {
  &-enter-from {
    transform: translateY(100%);
  }
  &-enter-to {
    transform: translateY(0);
  }

  &-leave-from {
    transform: translateY(0) rotateX(0);
  }
  &-leave-to {
    opacity: 0;
    transform: translateY(-100%) rotateX(70deg);
  }
}
</style>
