<template>
  <div id="app">
    <Editor id="foo" />
    <Editor id="bar" />
  </div>
</template>

<script>
import Editor from './components/Editor';

export default {
  name: 'App',
  components: {
    Editor,
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
  margin-top: 60px;
  width: 600px;
  margin: 60px auto 0;
}

#foo, #bar {
  margin: 0 auto 30px;
}
</style>
