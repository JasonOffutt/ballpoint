<template>
  <div class="color-select">
    <button
      class="color-button"
      :class="{ active: showMenu }"
      :tabindex="tabIndex"
      @blur="handleBlur()"
      @click="handleButtonClick">
      <span class="fa fa-square" :style="{ color: activeColor }" />
      <span class="fa fa-caret-down" />
    </button>
    <ul
      class="color-list"
      v-show="showMenu"
      @mouseout="handleHover(false)"
      @mouseover="handleHover(true)"
    >
      <li v-for="(c, index) in colors" :key="index" :style="{ 'background-color': c }">
        <button type="button" @click="handleOptionClick(c)" />
      </li>
    </ul>
  </div>
</template>

<script>
import menu from '@/mixins/menu';
import colors from '../../../public/colors.json';

const defaultColor = '#000000';

export default {
  name: 'ColorSelect',

  props: {
    color: {
      type: String,
      value: defaultColor,
    },
  },

  mixins: [menu],

  computed: {
    activeColor() {
      if (!this.color) {
        return defaultColor;
      }

      return this.colors.find((color) => color.toLowerCase() === this.color.toLowerCase());
    },
  },

  data() {
    return {
      colors,
    };
  },

  methods: {
    handleOptionClick(color) {
      this.showMenu = false;
      this.$emit('format:color', color);
    },
  },
};
</script>

<style lang="scss">
@import 'style/mixins';
@import 'style/variables';

.color-select {
  .color-button {
    @include button();
    width: auto;
  }

  .color-list {
    @include list();
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 320px;
    padding: 8px;

    li {
      border: none;
      width: $spacing-button;
      height: $spacing-button;
      box-sizing: border-box;

      &:hover  {
        border: 1px solid $light-blue-lighten-1;
      }
    }
  }
}
</style>

