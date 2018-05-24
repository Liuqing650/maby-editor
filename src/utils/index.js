import detectIndent from 'detect-indent';

const DEFAULT_INDENTATION = '  ';

export const DICT = {
  SAVE_KEY: 'mabyEditContent'
};

export const getIndent = (text, defaultValue= DEFAULT_INDENTATION) => {
    return detectIndent(text).indent || defaultValue;
}

export const getCurrentCode = (value, type) => {
  const { document } = value;

  let currentBlock;
  if (!value.selection.startKey) return null;
  currentBlock = value.startBlock;
  const parent = document.getParent(currentBlock.key);
  // if (parent && parent.type === type) {
  //     return parent;
  // }
  return parent;
};

export const getCurrentIndent = (value, type) => {
  const currentCode = getCurrentCode(value, type);
  if (!currentCode) {
    return '';
  }
  const text = currentCode
      .getTexts()
      .map(t => t.text)
      .join('\n');
  return getIndent(text);
}

export const dedentLines = (change, indent, type) => {
  const { value } = change;
  const { document, selection } = value;
  const lines = document
      .getBlocksAtRange(selection)
      .filter(node => node.type === type);

  return lines.reduce((c, line) => {
      const text = line.nodes.first();
      const lengthToRemove = text.characters
          .takeWhile((char, index) => indent.charAt(index) === char.text)
          .count();
      return c.removeTextByKey(text.key, 0, lengthToRemove);
  }, change);
};

export const indentLines = (change, indent, type) => {
  const { value } = change;
  const { document, selection } = value;
  const lines = document
      .getBlocksAtRange(selection)
      .filter(node => node.type === type);
  return lines.reduce((c, line) => {
    const text = line.nodes.first();
    return c.insertTextByKey(text.key, 0, indent);
  }, change);
};
