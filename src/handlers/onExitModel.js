import { CommonUtil, CodeUtil } from '../utils';
import { CODE_BLOCK_OPTIONS } from '../options';

const onExitModel = (event, change) => {
  const { value } = change;
  const nodeTypeInfo = CommonUtil.checkNodeType(value, ['code-line', 'code-block']);  
  if (nodeTypeInfo.isValid) { // 代码块需特殊形式退出
    CodeUtil.exitCodeBlock(change, CODE_BLOCK_OPTIONS);
  } else {
    event.preventDefault();
    change.splitBlock().setBlocks('paragraph');
  }
  return true;
};
export default onExitModel;
