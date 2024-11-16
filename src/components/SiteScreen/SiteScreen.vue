<script setup>
import SlideSection from '@/components/SlideSection.vue'

defineProps({
  number: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <SlideSection>
    <h2 class="text-4xl">{{ number }}</h2>
  </SlideSection>
</template>

<style scoped lang="scss"></style>
