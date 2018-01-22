<template>
  <div id="baz" class="toolbar">
  </div>
</template>

<script>
export default {
  name: 'Toolbar',

  props: {
    activeEditor: Object,
  },
};
</script>

<style lang="scss">
.toolbar {
  height: 60px;
  width: 100%;
  border: 2px solid #58a1d8;
  border-radius: 60px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
