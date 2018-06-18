<template>
  <div id="app">
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

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import QuillEditor from '@/shared/interfaces/QuillEditor';
import Editor from '@/components/Editor.vue';
import Toolbar from '@/components/Toolbar.vue';
import QuillSelection from '@/shared/interfaces/QuillSelection';

interface QuillContainer {
  id: string;
  quill: QuillEditor;
}

@Component({
  name: 'App',
  components: {
    Editor,
    Toolbar,
  },
})
export default class App extends Vue {
  private activeEditor: QuillContainer = null;

  private editorFormats: object = null;

  private editorSelection: QuillSelection = {
    index: 0,
    length: 0,
  };

  private blocks: object[] = [
    {
      id: 'foo',
      content: '<p>Lorem <b>ipsum</b> <i>sit</i> <u>amet</u> <s>dolor</s> consectetur</p>',
    },
    {
      id: 'bar',
      content: `
<p><span class="ql-size-large">Things I like:</span></p>
<ol>
<li>Helping small businesses succeed</li>
<li>Vue + Vuex</li>
<li>Quill</li>
<li><s>Polymer</s></li>
</ol>`,
    },
  ];

  get hasActiveEditor() {
    return this.activeEditor != null;
  }

  getFormats(): object {
    return this.activeEditor.quill.getFormat();
  }

  getSelection(): QuillSelection {
    return this.activeEditor.quill.getSelection();
  }

  hasEditor(): boolean {
    return this.activeEditor != null;
  }

  insertText(value): void {
    if (!this.hasEditor()) {
      return;
    }

    this.activeEditor.quill.insertText(this.editorSelection.index, ` ${value}`);
  }

  resetEditor(editor): void {
    this.updateSelection(null);

    if (editor.id === this.activeEditor.id) {
      this.activeEditor = null;
      this.editorFormats = {};
    }
  }

  setEditor(editor): void {
    this.activeEditor = editor;
    this.editorSelection = this.getSelection();
    this.editorFormats = this.getFormats();
  }

  updateFormats(): void {
    this.editorFormats = this.getFormats();
  }

  updateSelection(content): void {
    if (!this.hasEditor()) {
      return;
    }

    const selection = this.getSelection();

    if (selection != null) {
      this.editorSelection = selection;
    }
  }
}
</script>

<style lang="scss">
@import 'style/variables';
@import 'style/main';

#app {
  color: $slate;
  margin: 0 auto;
  width: $spacing-full;
  background: $light-gray-lighten-2;
}
</style>
