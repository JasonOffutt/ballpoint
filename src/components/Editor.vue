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
    id: String,
    content: String,
  },

  mounted() {
    this.initEditor();
  },

  methods: {
    initEditor() {
      this.setContent(this.content);
      this.editor = new Quill(this.$refs.editorContainer);
      this.editor.on('selection-change', () => this.handleSelection());
    },

    handleSelection() {
      const hasFocus = this.editor.hasFocus();
      const eventName = hasFocus ? 'editor:focus' : 'editor:blur';

      this.hasFocus = hasFocus;
      this.$emit(eventName, { id: this.id, quill: this.editor });
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
.editor {
  height: 150px;
  border: 1px solid #dfe0e3;
  border-radius: 4px;

  &.focus {
    border: transparent;
    box-shadow: 0 0 0 0.125rem #58a1d8;
  }
}

.ql-toolbar {
  display: none;
}
</style>
