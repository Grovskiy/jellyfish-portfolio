<script setup>
import IconJellyfishUse from '@/components/icons/IconJellyfishUse.vue'
import IconJellyfishSymbol from '@/components/icons/IconJellyfishSymbol.vue'
import MainScreenCol from '@/components/MainScreen/MainScreenCol.vue'
import SlideSection from '@/components/SlideSection.vue'
const emit = defineEmits(['handleBtnDown', 'submit'])

defineProps({
  isFirstSlide: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <SlideSection>
    <IconJellyfishSymbol class="absolute" />
    <div
      class="absolute top-0 left-0 flex w-full h-full bg-gradient-to-r from-[#cde0ef] to-white"
      :class="{ animated: isFirstSlide }"
    >
      <MainScreenCol>
        <IconJellyfishUse class="fish fish__one-big" />
        <IconJellyfishUse class="fish fish__one-small" />
      </MainScreenCol>
      <MainScreenCol>
        <IconJellyfishUse class="fish fish__two-small" />
        <IconJellyfishUse class="fish fish__two-big" />
      </MainScreenCol>
      <MainScreenCol>
        <IconJellyfishUse class="fish fish__three-big" />
      </MainScreenCol>
      <MainScreenCol>
        <IconJellyfishUse class="fish fish__four-big" />
      </MainScreenCol>
      <MainScreenCol>
        <IconJellyfishUse class="fish fish__five-big" />
      </MainScreenCol>
      <MainScreenCol>
        <IconJellyfishUse class="fish fish__six-big" />
        <IconJellyfishUse class="fish fish__six-small" />
      </MainScreenCol>
    </div>

    <h1 class="main-title text-white z-10 uppercase font-bold text-shadow-custom">Grovskiy</h1>
    <h2 class="sub-title text-[#0b2349] z-10 text-gradient">Vue Front-end developer</h2>

    <button
      @click="emit('handleBtnDown')"
      class="absolute z-5 bottom-8 left-[calc(50%-2%)] flex w-14 h-14 items-center justify-center border border-[#9391d9] rounded-full hover:opacity-60 transition-opacity duration-300 animate-bounce"
      aria-label="Next"
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="26" width="16" class="rotate-180">
        <path
          d="M15.647 8.348 8.524.403a.673.673 0 0 0-1.018 0L.383 8.35c-.28.312-.233.583.048.895.282.314.688.314.97 0l5.895-6.527V25.05c0 .443.322.803.72.803.397 0 .72-.36.72-.803V2.716l5.895 6.528c.282.313.663.313.945 0 .28-.313.352-.584.071-.896z"
          clip-rule="evenodd"
          fill="#9391d9"
          fill-rule="evenodd"
        />
      </svg>
    </button>
  </SlideSection>
</template>

<style scoped lang="scss">
.main-title {
  font-family: 'IBM Plex Sans', sans-serif;
  letter-spacing: -6px;
  font-size: 14vw;
}
.sub-title {
  margin-top: -11%;
  font-family: 'Have Heart One', sans-serif;
  font-weight: normal;
  font-size: 9vw;
}
$col-width: 20%;
@mixin svg-animate(
  $name,
  $width,
  $height,
  $scaleX: 1,
  $fromY: null,
  $toY: null,
  $direction: null,
  $duration: null,
  $delay: null
) {
  width: $width;
  height: $height;
  visibility: hidden;

  @if $fromY and $toY and $direction and $duration {
    $translateXif: #{if($scaleX == 1, -$width, 35%)};
    @keyframes #{$name} {
      from {
        transform: scaleX($scaleX) translateX(#{if($scaleX == 1, -$width, -20vw)})
          translateY($fromY);
        visibility: visible;
      }
      to {
        transform: scaleX($scaleX) translateX(#{if($scaleX == 1, 20vw, $width)}) translateY($toY);
        visibility: visible;
      }
    }

    & {
      animation: #{$name} #{$duration} ease-in-out #{$delay} infinite;
      animation-play-state: paused;
    }
  }
}

// Applying the combined mixin to different fish elements
.fish {
  .animated & {
    animation-play-state: running;
  }
  &__one-big {
    @include svg-animate(oneBig, 600px, 322px, -1, 20vh, -25vh, right, 25s, -3s);
  }

  &__one-small {
    @include svg-animate(oneSmall, 350px, 187px, 1, 60vh, 35vh, left, 23s, 13s);
  }

  &__two-small {
    @include svg-animate(twoSmall, 450px, 240px, -1, 70vh, 45vh, right, 20s, 1s);
  }

  &__two-big {
    @include svg-animate(twoBig, 700px, 370px, 1, 20vh, -25vh, left, 24s, 3s);
  }

  &__three-big {
    @include svg-animate(threeBig, 700px, 370px, -1, 50vh, 10vh, right, 20s, -7s);
  }

  &__four-big {
    @include svg-animate(fourBig, 700px, 370px, 1, 50vh, 10vh, left, 27s, -4s);
  }

  &__five-big {
    @include svg-animate(fiveBig, 700px, 370px, -1, 60vh, 5vh, right, 23s, -5s);
  }

  &__six-big {
    @include svg-animate(sixBig, 550px, 370px, -1, 30vh, 15vh, right, 25s, 1s);
  }

  &__six-small {
    @include svg-animate(sixSmall, 450px, 370px, -1, 70vh, 35vh, right, 35s, -5s);
  }
}
</style>
