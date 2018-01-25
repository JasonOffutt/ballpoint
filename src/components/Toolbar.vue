<template>
  <div id="baz" class="toolbar">
    <button class="format bold" @click="formatText('bold')">
      <span class="fa fa-bold" />
    </button>

    <button class="format italic" @click="formatText('italic')">
      <span class="fa fa-italic" />
    </button>

    <button class="format underline" @click="formatText('underline')">
      <span class="fa fa-underline" />
    </button>

    <button class="format strikethrough" @click="formatText('strike')">
      <span class="fa fa-strikethrough" />
    </button>

    <button class="format merge-fields-button" @click="toggleMergeFields">
      <span class="fa fa-magic" />
    </button>
    <merge-fields :expanded="showMergeFields" @mergeField:selected="handleMergeFieldSelection" />
  </div>
</template>

<script>
import MergeFields from './MergeFields';

export default {
  name: 'Toolbar',

  components: {
    MergeFields,
  },

  props: {
    activeEditor: Object,
  },

  data() {
    return {
      showMergeFields: false,
    };
  },

  methods: {
    formatText(format) {
      if (!this.activeEditor) {
        return;
      }

      const editor = this.activeEditor.quill;
      const currentFormat = editor.getFormat();

      editor.format(format, !currentFormat[format]);
    },

    handleMergeFieldSelection(value) {
      this.showMergeFields = false;
      this.$emit('editor:insert', value);
    },

    toggleMergeFields() {
      this.showMergeFields = !this.showMergeFields;
    },
  },
};
</script>

<style lang="scss">
.toolbar {
  height: 60px;
  width: 100%;
  border: 2px solid #58a1d8;
  border-radius: 60px;
  padding: 10px;
  box-sizing: border-box;
  position: relative;

  .format {
    height: 24px;
    width: 24px;
    font-size: 16px;
    color: #58a1d8;
    border: none;
    cursor: pointer;

    &:focus,
    &:active {
      outline: none;
    }
  }
}
</style>
