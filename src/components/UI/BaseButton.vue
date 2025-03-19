<script setup>
defineProps({
  link: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <a :href="link" class="btn" target="_blank">
    <slot></slot>
    <span class="line line1"></span>
    <span class="line line2"></span>
    <span class="line line3"></span>
    <span class="line line4"></span>
    <span class="line line5"></span>
  </a>
</template>

<style lang="scss">
// CSS Variables for easier maintenance
:root {
  --btn-color: #553d91;
  --line-color: #637cbd;
  --animation-duration: 0.2s;
  --line-height: 2px;
}

.btn {
  position: relative;
  z-index: 20;
  display: inline-block;
  padding: 0.75rem 4rem;
  color: var(--btn-color);
  font-size: 0.875rem;
  text-decoration: none;
  font-weight: 900;

  // Pseudo-element optimization
  &::after {
    position: absolute;
    bottom: 1.375rem;
    left: 0;
    width: 1.875rem;
    height: var(--line-height);
    background: var(--line-color);
    content: '';
    transition: width var(--animation-duration) ease;
  }

  // Group hover styles
  &:hover {
    &::after {
      width: var(--line-height);
    }

    .line1 {
      height: 1.5rem; // 24px
    }

    .line2 {
      width: 100%; // Use relative sizing
      max-width: 12.5rem; // 200px max
    }

    .line3 {
      height: 3.125rem; // 50px
    }

    .line4 {
      width: 100%; // Use relative sizing
      max-width: 12.5rem; // 200px max
    }

    .line5 {
      height: 1.5rem; // 24px
    }
  }
}

// Base line styles
.line {
  position: absolute;
  background: var(--line-color);
  transition: all var(--animation-duration) ease;
}

// Individual line positioning with more descriptive names
.line1 {
  top: -0.1875rem; // -3px
  left: 0;
  width: var(--line-height);
  height: 0;
  transition-delay: 1.4s;
}

.line2 {
  bottom: -0.25rem; // -4px
  left: 0;
  width: 0;
  height: var(--line-height);
  transition-delay: 0.2s;
  transition-duration: 0.5s;
}

.line3 {
  right: 0;
  bottom: -0.125rem; // -2px
  width: var(--line-height);
  height: 0;
  transition-delay: 0.7s;
}

.line4 {
  top: -0.3125rem; // -5px
  right: 0;
  width: 0;
  height: var(--line-height);
  transition-delay: 0.9s;
  transition-duration: 0.5s;
}

.line5 {
  top: 1.4375rem; // 23px
  left: 0;
  width: var(--line-height);
  height: 0;
}
</style>
