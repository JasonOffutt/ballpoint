<template>
  <div
    class="editor"
    :class="{ focus: hasFocus }"
    :id="id"
  >
    <div ref="editorContainer" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Quill from 'quill';
import 'quill/dist/quill.core.css';

import QuillEditor from '@/shared/interfaces/QuillEditor';
import { normalizeHtml } from '@/shared/util/quill';

@Component({
  name: 'Editor',
})
export default class Editor extends Vue {
  @Prop({ default: '' })
  public id: string;

  @Prop({ default: '' })
  public content: string;

  @Prop({ default: '' })
  public placeholder: string;

  public $refs: {
    editorContainer: HTMLDivElement,
  };

  private editor: QuillEditor = null;
  private hasFocus: boolean = false;

  public getContent(): string {
    return normalizeHtml(this.$refs.editorContainer.innerHTML);
  }

  public setContent(content: string): void {
    if (content) {
      this.$refs.editorContainer.innerHTML = content;
    }
  }

  protected beforeDestroy() {
    this.editor.off('selection-change');
    this.editor.off('text-change');
  }

  protected mounted() {
    this.initEditor();
  }

  private handleSelectionChange(): void {
    const hasFocus = this.editor.hasFocus();
    const eventName = hasFocus ? 'editor:focus' : 'editor:blur';

    this.hasFocus = hasFocus;
    this.$emit(eventName, { id: this.id, quill: this.editor });
  }

  private handleTextChange(): void {
    this.$emit('editor:input', this.getContent());
  }

  private initEditor(): void {
    this.setContent(this.content);
    this.editor = new Quill(this.$refs.editorContainer, { placeholder: this.placeholder });
    this.editor.on('selection-change', () => this.handleSelectionChange());
    this.editor.on('text-change', () => this.handleTextChange());
  }
}
</script>

<style lang="scss">
@import 'style/variables';
@import 'style/mixins';

.editor {
  min-height: $spacing-quarter;
  height: auto;
  border: 1px solid $light-gray;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: $spacing-margin;

  &.focus {
    @include blue-outline();
  }

  .ql-container {
    font-size: $font-size-base;
    min-height: $spacing-quarter;

    .ql-editor {
      min-height: $spacing-quarter;
    }
  }
}

.ql-toolbar {
  display: none;
}
</style>
