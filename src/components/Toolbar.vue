<template>
  <div id="baz" class="toolbar">
    <button class="format bold" @click="bold">
      <span class="fa fa-bold" />
    </button>

    <button class="format italic" @click="italic">
      <span class="fa fa-italic" />
    </button>

    <button class="format underline" @click="underline">
      <span class="fa fa-underline" />
    </button>

    <button class="format strikethrough" @click="strikethrough">
      <span class="fa fa-strikethrough" />
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Toolbar',

  props: {
    activeEditor: Object,
  },

  methods: {
    bold() {
      if (!this.activeEditor) {
        return;
      }

      const editor = this.activeEditor.quill;
      const format = editor.getFormat();

      editor.format('bold', !format.bold);
    },

    italic() {
      if (!this.activeEditor) {
        return;
      }

      const editor = this.activeEditor.quill;
      const format = editor.getFormat();

      editor.format('italic', !format.italic);
    },

    underline() {
      if (!this.activeEditor) {
        return;
      }

      const editor = this.activeEditor.quill;
      const format = editor.getFormat();

      editor.format('underline', !format.underline);
    },

    strikethrough() {
      if (!this.activeEditor) {
        return;
      }

      const editor = this.activeEditor.quill;
      const format = editor.getFormat();

      editor.format('strike', !format.strike);
    },
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

  .format {
    height: 24px;
    width: 24px;
    font-size: 16px;
    color: #58a1d8;
    border: none;
    cursor: pointer;
  }
}
</style>
