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
.alignment-select {
  .alignment-button {
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

  .alignment-list {
    width: 30px;
    position: absolute;
    background: #fff;
    border: 2px solid #58a1d8;
    z-index: 200;
    border-radius: 4px;
    top: 45px;
    list-style-type: none;
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    li {
      border-bottom: 1px solid #58a1d8;
      text-align: center;

      &:hover {
        background: #fafafa;
      }

      &:last-child {
        border-bottom: none;
      }

      button {
        border: none;
        background: transparent;
        font-size: 14px;
        width: 100%;
        height: 100%;
        text-align: left;
        cursor: pointer;
        color: darken(#58a1d8, 20%);

        &:focus,
        &:active {
          outline: none;
        }
      }
    }
  }
}
</style>

