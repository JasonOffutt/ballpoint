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

import { normalizeHtml } from '../shared/util/quill';

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

  beforeDestroy() {
    this.editor.off('selection-change');
    this.editor.off('text-change');
  },

  mounted() {
    this.initEditor();
  },

  methods: {
    getContent() {
      return normalizeHtml(this.$refs.editorContainer.innerHTML);
    },

    handleSelectionChange() {
      const hasFocus = this.editor.hasFocus();
      const eventName = hasFocus ? 'editor:focus' : 'editor:blur';

      this.hasFocus = hasFocus;
      this.$emit(eventName, { id: this.id, quill: this.editor });
    },

    handleTextChange() {
      this.$emit('editor:input', this.getContent());
    },

    initEditor() {
      this.setContent(this.content);
      this.editor = new Quill(this.$refs.editorContainer, { placeholder: this.placeholder });
      this.editor.on('selection-change', () => this.handleSelectionChange());
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
  min-height: $spacing-quarter;
  height: auto;
  border: 1px solid $light-gray;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: $spacing-margin;

  &.focus {
    @include blue-outline();
  }

  .ql-container {
    font-size: $font-size-base;
    min-height: $spacing-quarter;

    .ql-editor {
      min-height: $spacing-quarter;
    }
  }
}

.ql-toolbar {
  display: none;
}
</style>
