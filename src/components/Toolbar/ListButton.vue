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
@import 'style/mixins';

.list-button {
  @include button();
}
</style>

