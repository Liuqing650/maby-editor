import endsWith from 'ends-with';
import getCurrentCode from './getCurrentCode';
import getCurrentIndent from './getCurrentIndent';

/**
 * 删除代码块
 * @param {*change} change slate的change
 * @param {*object} option 
 */
const deleteCodeBlock = (change, option) => {
  const { value } = change;
  if (value.isExpanded) {
    return undefined;
  }
  const { startOffset, startText } = value;

  const currentLine = value.startBlock;
  // Detect and remove indentation at cursor
  const indent = getCurrentIndent(value, option);
  const beforeSelection = currentLine.text.slice(0, startOffset);
  if (endsWith(beforeSelection, indent)) {
    return change.deleteBackward(indent.length).focus();
  } else if (option.exitBlockType) {
    // 删除代码块的数据
    const currentCode = getCurrentCode(value, option);
    const isStartOfCode =
      startOffset === 0 && currentCode.getFirstText() === startText;
    const isEmpty =
      currentCode.nodes.size === 1 && currentLine.text.length === 0;
    if (isStartOfCode && isEmpty) {
      return change.setBlocks(option.exitBlockType, { normalize: false }).unwrapNodeByKey(currentLine.key);
    }
  }
  return undefined;
};
export default deleteCodeBlock;
