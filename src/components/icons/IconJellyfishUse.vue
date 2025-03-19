<script setup>
defineProps({
  id: {
    type: String,
    default: 'icon-jellyfish',
  },
})
</script>

<template>
  <svg><use :xlink:href="`#${id}`"></use></svg>
</template>
