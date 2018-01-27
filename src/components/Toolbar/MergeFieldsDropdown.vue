<template>
  <div
    class="merge-fields-dropdown"
    v-show="visible"
    @mouseout="hover(false)"
    @mouseover="hover(true)"
  >
    <ul class="categories" :class="{ hidden: hasSelectedCategory }">
      <li v-for="(category, index) in mergeFieldCategories" :key="index">
        <button type="button" @click="selectCategory(category)">
          {{ category.category }}
        </button>
      </li>
    </ul>
    <ul class="fields" :class="{ hidden: !hasSelectedCategory }">
      <li class="back">
        <button type="button" @click="clearSelectedCategory">
          <span class="fa fa-chevron-left" />
          {{ selectedCategory.category }}
        </button>
      </li>
      <li v-for="(field, index) in selectedCategory.fields" :key="index">
        <button type="button" @click="selectField(field)">
          {{ field.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MergeFields',

  data() {
    return {
      selectedCategory: {},
    };
  },

  props: {
    hover: {
      type: Function,
      default: x => x,
    },

    visible: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    ...mapGetters({
      mergeFieldCategories: 'mergeFields/categories',
    }),

    hasSelectedCategory() {
      return Array.isArray(this.selectedCategory.fields);
    },
  },

  methods: {
    clearSelectedCategory() {
      this.selectedCategory = {};
    },

    selectCategory(category) {
      this.selectedCategory = category;
    },

    selectField(field) {
      this.clearSelectedCategory();
      this.$emit('mergeField:selected', field.value);
    },
  },
};
</script>

<style lang="scss">
.merge-fields-dropdown {
  overflow-x: hidden;
  width: 250px;
  height: 200px;
  position: absolute;
  background: #fff;
  border: 2px solid #58a1d8;
  z-index: 200;
  border-radius: 4px;
  top: 45px;

  .categories,
  .fields {
    width: 100%;
    display: block;
    transition: 0.25s transform ease-out;
    list-style-type: none;
    text-align: left;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 0;

    li {
      border-bottom: 1px solid #58a1d8;
      padding: 5px;

      &:hover {
        background: #fafafa;
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

  .categories {
    transform: translateX(0);

    &.hidden {
      transform: translateX(-100%);
    }
  }

  .fields {
    transform: translateX(0);

    &.hidden {
      transform: translateX(100%);
    }
  }
}
</style>
