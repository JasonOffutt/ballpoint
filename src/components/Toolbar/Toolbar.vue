<template>
  <div id="baz" class="toolbar" :class="{ active }">
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

    <alignment-select kind="" @format:align="formatAlignment" />

    <list-button :active="isOrderedListActive" kind="ordered" @format:list="formatList">
      <span class="fa fa-list-ol" />
    </list-button>

    <list-button :active="isUnorderedListActive" kind="bullet" @format:list="formatList">
      <span class="fa fa-list-ul" />
    </list-button>

    <div class="merge-field-select">
      <merge-fields-button :active="showMergeFields" @merge:toggle="toggleMergeFields">
        <span class="fa fa-magic" /> Merge Fields
      </merge-fields-button>
      <merge-fields-dropdown
        :visible="showMergeFields"
        @mergeField:selected="handleMergeFieldSelection"
      />
    </div>
  </div>
</template>

<script>
import AlignmentSelect from './AlignmentSelect';
import FormatButton from './FormatButton';
import ListButton from './ListButton';
import MergeFieldsButton from './MergeFieldsButton';
import MergeFieldsDropdown from './MergeFieldsDropdown';

export default {
  name: 'Toolbar',

  components: {
    AlignmentSelect,
    FormatButton,
    ListButton,
    MergeFieldsButton,
    MergeFieldsDropdown,
  },

  props: {
    active: Boolean,
    activeEditor: Object,
    formats: Object,
  },

  computed: {
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

  data() {
    return {
      showMergeFields: false,
    };
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

    formatList(kind) {
      if (!this.activeEditor) {
        return;
      }

      const editor = this.activeEditor.quill;
      editor.format('list', kind);
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
  width: 600px;
  border: 2px solid #58a1d8;
  border-radius: 60px;
  padding: 13px 20px;
  box-sizing: border-box;
  position: relative;
  text-align: left;
  position: fixed;
  display: flex;
  flex-direction: row;
  z-index: 10;
  background: #fefefe;
  transform: translateY(-180px);
  transition: 0.25s transform ease-out, 0.25s opacity ease-out;
  opacity: 0;

  &.active {
    transform: translateY(-90px);
    opacity: 1;
  }
}
</style>
