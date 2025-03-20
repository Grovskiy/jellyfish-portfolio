<script setup>
import { handleNavigation } from '@/utils/navigationHandler.js'
import { DIRECTION } from '@/data/direction.js'

defineProps({
  isFirstSlide: {
    type: Boolean,
    required: true,
  },
  isLastSlide: {
    type: Boolean,
    required: true,
  },
  state: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <Transition>
    <div
      class="js-controls flex justify-center z-10 fixed bottom-0 right-0 left-0 h-[70px] overflow-hidden"
      v-show="!isFirstSlide"
    >
      <div class="relative sm:w-3/5">
        <button
          @click.prevent="handleNavigation(state, DIRECTION.PREV)"
          class="js-prev flex w-[70px] h-[70px] items-center justify-center bg-[#9391d9] hover:opacity-80 absolute right-0 bottom-0 transition-opacity duration-300"
          aria-label="prev section"
          :disabled="isFirstSlide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="26" width="16">
            <path
              d="M15.647 8.348 8.524.403a.673.673 0 0 0-1.018 0L.383 8.35c-.28.312-.233.583.048.895.282.314.688.314.97 0l5.895-6.527V25.05c0 .443.322.803.72.803.397 0 .72-.36.72-.803V2.716l5.895 6.528c.282.313.663.313.945 0 .28-.313.352-.584.071-.896z"
              clip-rule="evenodd"
              fill="#fff"
              fill-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div class="relative sm:w-2/5">
        <Transition>
          <button
            v-show="!isLastSlide"
            @click.prevent="handleNavigation(state, DIRECTION.NEXT)"
            class="js-next inactive flex w-[70px] h-[70px] items-center justify-center bg-[#9bd9ec] hover:opacity-80 rotate-180 absolute left-0 bottom-0 transition-opacity duration-300"
            aria-label="next section"
            :disabled="isFirstSlide || isLastSlide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="26" width="16">
              <path
                d="M15.647 8.348 8.524.403a.673.673 0 0 0-1.018 0L.383 8.35c-.28.312-.233.583.048.895.282.314.688.314.97 0l5.895-6.527V25.05c0 .443.322.803.72.803.397 0 .72-.36.72-.803V2.716l5.895 6.528c.282.313.663.313.945 0 .28-.313.352-.584.071-.896z"
                clip-rule="evenodd"
                fill="#9391d9"
                fill-rule="evenodd"
              />
            </svg>
          </button>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
