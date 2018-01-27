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
@import '~style/mixins';

.merge-fields-dropdown {
  @include list();
  overflow-x: hidden;
  width: 250px;
  height: 200px;

  .categories,
  .fields {
    width: 100%;
    transition: 0.25s transform ease-out;
    text-align: left;
    top: 0;

    li {
      padding: 5px;
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
