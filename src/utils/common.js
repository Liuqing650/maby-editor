import { CODE_BLOCK_OPTIONS, LIST_OPTIONS } from 'options';

// 获取选项全类型
const getAllOptions = () => {
  const obj = {
    code: CODE_BLOCK_OPTIONS,
    list: LIST_OPTIONS
  };
  let output = {};
  Object.keys(obj).map((item) => {
    const opts = obj[item];
    output[item] = [];
    Object.keys(opts).map((key) => {
      if (opts[key] !== 'paragraph') {
        if (typeof opts[key] === 'string') {
          output[item].push(opts[key]);
        } else {
          output[item].concat(opts[key]);
        }
      }
    });
  });
  return output;
};

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

/**
 * 获取节点类型
 * @param {*value} value 检测节点
 */
export const getNodeType = (value) => {
  let output = {
    ntype: 'default'
  };
  const { startBlock } = value;
  const allOptions = getAllOptions();
  output.isValid = value.blocks.some(block => {
    output.type = block.type;
    Object.keys(allOptions).map((key) => {
      if (allOptions[key].includes(block.type) || allOptions[key].includes(startBlock.type)) {
        output.ntype = key;
      }
    });
  });
  return output;
}

/**
 * 是否
 * @param {*Object} value state的value
 * @param {*string} value 待检测的类型
 */
export const hasBlock = (value, type) => {
  return value.blocks.some(node => node.type === type);
}

/**
 * 是否
 * @param {*Object} value state的value
 * @param {*string} value 待检测的类型
 */
export const hasMark = (value, type) => {
  return value.activeMarks.some(mark => mark.type === type);
}
