import { Editor, Text } from 'slate';

export default function trailingSpace(
  editor: Editor,
  currentTextNode: Text,
  offsetIndex: number
) {
  editor.insertTextByKey(currentTextNode.key, offsetIndex, ' ');
}
