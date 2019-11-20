import { Editor } from 'slate';

export const haveMarks = (editor: Editor, type: string) => {
  const { value } = editor;
  if (value.marks.size > 0) {
    return value.marks.some((mark: any) => (mark && mark.type === type));
  }
  return false;
};

export const haveBlocks = (editor: Editor, type: string) => {
  const { value } = editor;
  if (value.blocks.size > 0) {
    return value.blocks.some(
      (node: any) => node && (node.type === type || node.type.indexOf(`${type}`) === 0)
    );
  }
  return false;
};

export const haveInlines = (editor: Editor, type: string) => {
  const { value } = editor;
  if (value.inlines.size > 0) {
    return value.inlines.some((inline: any) => (inline && inline.type === type));
  }
  return false;
};
