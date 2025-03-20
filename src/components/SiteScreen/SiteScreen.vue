<script setup>
import SlideSection from '@/components/SlideSection.vue'
import BaseButton from '@/components/UI/BaseButton.vue'
import { basePath } from '@/utils/basePath'
import { computed } from 'vue'

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  link: {
    type: String,
    required: true,
  },
})

const path = basePath(import.meta.env.MODE)

const linkFormatted = computed(() => {
  return `${path}sites/${props.link}/index.html`
})
const previewFormatted = computed(() => {
  return `${path}sites/${props.link}/preview.png`
})
</script>

<template>
  <SlideSection>
    <div class="item_wrap w-full h-full">
      <div class="section">
        <div class="section__left">
          <img
            src="@/assets/img/slide2_bg01.png"
            alt="jellyfish"
            class="absolute top-[10%] right-[61%]"
          />
          <img
            src="@/assets/img/slide2_elem01.png"
            alt="dot"
            class="absolute top-[38%] right-[90%]"
          />
          <img
            src="@/assets/img/slide2_bg02.png"
            alt="jellyfish"
            class="absolute top-[55%] right-[63%]"
          />
          <img
            src="@/assets/img/slide2_elem02.png"
            alt="dot"
            class="absolute top-[74%] right-[93%]"
          />

          <strong class="section__number">{{ props.id > 9 ? props.id : `0${props.id}` }}</strong>
          <h3 class="section__title">{{ props.name }}</h3>
          <p class="section__text">{{ props.description ? props.description : 'Hello' }}</p>
          <div class="section__btn">
            <BaseButton :link="linkFormatted">See more</BaseButton>
          </div>
        </div>
        <div class="section__right">
          <a
            :href="linkFormatted"
            target="_blank"
            class="overflow-hidden w-full h-full sm:w-[500px] sm:h-[600px] sm:ml-[100px] shadow-[0_17px_65px_rgba(85,61,145,0.3)] hover:shadow-[0_67px_200px_rgba(85,61,145,0.9)] transition-shadow duration-500 flex"
          >
            <img
              :src="previewFormatted"
              :alt="props.name"
              class="object-cover sm:object-left-top hover:object-center duration-[2s,15s] transition-[object-position]"
            />
          </a>
        </div>
      </div>
    </div>
  </SlideSection>
</template>

<style scoped lang="scss"></style>
