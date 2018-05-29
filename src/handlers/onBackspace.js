import { CODE_BLOCK_OPTIONS } from '../options';
import { CommonUtil, CodeUtil } from '../utils';

const codeOnBackspace = (event, change, option) => {
  event.preventDefault();
  return CodeUtil.deleteCodeBlock(change, CODE_BLOCK_OPTIONS);
};

const otherOnBackspace = (event, change, option) => {
  const { value } = change;
  if (value.isExpanded) return;
  if (value.startOffset != 0) return;
  const { startBlock } = value;
  if (startBlock.type == 'paragraph') return;
  event.preventDefault();
  change.setBlocks('paragraph');
  return true;
};

function onBackspace(event, change, option) {
  const { value } = change;
  const nodeType = CommonUtil.getNodeType(value);
  console.log('nodeType----->', nodeType);
  switch (nodeType.ntype) {
    case 'code':
      return codeOnBackspace(event, change, option);
    default:
      return otherOnBackspace(event, change, option);
  }
}

export default onBackspace;
