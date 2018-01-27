<template>
  <div class="merge-field-select">
    <button
      class="merge-fields-button"
      :class="{ active: showMenu }"
      :tabindex="tabIndex"
      @blur="handleBlur"
      @click="handleButtonClick"
    >
      <span class="fa fa-magic" /> Merge Fields
    </button>
    <merge-fields-dropdown
      :visible="showMenu"
      :hover="handleDropdownHover"
      @mergeField:selected="handleOptionClick"
    />
  </div>
</template>

<script>
import menu from '../../mixins/menu';
import MergeFieldsDropdown from './MergeFieldsDropdown';

export default {
  name: 'MergeFieldSelect',

  components: {
    MergeFieldsDropdown,
  },

  mixins: [menu],

  methods: {
    handleDropdownHover(value) {
      this.handleHover(value);
    },

    handleOptionClick(value) {
      this.showMenu = false;
      this.$emit('mergeField:selected', value);
    },
  },
};
</script>

<style lang="scss">
@import '~style/mixins';

.merge-field-select {
  .merge-fields-button {
    @include button();
    width: auto;
  }
}
</style>

