<template>
  <div id="app">
    <toolbar
      :active-editor="activeEditor"
      :formats="editorFormats"
      @editor:insert="insertText"
    />

    <div v-for="(block, index) in blocks" :key="index">
      <editor
        :id="block.id"
        :content="block.content"
        @editor:blur="updateEditorData"
        @editor:focus="setEditor"
        @editor:input="updateEditorData"
      />
    </div>
  </div>
</template>

<script>
import Editor from './components/Editor';
import Toolbar from './components/Toolbar';

export default {
  name: 'App',

  components: {
    Editor,
    Toolbar,
  },

  data() {
    return {
      activeEditor: null,

      editorFormats: {},

      editorSelection: {
        index: 0,
        length: 0,
      },

      blocks: [
        {
          id: 'foo',
          content: '<p>Hello <strong>World</strong></p>',
        },
        {
          id: 'bar',
          content: '<h1>I like bacon</h1>',
        },
      ],
    };
  },

  methods: {
    getFormats() {
      return this.activeEditor.quill.getFormat();
    },

    getSelection() {
      return this.activeEditor.quill.getSelection();
    },

    hasEditor() {
      return this.activeEditor != null;
    },

    insertText(value) {
      if (!this.hasEditor()) {
        return;
      }

      this.activeEditor.quill.insertText(this.editorSelection.index, value);
    },

    setEditor(editor) {
      this.activeEditor = editor;
      this.editorSelection = this.getSelection();
      this.editorFormats = this.getFormats();
    },

    updateEditorData() {
      if (!this.hasEditor()) {
        return;
      }

      const selection = this.getSelection();

      if (selection != null) {
        this.editorSelection = selection;
      }

      this.editorFormats = this.getFormats();
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 600px;
  margin: 60px auto 0;
}

#foo, #bar, #baz {
  margin: 0 auto 30px;
}
</style>
