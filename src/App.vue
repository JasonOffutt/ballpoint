<template>
  <div id="app">
    <toolbar :active-editor="activeEditor" />

    <div v-for="(block, index) in blocks" :key="index">
      <editor
        :id="block.id"
        :content="block.content"
        @editor:focus="setEditor"
        @editor:blur="clearEditor"
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
    },

    setEditor(editor) {
      this.activeEditor = editor;
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
