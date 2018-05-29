import { List } from 'immutable';
import { Block, Text } from 'slate';
import DICT from '../../static';

/**
 * 复制代码块
 * @param {*} opts 
 * @param {*} text 
 */
const deserializeCode = (opts, text) => {
  const sep = DICT.DEFAULT_NEWLINE;
  let lines = [];
  List(text.split(sep)).map(line => {
    lines.push(
      Block.create({
        type: opts.lineType,
        nodes: [Text.create(line)]
      })
    )
  });
  const code = Block.create({
    type: opts.containerType,
    nodes: lines
  });
  return code;
}
export default deserializeCode;
