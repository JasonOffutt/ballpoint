<template>
  <button
    class="list-button"
    type="button"
    :class="{ active }"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ListButton',

  props: {
    active: {
      type: Boolean,
      default: false,
    },

    kind: {
      type: String,
      value: '',
      required: true,
    },
  },

  methods: {
    handleClick() {
      this.$emit('format:list', this.kind);
    },
  },
};
</script>

<style lang="scss">
  .list-button {
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

