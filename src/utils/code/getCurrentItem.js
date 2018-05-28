/**
 * 
 * @param {*object} option
 * @param {*value} value
 */
export default getCurrentItem = (option, value) => {
  const { document } = value;

  if (!value.selection.startKey) return null;
  const block = value.startBlock;
  const parent = document.getParent(block.key);
  return parent && parent.type === option.typeItem ? parent : null;
}
