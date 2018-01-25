<template>
  <div class="merge-fields" :class="{ hidden: !expanded }">
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
      hasSelectedCategory: false,
      selectedCategory: {},
    };
  },

  props: {
    expanded: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    ...mapGetters({
      mergeFieldCategories: 'mergeFields/categories',
    }),
  },

  methods: {
    clearSelectedCategory() {
      this.selectedCategory = {};
      this.hasSelectedCategory = false;
    },

    selectCategory(category) {
      this.selectedCategory = category;
      this.hasSelectedCategory = true;
    },

    selectField(field) {
      this.clearSelectedCategory();
      this.$emit('mergeField:selected', field.value);
    },
  },
};
</script>

<style lang="scss">
  .merge-fields {
    overflow-x: hidden;
    width: 250px;
    height: 200px;
    position: absolute;
    background: #fff;
    border: 2px solid #58a1d8;
    z-index: 200;
    border-radius: 4px;
    right: 0;
    top: 60px;

    &.hidden {
      display: none;
    }

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

        button {
          border: none;
          background: transparent;
          font-size: 14px;
          width: 100%;
          height: 100%;
          text-align: left;

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
