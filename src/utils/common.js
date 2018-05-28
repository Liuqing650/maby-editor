/**
 * 检测节点类型
 * @param {*value} value 检测节点
 * @param {*array} expect 期望类型
 */
export const checkNodeType = (value, expect) => {
  let output = {};
  const expectArr = expect || [];
  output.isValid = value.blocks.some(block => {
    output.type = block.type;
    // console.log('type---->', block.type);
    return expectArr.includes(block.type);
  });
  return output;
}
