import { ref, readonly, computed } from 'vue'
import { DIRECTION } from '@/data/direction'

const currentSlide = ref(0)
const direction = ref(DIRECTION.NEXT)
const totalSlides = ref(0)

const isFirstSlide = computed(() => currentSlide.value === 0)
const isLastSlide = computed(() => currentSlide.value === totalSlides.value - 1)

export function useNavigation() {
  const navigate = (navigateDirection) => {
    direction.value = navigateDirection
    if (navigateDirection === DIRECTION.NEXT && !isLastSlide.value) {
      currentSlide.value++
    } else if (navigateDirection === DIRECTION.PREV && !isFirstSlide.value) {
      currentSlide.value--
    }
  }

  const goToSlide = (index) => {
    if (index >= 0 && index < totalSlides.value) {
      direction.value = index > currentSlide.value ? DIRECTION.NEXT : DIRECTION.PREV
      currentSlide.value = index
    }
  }

  const setTotalSlides = (count) => {
    totalSlides.value = count
  }

  const reset = () => {
    currentSlide.value = 0
    direction.value = DIRECTION.NEXT
  }

  return {
    currentSlide: readonly(currentSlide),
    direction: readonly(direction),
    isFirstSlide,
    isLastSlide,
    totalSlides,
    navigate,
    goToSlide,
    setTotalSlides,
    reset,
  }
}
