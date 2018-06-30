import { Block } from 'slate';
import {
  LAST_CHILD_TYPE_INVALID,
} from 'slate-schema-violations';

const schema = {
  document: {
    last: { types: ['paragraph'] },
    normalize: (change, reason, { node, child }) => {
      switch (reason) {
        case LAST_CHILD_TYPE_INVALID: {
          const paragraph = Block.create('paragraph')
          return createPargraph(change, node, paragraph, 2);
        }
      }
    },
  },
}
const createPargraph = (change, node, block, max = 6) => {
  for (let i = 0; i < max; i++) {
    change.insertNodeByKey(node.key, node.nodes.size, block)
  };
  return true;
};
export default schema;
