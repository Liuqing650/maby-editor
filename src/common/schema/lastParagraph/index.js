import { LAST_CHILD_TYPE_INVALID } from 'slate-schema-violations';
import { Block } from 'slate';

const schema = (opts) => {
  return {
    document: {
      last: { types: ['paragraph'] },
      normalize: (change, reason, { node, child }) => {
        switch (reason) {
          case LAST_CHILD_TYPE_INVALID: {
            const paragraph = Block.create('paragraph');
            return createParagraphLine(change, node, paragraph, opts.line || 1);
          }
        }
      },
    },
  };
};
const createParagraphLine = (change, node, paragraph, line = 1) => {
  if (!line || typeof line !== 'number') {
    return change.insertNodeByKey(node.key, node.nodes.size, paragraph);
  }
  while (line) {
    change.insertNodeByKey(node.key, node.nodes.size, paragraph);
    line--;
  }
  return change;
};
export default schema;
