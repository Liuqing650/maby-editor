/**
 * 回退缩进
 * @param {*any} change 
 * @param {*any} indent 
 * @param {*object} option
 */
export default dedentLines = (change, indent, option) => {
  const { value } = change;
  const { document, selection } = value;
  const lines = document
    .getBlocksAtRange(selection)
    .filter(node => node.type === option.lineType);

  return lines.reduce((c, line) => {
    const text = line.nodes.first();
    const lengthToRemove = text.characters
      .takeWhile((char, index) => indent.charAt(index) === char.text)
      .count();
    return c.removeTextByKey(text.key, 0, lengthToRemove);
  }, change);
};
