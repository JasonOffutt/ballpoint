<template>
  <div id="baz" class="toolbar">
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

    <merge-button :active="showMergeFields" @merge:toggle="toggleMergeFields">
      <span class="fa fa-magic" /> Merge Fields
    </merge-button>
    <merge-fields :visible="showMergeFields" @mergeField:selected="handleMergeFieldSelection" />
  </div>
</template>

<script>
import FormatButton from './FormatButton';
import MergeButton from './MergeButton';
import MergeFields from './MergeFields';

export default {
  name: 'Toolbar',

  components: {
    FormatButton,
    MergeButton,
    MergeFields,
  },

  props: {
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
  padding: 13px 20px;
  box-sizing: border-box;
  position: relative;
  text-align: left;
}
</style>
