<template>
  <div class="toolbar" :class="{ active }">
    <font-size-select :kind="activeSize" @format:size="handleFormatSize" />

    <color-select :color="activeColor" @format:color="handleFormatColor" />

    <format-button :active="isBoldActive" format="bold" @format:text="handleFormatText">
      <span class="fa fa-bold" />
    </format-button>

    <format-button :active="isItalicActive" format="italic" @format:text="handleFormatText">
      <span class="fa fa-italic" />
    </format-button>

    <format-button :active="isUnderlineActive" format="underline" @format:text="handleFormatText">
      <span class="fa fa-underline" />
    </format-button>

    <format-button :active="isStrikethroughActive" format="strike" @format:text="handleFormatText">
      <span class="fa fa-strikethrough" />
    </format-button>

    <alignment-select :kind="activeAlignment" @format:align="handleFormatAlignment" />

    <list-button :active="isOrderedListActive" kind="ordered" @format:list="handleFormatList">
      <span class="fa fa-list-ol" />
    </list-button>

    <list-button :active="isUnorderedListActive" kind="bullet" @format:list="handleFormatList">
      <span class="fa fa-list-ul" />
    </list-button>

    <merge-field-select @mergeField:selected="handleMergeFieldSelection" />
  </div>
</template>

<script>
import AlignmentSelect from '@/components/Toolbar/AlignmentSelect.vue';
import ColorSelect from '@/components/Toolbar/ColorSelect.vue';
import FontSizeSelect from '@/components/Toolbar/FontSizeSelect.vue';
import FormatButton from '@/components/Toolbar/FormatButton.vue';
import ListButton from '@/components/Toolbar/ListButton.vue';
import MergeFieldSelect from '@/components/Toolbar/MergeFieldSelect.vue';

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
    applyFormat(format, value) {
      if (!this.activeEditor) {
        return;
      }

      const editor = this.activeEditor.quill;
      editor.format(format, value);
      this.$emit('editor:format');
    },

    handleFormatAlignment(kind) {
      this.applyFormat('align', kind);
    },

    handleFormatColor(color) {
      this.applyFormat('color', color);
    },

    handleFormatList(kind) {
      const value = this.formats.list !== kind ? kind : '';

      this.applyFormat('list', value);
    },

    handleFormatSize(kind) {
      const value = this.formats.size !== kind ? kind : '';

      this.applyFormat('size', value);
    },

    handleFormatText(format) {
      const editor = this.activeEditor.quill;
      const currentFormat = editor.getFormat();

      this.applyFormat(format, !currentFormat[format]);
    },

    handleMergeFieldSelection(value) {
      this.$emit('editor:insert', value);
    },
  },
};
</script>

<style lang="scss">
@import 'style/variables';

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
