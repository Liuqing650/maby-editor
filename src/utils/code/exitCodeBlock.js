import { Block, Text } from 'slate';

/**
 * 退出代码编辑栏
 * 切换到下一行,并退出当前代码编辑模式
 * @param {*change} change
 * @param {*object} option 
 */
export default exitCodeBlock = (change, option) => {
  // Default behavior: insert an exit block
  const range = change.value.selection;

  const exitBlock = Block.create({
    type: option.exitBlockType,
    nodes: [Text.create()]
  });
  change.deleteAtRange(range, { normalize: false });
  change.insertBlockAtRange(change.value.selection, exitBlock, {
    normalize: false
  });
  // Exit the code block
  change.unwrapNodeByKey(exitBlock.key);

  return change.collapseToStartOf(exitBlock);
}
