<template>
  <div class="font-size-select">
    <button
      class="font-size-button"
      :class="{ active: showMenu }"
      :tabindex="tabIndex"
      @blur="handleBlur"
      @click="handleButtonClick"
    >
      {{ activeKind.label }}
      <span class="fa fa-caret-down" />
    </button>
    <ul
      class="font-size-list"
      v-show="showMenu"
      @mouseout="handleHover(false)"
      @mouseover="handleHover(true)"
    >
      <li v-for="(kind, index) in kinds" :key="index">
        <button
          type="button"
          :class="kind.value"
          :title="kind.label"
          @click="handleOptionClick(kind)"
        >
          {{ kind.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

import menu from '../../mixins/menu';

const defaultKind = { label: 'Normal', value: '' };

export default {
  name: 'FontSizeSelect',

  props: {
    kind: {
      type: String,
      default: defaultKind.value,
    },
  },

  mixins: [menu],

  computed: {
    activeKind() {
      return this.kinds.find((kind) => kind.value === this.kind);
    },
  },

  data() {
    return {
      kinds: [
        { label: 'Small', value: 'small' },
        defaultKind,
        { label: 'Large', value: 'large' },
        { label: 'Huge', value: 'huge' },
      ],
    };
  },

  methods: {
    handleOptionClick(kind) {
      this.showMenu = false;
      this.$emit('format:size', kind.value);
    },
  },
};
</script>

<style lang="scss">
@import 'style/mixins';
@import 'style/variables';

.font-size-select {
  .font-size-button {
    @include button();
    width: auto;
  }

  .font-size-list {
    @include list();
    width: auto;
    box-sizing: border-box;

    li {
      padding: 5px;
    }

    .huge {
      font-size: $font-size-huge;
    }

    .large {
      font-size: $font-size-large;
    }

    .small {
      font-size: $font-size-small;
    }
  }
}
</style>
