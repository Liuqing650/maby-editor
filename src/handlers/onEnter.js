import { CommonUtil, CodeUtil } from '../utils';
import onBackspace from './onBackspace';

const codeOnEnter = (event, change, option) => {
  const { value } = change;
  // 删除选中的区域
  if (value.isExpanded) change.delete();
  event.preventDefault();
  change.splitBlock().insertText('');
  return true;
};

const otherOnEnter = (event, change, option) => {
  const { value } = change;
  const { startBlock, focusBlock, startOffset, endOffset } = value;
  if (value.isExpanded) return;
  if (startOffset == 0 && startBlock.text.length == 0) {
    return onBackspace(event, change);
  }
  if (endOffset !== startBlock.text.length) return;
  if (
    startBlock.type !== 'header-one' &&
    startBlock.type !== 'header-two' &&
    startBlock.type !== 'header-three' &&
    startBlock.type !== 'header-four' &&
    startBlock.type !== 'header-five' &&
    startBlock.type !== 'header-six' &&
    startBlock.type !== 'block-quote'
  ) {
    return;
  }
  event.preventDefault();
  change.splitBlock().setBlocks('paragraph');
  return true;
};

function onEnter(event, change, option) {
  const { value } = change;
  const nodeType = CommonUtil.getNodeType(value);
  switch (nodeType.ntype) {
    case 'code':
      return codeOnEnter(event, change, option);
    default:
      return otherOnEnter(event, change, option);
  }
}

export default onEnter;
