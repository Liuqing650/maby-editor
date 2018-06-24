import EditList from "slate-edit-list";
import isSelectionInTable from "../plugins/slate-edit-table/utils/isSelectionInTable";
import { Blockquote } from '../utils';

export default function onEnter(options, change) {
  const { value } = change;
  const { blocks, texts, selection } = value;
  const getCurrentblock = blocks.get(0);
  const currentTextNode = texts.get(0);
  const currentLineText = currentTextNode.text;
  const { isSelectionInList } = EditList(options.listOption).utils;
  const { isSelectionInBlockquote } = Blockquote;
  
  if (
    getCurrentblock.type === options.blocks.CODE_LINE ||
    getCurrentblock.type === options.blocks.CODE ||
    isSelectionInList(value) ||
    isSelectionInBlockquote(value) ||
    isSelectionInTable(options.tableOption, value) ||
    currentLineText.length > selection.focusOffset
  )
    return;

  return change.insertBlock(options.blocks.PARAGRAPH);
}
