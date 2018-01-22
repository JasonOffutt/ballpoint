<template>
  <div id="app">
    <Toolbar id="baz" />
    <Editor id="foo" :content="content" />
    <Editor id="bar" />
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
      content: '<p>Hello <strong>World</strong></p>',
    };
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
