<template>
  <div
    class="editor"
    :class="{ focus: hasFocus }"
    :id="id"
  >
    <div ref="editorContainer" />
  </div>
</template>

<script>
import Quill from 'quill';
import 'quill/dist/quill.core.css';

export default {
  name: 'Editor',

  data() {
    return {
      editor: null,
      hasFocus: false,
    };
  },

  props: {
    id: {
      type: String,
      default: '',
    },

    content: {
      type: String,
      default: '',
    },

    placeholder: {
      type: String,
      default: '',
    },
  },

  mounted() {
    this.initEditor();
  },

  methods: {
    getContent() {
      // TODO: There might need to be some normalization done when pulling the
      // HTML out of this component, as Quill uses special classes to achieve
      // formatting (e.g. `ql-size-large` for formatting font sizes). Will
      // need to account for that when exporting the content for use in
      // an email. Alternatively, it might be worth considering writing a
      // module to parse Quill's "Delta" object model, accessed via `getContent()`.
      return this.$refs.editorContainer.innerHTML;
    },

    handleSelection() {
      const hasFocus = this.editor.hasFocus();
      const eventName = hasFocus ? 'editor:focus' : 'editor:blur';

      this.hasFocus = hasFocus;
      this.$emit(eventName, { id: this.id, quill: this.editor });
    },

    handleTextChange() {
      this.$emit('editor:input');
    },

    initEditor() {
      this.setContent(this.content);
      this.editor = new Quill(this.$refs.editorContainer, { placeholder: this.placeholder });
      this.editor.on('selection-change', () => this.handleSelection());
      this.editor.on('text-change', () => this.handleTextChange());
    },

    setContent(content) {
      if (content) {
        this.$refs.editorContainer.innerHTML = content;
      }
    },
  },
};
</script>

<style lang="scss">
@import '~style/variables';
@import '~style/mixins';

.editor {
  height: $spacing-quarter;
  border: 1px solid $light-gray;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: $spacing-margin;

  &.focus {
    @include blue-outline();
  }

  > div {
    font-size: $font-size-base;
  }
}

.ql-toolbar {
  display: none;
}
</style>
