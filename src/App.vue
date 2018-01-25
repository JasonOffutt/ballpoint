<template>
  <div id="app">
    <toolbar
      :active-editor="activeEditor"
      @editor:insert="insertText"
    />

    <div v-for="(block, index) in blocks" :key="index">
      <editor
        :id="block.id"
        :content="block.content"
        @editor:blur="updatePosition"
        @editor:focus="setEditor"
        @editor:input="updatePosition"
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
    clearEditor(editor) {
      if (this.activeEditor.id === editor.id) {
        this.activeEditor = null;
      }

      this.editorSelection = {
        index: 0,
        length: 0,
      };
    },

    insertText(value) {
      if (this.activeEditor == null) {
        return;
      }

      this.activeEditor.quill.insertText(this.editorSelection.index, value);
    },

    setEditor(editor) {
      this.activeEditor = editor;
      this.editorSelection = this.activeEditor.quill.getSelection();
    },

    updatePosition() {
      if (this.activeEditor == null) {
        return;
      }

      const selection = this.activeEditor.quill.getSelection();

      if (selection != null) {
        this.editorSelection = selection;
      }
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
