<script setup>
import { computed } from 'vue'
import { useNavigation } from '@/composables/useNavigation'

const { currentSlide, totalSlides, goToSlide } = useNavigation()

const progress = computed(() => {
  if (totalSlides?.value <= 1) return 100
  return (currentSlide.value / (totalSlides?.value - 1)) * 100
})

const slideIndices = computed(() => {
  return Array.from({ length: totalSlides?.value }, (_, i) => i)
})
</script>

<template>
  <div
    class="navigation-progress fixed right-2 sm:right-auto sm:left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-20"
  >
    <!-- Dot indicators -->
    <div class="dots-container mt-4 flex flex-col items-center space-y-2">
      <button
        v-for="index in slideIndices"
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-all duration-300 shadow-sm"
        :class="
          index === currentSlide ? 'bg-purple-500 scale-125' : 'bg-gray-100 hover:bg-gray-200'
        "
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
  </div>
  <div class="navigation-progress fixed left-0 right-0 bottom-0 transform z-10">
    <!-- Progress bar -->
    <div class="progress-bar h-2 w-full relative">
      <div
        class="progress-fill bg-purple-600 absolute bottom-0 h-full transition-all duration-500"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </div>
</template>
