import { CommonUtil } from '../utils';
import { wrapCodeBlock, toggleCodeBlock } from '../changes/code';
import { CODE_BLOCK_OPTIONS, BLOCKS } from '../options';

const createCodeBlock = (event, change) => {
  const { value } = change;
  event.preventDefault();
  const nodeTypeInfo = CommonUtil.checkNodeType(value, [BLOCKS.CODE_LINE, BLOCKS.CODE_BLOCK]);
  if (!nodeTypeInfo.isValid) {
    return wrapCodeBlock(CODE_BLOCK_OPTIONS, change);
  }
  return toggleCodeBlock(CODE_BLOCK_OPTIONS, change, BLOCKS.DEFAULT);
};
export default createCodeBlock;
