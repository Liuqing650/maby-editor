import { List } from 'immutable';
import { Block, Text } from 'slate';

const DEFAULT_INDENTATION = '  ';
const DEFAULT_NEWLINE = '\n';

export const DICT = {
  SAVE_KEY: 'mabyEditContent'
};

export const getIndent = (text, defaultValue= DEFAULT_INDENTATION) => {
    return defaultValue;
}

export const getCurrentCode = (value, type, option) => {
  const { document } = value;

  let currentBlock;
  if (!value.selection.startKey) return null;
  currentBlock = value.startBlock;
  // const nodes = document.getChild(currentBlock.key);
  const nodes = document.getParent(currentBlock.key);
  
  if (nodes && nodes.type === option.containerType) {
      return nodes;
  }
  return false;
};

export const getCurrentIndent = (value, type, option) => {
  const currentCode = getCurrentCode(value, type, option);
  if (!currentCode) {
    return '';
  }
  const text = currentCode
    .getTexts()
    .map(t => t.text)
    .join('\n');
  return getIndent(text);
}
// 回退缩进
export const dedentLines = (change, indent, type, option) => {
  const { value } = change;
  const { document, selection } = value;
  const lines = document
      .getBlocksAtRange(selection)
      .filter(node => node.type === option.lineType);
      // .filter(node => node.type === type);

  return lines.reduce((c, line) => {
      const text = line.nodes.first();
      const lengthToRemove = text.characters
          .takeWhile((char, index) => indent.charAt(index) === char.text)
          .count();
      return c.removeTextByKey(text.key, 0, lengthToRemove);
  }, change);
};
// 多行缩进
export const indentLines = (change, indent, type, option) => {
  const { value } = change;
  const { document, selection } = value;
  const lines = document
      .getBlocksAtRange(selection)
      .filter(node => {
        // return node.type === type;
        return node.type === option.lineType;
      });
  return lines.reduce((c, line) => {
    const text = line.nodes.first();
    return c.insertTextByKey(text.key, 0, indent);
  }, change);
};

export const codeOnExit = (change) => {
  // Default behavior: insert an exit block
  const range = change.value.selection;

  const exitBlock = Block.create({
      type: 'paragraph',
      nodes: [Text.create()]
  });
  change.deleteAtRange(range, { normalize: false });
  change.insertBlockAtRange(change.value.selection, exitBlock, {
      normalize: false
  });
  // Exit the code block
  change.unwrapNodeByKey(exitBlock.key);

  return change.collapseToStartOf(exitBlock);
}
// 包含文本的复制
export const deserializeCode = (opts, text) => {
  const sep = DEFAULT_NEWLINE;
  let lines = [];
  List(text.split(sep)).map(line => {
    lines.push(
      Block.create({
        type: opts.lineType,
        nodes: [Text.create(line)]
      })
    )
  }
  );

  const code = Block.create({
    type: opts.containerType,
    nodes: lines
  });

  return code;
}
