<template>
  <div id="ballpoint">
    <toolbar
      :active="hasActiveEditor"
      :active-editor="activeEditor"
      :formats="editorFormats"
      @editor:format="updateFormats"
      @editor:insert="insertText"
    />

    <div v-for="(block, index) in blocks" :key="index">
      <editor
        :id="block.id"
        :content="block.content"
        @editor:blur="resetEditor"
        @editor:focus="setEditor"
        @editor:input="updateSelection"
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
          content: '<p>Lorem <b>ipsum</b> <i>sit</i> <u>amet</u> <s>dolor</s> consectetur</p>',
        },
        {
          id: 'bar',
          content: `
<h2>Things I like:</h2>
<ol>
  <li>Helping small businesses succeed</li>
  <li>Vue + Vuex</li>
  <li>Quill</li>
  <li><s>Polymer</s></li>
</ol>`,
        },
      ],
    };
  },

  computed: {
    hasActiveEditor() {
      return this.activeEditor != null;
    },
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

      this.activeEditor.quill.insertText(this.editorSelection.index, ` ${value}`);
    },

    resetEditor(editor) {
      this.updateSelection();

      if (editor.id === this.activeEditor.id) {
        this.activeEditor = null;
        this.editorFormats = {};
      }
    },

    setEditor(editor) {
      this.activeEditor = editor;
      this.editorSelection = this.getSelection();
      this.editorFormats = this.getFormats();
    },

    updateFormats() {
      this.editorFormats = this.getFormats();
    },

    updateSelection() {
      if (!this.hasEditor()) {
        return;
      }

      const selection = this.getSelection();

      if (selection != null) {
        this.editorSelection = selection;
      }
    },
  },
};
</script>

<style lang="scss">
@import '~style/variables';

#ballpoint {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: $spacing-full;
  margin: 120px auto 0;
  background: $light-gray-lighten-2;
}
</style>
