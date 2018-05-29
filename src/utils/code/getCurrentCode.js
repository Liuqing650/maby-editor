/**
 * 获取code
 * @param {*value} value 
 * @param {*object} option 
 */
const getCurrentCode = (value, option) => {
  const { document } = value;

  let currentBlock;
  if (!value.selection.startKey) return null;
  currentBlock = value.startBlock;
  // const nodes = document.getChild(currentBlock.key);
  const nodes = document.getParent(currentBlock.key);

  if (nodes && nodes.type === option.containerType) {
    return nodes;
  }
  return false;
};
export default getCurrentCode;
