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
.format-button {
  width: 30px;
  height: 30px;
  font-size: 16px;
  color: #58a1d8;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  box-sizing: border-box;

  &:focus,
  &:active {
    outline: none;
  }

  &:hover {
    border: 1px solid lighten(#58a1d8, 25%);
  }

  &.active {
    border: 1px solid lighten(#58a1d8, 25%);
  }
}
</style>
