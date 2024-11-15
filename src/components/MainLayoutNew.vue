<script setup>
import { sites } from '@/utils/sites.js'
import { computed, onMounted, reactive, ref } from 'vue'
import { DIRECTION } from '@/utils/direction.js'
// import { handleNavigation } from '@/utils/navigationHandler.js'
// import { setupSlides } from '@/utils/setupSlides.js'
// import MainScreen from '@/components/MainScreen/MainScreen.vue'
import NavigationPanel from '@/components/NavigationPanel/NavigationPanel.vue'

const state = reactive({
  currentSlide: 0,
  slides: [],
  direction: DIRECTION.NEXT,
})

const mainRef = ref()
const slideRefs = ref([])
// const uniqueSlide1 = ref()
// const uniqueSlide2 = ref()

const isFirstSlide = computed(() => state.currentSlide === 0)
const isLastSlide = computed(() => state.currentSlide + 1 === sites.length)
// const transitionName = computed(() => )
// const isLastSlide = computed(() => state.currentSlide + 1 === state.slides.length)

onMounted(() => {
  // slideRefs.value = [uniqueSlide1.value, uniqueSlide2.value, ...slideRefs.value]
  // setupSlides(mainRef, slideRefs, state)
})
</script>

<template>
  <main
    class="main-container relative h-screen w-screen overflow-hidden bg-[#22283f]"
    ref="mainRef"
  >
    <!--    <section-->
    <!--      ref="uniqueSlide1"-->
    <!--      class="absolute left-0 top-0 flex flex-col w-full h-full bg-amber-200 justify-center items-center"-->
    <!--    >-->
    <!--      <MainScreen-->
    <!--        :is-first-slide="isFirstSlide"-->
    <!--        @handle-btn-down="handleNavigation(state, DIRECTION.NEXT)"-->
    <!--      />-->
    <!--    </section>-->
    <!--    <section-->
    <!--      ref="uniqueSlide2"-->
    <!--      class="absolute left-0 top-0 flex w-full h-full bg-amber-200 justify-center items-center"-->
    <!--    >-->
    <!--      <h1 class="text-7xl">secondary screen</h1>-->
    <!--    </section>-->
    <Transition :name="state.direction">
      <section
        :key="sites[state.currentSlide]"
        class="absolute left-0 top-0 flex w-full h-full bg-amber-300 justify-center items-center"
        ref="slideRefs"
      >
        <div class="text-6xl">
          {{ sites[state.currentSlide].number }} slide = {{ state.currentSlide + 1 }}
        </div>
        <div class="text-5xl">slides {{ state.slides.length }}</div>
      </section>
    </Transition>
    <!--    <section-->
    <!--      v-for="(item, key) in sites"-->
    <!--      :key="key"-->
    <!--      class="absolute left-0 top-0 flex w-full h-full bg-amber-300 justify-center items-center"-->
    <!--      ref="slideRefs"-->
    <!--    >-->
    <!--      <div class="text-6xl">{{ item.number }} slide = {{ state.currentSlide + 1 }}</div>-->
    <!--      <div class="text-5xl">slides {{ state.slides.length }}</div>-->
    <!--    </section>-->
  </main>
  <NavigationPanel :state="state" :is-last-slide="isLastSlide" :is-first-slide="isFirstSlide" />
</template>

<style scoped lang="scss">
.main-container {
  perspective: 122vh;
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
    opacity: 1;
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
    opacity: 1;
    transform: translateY(100%);
  }
  &-enter-to {
    opacity: 1;
    transform: translateY(0);
  }
  
  &-leave-from {
    opacity: 1;
    transform: translateY(0) rotateX(0);
  }
  &-leave-to {
    opacity: 0.6;
    transform: translateY(-100%) rotateX(70deg);
  }
}
</style>
