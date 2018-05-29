import { Document } from 'slate';
import { CODE_BLOCK_OPTIONS} from '../options';
import { Code } from '../utils';
// 复制
export default onPaste = (event, change) => {
  const { value } = change;
  const { startBlock, endBlock } = value;
  if (startBlock.type !== 'code-line') return;
  const opts = CODE_BLOCK_OPTIONS;
  const data = getEventTransfer(event);
  const currentCode = Code.getCurrentCode(value, opts);

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

  const lines = Code.deserializeCode(opts, text).nodes;

  const fragment = Document.create({ nodes: lines });

  return change.insertFragment(fragment);
}