/**
 * 多行缩进
 * @param {*any} change
 * @param {*any} indent
 * @param {*object} option
 */
const indentLines = (change, indent, option) => {
  const { value } = change;
  const { document, selection } = value;
  const lines = document
    .getBlocksAtRange(selection)
    .filter(node => {
      // return node.type === type;
      return node.type === option.lineType;
    });
  return lines.reduce((c, line) => {
    const text = line.nodes.first();
    return c.insertTextByKey(text.key, 0, indent);
  }, change);
};
export default indentLines;
