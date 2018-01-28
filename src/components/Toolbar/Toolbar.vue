<template>
  <div id="baz" class="toolbar" :class="{ active }">
    <font-size-select :kind="activeSize" @format:size="formatSize" />

    <color-select :color="activeColor" @format:color="formatColor" />

    <format-button :active="isBoldActive" format="bold" @format:text="formatText">
      <span class="fa fa-bold" />
    </format-button>

    <format-button :active="isItalicActive" format="italic" @format:text="formatText">
      <span class="fa fa-italic" />
    </format-button>

    <format-button :active="isUnderlineActive" format="underline" @format:text="formatText">
      <span class="fa fa-underline" />
    </format-button>

    <format-button :active="isStrikethroughActive" format="strike" @format:text="formatText">
      <span class="fa fa-strikethrough" />
    </format-button>

    <alignment-select :kind="activeAlignment" @format:align="formatAlignment" />

    <list-button :active="isOrderedListActive" kind="ordered" @format:list="formatList">
      <span class="fa fa-list-ol" />
    </list-button>

    <list-button :active="isUnorderedListActive" kind="bullet" @format:list="formatList">
      <span class="fa fa-list-ul" />
    </list-button>

    <merge-field-select @mergeField:selected="handleMergeFieldSelection" />
  </div>
</template>

<script>
import AlignmentSelect from './AlignmentSelect';
import ColorSelect from './ColorSelect';
import FontSizeSelect from './FontSizeSelect';
import FormatButton from './FormatButton';
import ListButton from './ListButton';
import MergeFieldSelect from './MergeFieldSelect';

export default {
  name: 'Toolbar',

  components: {
    AlignmentSelect,
    ColorSelect,
    FontSizeSelect,
    FormatButton,
    ListButton,
    MergeFieldSelect,
  },

  props: {
    active: Boolean,
    activeEditor: Object,
    formats: Object,
  },

  computed: {
    activeAlignment() {
      return this.formats.align;
    },

    activeColor() {
      return this.formats.color;
    },

    activeSize() {
      return this.formats.size;
    },

    isBoldActive() {
      return Boolean(this.formats.bold);
    },

    isItalicActive() {
      return Boolean(this.formats.italic);
    },

    isUnderlineActive() {
      return Boolean(this.formats.underline);
    },

    isStrikethroughActive() {
      return Boolean(this.formats.strike);
    },

    isOrderedListActive() {
      return this.formats.list === 'ordered';
    },

    isUnorderedListActive() {
      return this.formats.list === 'bullet';
    },
  },

  methods: {
    formatAlignment(kind) {
      if (!this.activeEditor) {
        return;
      }

      const editor = this.activeEditor.quill;
      editor.format('align', kind);
      this.$emit('editor:format');
    },

    formatColor(color) {
      if (!this.activeEditor) {
        return;
      }

      const editor = this.activeEditor.quill;
      editor.format('color', color);
      this.$emit('editor:format');
    },

    formatList(kind) {
      if (!this.activeEditor) {
        return;
      }

      const editor = this.activeEditor.quill;
      editor.format('list', this.formats.list !== kind ? kind : '');
      this.$emit('editor:format');
    },

    formatSize(kind) {
      if (!this.activeEditor) {
        return;
      }

      const editor = this.activeEditor.quill;
      editor.format('size', this.formats.size !== kind ? kind : '');
      this.$emit('editor:format');
    },

    formatText(format) {
      if (!this.activeEditor) {
        return;
      }

      const editor = this.activeEditor.quill;
      const currentFormat = editor.getFormat();

      editor.format(format, !currentFormat[format]);
      this.$emit('editor:format');
    },

    handleMergeFieldSelection(value) {
      this.$emit('editor:insert', value);
    },
  },
};
</script>

<style lang="scss">
@import '~style/variables';

.toolbar {
  height: $spacing-margin * 2;
  width: $spacing-full;
  border: 2px solid $light-blue;
  border-radius: $spacing-margin;
  padding: 13px 20px;
  box-sizing: border-box;
  position: relative;
  text-align: left;
  position: fixed;
  display: flex;
  flex-direction: row;
  z-index: 10;
  background: $light-gray-lighten-2;
  transform: translateY(-180px);
  transition: 0.25s transform ease-out, 0.25s opacity ease-out;
  opacity: 0;

  &.active {
    transform: translateY(-90px);
    opacity: 1;
  }
}
</style>
