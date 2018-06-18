<template>
  <button
      class="format-button"
      type="button"
      :class="{ active, format }"
      @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'FormatButton',

  props: {
    active: {
      type: Boolean,
      default: false,
    },

    format: {
      type: String,
      default: null,
    },
  },

  methods: {
    handleClick() {
      this.$emit('format:text', this.format);
    },
  },
};
</script>

<style lang="scss">
@import 'style/mixins';

.format-button {
  @include button();
}
</style>
