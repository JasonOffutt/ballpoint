import QuillSelection from '@/shared/interfaces/QuillSelection';

export default interface QuillEditor {
  on: (name: string, callback: () => void) => void;
  off: (name: string) => void;
  getFormat: () => object;
  getSelection: () => QuillSelection;
  hasFocus: () => boolean;
  insertText: (index: number, value: string) => void;
}
