<template>
  <div class="alignment-select">
    <button
      class="alignment-button"
      :class="{ active: showMenu }"
      :tabindex="tabIndex"
      @blur="handleBlur()"
      @click="handleButtonClick">
      <span class="fa" :class="activeKind.icon" />
    </button>
    <ul
      class="alignment-list"
      v-show="showMenu"
      @mouseout="handleHover(false)"
      @mouseover="handleHover(true)"
    >
      <li v-for="(kind, index) in kinds" :key="index">
        <button type="button" :title="kind.label" @click="handleOptionClick(kind)">
          <span class="fa" :class="kind.icon"/>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import menu from '../../mixins/menu';

const defaultKind = { icon: 'fa-align-left', label: 'Left', value: '' };

export default {
  name: 'AlignmentSelect',

  props: {
    kind: {
      type: String,
      default: defaultKind.value,
    },
  },

  mixins: [menu],

  computed: {
    activeKind() {
      return this.kinds.find(kind => kind.value === this.kind);
    },
  },

  data() {
    return {
      kinds: [
        defaultKind,
        { icon: 'fa-align-center', label: 'Center', value: 'center' },
        { icon: 'fa-align-right', label: 'Right', value: 'right' },
        { icon: 'fa-align-justify', label: 'justify', value: 'justify' },
      ],
    };
  },

  methods: {
    handleOptionClick(kind) {
      this.showMenu = false;
      this.$emit('format:align', kind.value);
    },
  },
};
</script>

<style lang="scss">
@import '~style/variables';
@import '~style/mixins';

.alignment-select {
  .alignment-button {
    @include button();
  }

  .alignment-list {
    @include list();
    width: $spacing-button;
    box-sizing: border-box;

    li {
      text-align: center;
    }
  }
}
</style>

