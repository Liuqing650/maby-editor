// @flow
import type { Change } from 'slate';

export default function onEnter(options: any, change: Change) {
  const { value } = change;
  const { texts, selection } = value;
  const currentTextNode = texts.get(0);
  const currentLineText = currentTextNode.text;

  if (
    isSelectionInBlockquote(value) ||
    currentLineText.length > selection.focusOffset
  ) {
    return;
  }

  return change.insertBlock(options.blocks.PARAGRAPH);
}
