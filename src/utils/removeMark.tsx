import { Editor, Mark } from 'slate';

export default (editor: Editor) => {
  const { value } = editor;
  if (value.marks) {
    value.marks.forEach((mark?: Mark) => {
      if (mark) {
        editor.removeMark(mark);
      }
    });
  }
  return editor;
};
