import { Document } from 'slate';
import { getEventTransfer } from 'slate-react';
import { CODE_BLOCK_OPTIONS} from '../options';
import { CodeUtil } from '../utils';
// 复制
const onPaste = (event, change) => {
  const { value } = change;
  const { startBlock, endBlock } = value;
  if (startBlock.type !== 'code-line') return;
  const opts = CODE_BLOCK_OPTIONS;
  const data = getEventTransfer(event);
  const currentCode = CodeUtil.getCurrentCode(value, opts);

  if (!currentCode || !currentCode.hasDescendant(endBlock.key)) {
    return undefined;
  }

  let text;
  if (data.type === 'fragment') {
    text = data.fragment
      .getTexts()
      .map(t => t.text)
      .join('\n');
  } else {
    text = data.text;
  }

  const lines = CodeUtil.deserializeCode(opts, text).nodes;

  const fragment = Document.create({ nodes: lines });

  return change.insertFragment(fragment);
}
export default onPaste;
