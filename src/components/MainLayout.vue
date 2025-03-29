<script setup>
import { sites } from '@/utils/sites.js'
import { DIRECTION } from '@/data/direction.js'
import MainScreen from '@/components/MainScreen/MainScreen.vue'
import NavigationPanel from '@/components/NavigationPanel/NavigationPanel.vue'
import NavigationProgress from '@/components/NavigationPanel/NavigationProgress.vue'

import { useNavigation } from '@/composables/useNavigation'
const { currentSlide, direction, isFirstSlide, isLastSlide, navigate, setTotalSlides } =
  useNavigation()

const components = [
  {
    props: { isFirstSlide: isFirstSlide.value },
    template: MainScreen,
  },
  ...sites,
]
setTotalSlides(components.length)
</script>

<template>
  <main class="main-container relative w-screen overflow-hidden bg-[#22283f]">
    <Transition :name="direction">
      <component
        :is="components[currentSlide].template"
        :key="currentSlide"
        v-bind="components[currentSlide].props"
        @handle-btn-down="navigate(DIRECTION.NEXT)"
      />
    </Transition>
  </main>
  <NavigationProgress />
  <NavigationPanel :is-last-slide="isLastSlide" :is-first-slide="isFirstSlide" />
</template>

<style scoped lang="scss">
.main-container {
  perspective: 135vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
