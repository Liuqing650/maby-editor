import { CommonUtil } from '../utils';
import { CODE_BLOCK_OPTIONS } from '../options';

const onExitModel = (event, change) => {
  const { value } = change;
  const nodeTypeInfo = CommonUtil.checkMarkType(value, ['bold', 'code', 'italic', 'del', 'underline']);
  if (value.isExpanded) return
  event.preventDefault();
  const { startBlock, startOffset } = value
  if (nodeTypeInfo.isValid) { // 代码块需特殊形式退出
    change.insertText(' ');
    change.moveOffsetsTo(startOffset, startOffset + 1)
    change.toggleMark(nodeTypeInfo.type);
    change.moveOffsetsTo(startOffset + 1)
  }
  return true;
};
export default onExitModel;
