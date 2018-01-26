<template>
  <button
    class="merge-fields-button"
    :class="{ active }"
    @click="handleClick"
  >
    <slot />
    </button>
</template>

<script>
export default {
  name: 'MergeButton',

  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleClick() {
      this.$emit('merge:toggle');
    },
  },
};
</script>

<style lang="scss">
  .merge-fields-button {
      width: auto;
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
