import { List } from 'immutable';
import { Block, Text } from 'slate';
import endsWith from 'ends-with';

const DEFAULT_INDENTATION = '  ';
const DEFAULT_NEWLINE = '\n';

export const DICT = {
  SAVE_KEY: 'mabyEditContent'
};

export const getIndent = (text, defaultValue= DEFAULT_INDENTATION) => {
    return defaultValue;
}

export const getCurrentCode = (value, option) => {
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

export const getCurrentIndent = (value, option) => {
  const currentCode = getCurrentCode(value, option);
  if (!currentCode) {
    return '';
  }
  const text = currentCode
    .getTexts()
    .map(t => t.text)
    .join('\n');
  return getIndent(text);
}

export const getCurrentItem = (option, value) => {
  const { document } = value;

  if (!value.selection.startKey) return null;
  const block = value.startBlock;
  const parent = document.getParent(block.key);
  return parent && parent.type === option.typeItem ? parent : null;
}
// 回退缩进
export const dedentLines = (change, indent, option) => {
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
export const indentLines = (change, indent, option) => {
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
// 删除代码
export const deleteCodeBlock = (change, option) => {
  const { value } = change;
  if (value.isExpanded) {
      return undefined;
  }
  const { startOffset, startText } = value;

  const currentLine = value.startBlock;
  // Detect and remove indentation at cursor
  const indent = getCurrentIndent(value, option);
  const beforeSelection = currentLine.text.slice(0, startOffset);
  if (endsWith(beforeSelection, indent)) {
    return change.deleteBackward(indent.length).focus();
  } else if (option.exitBlockType) {
    // 删除代码块的数据
    const currentCode = getCurrentCode(value, option);
    const isStartOfCode =
      startOffset === 0 && currentCode.getFirstText() === startText;
    const isEmpty =
      currentCode.nodes.size === 1 && currentLine.text.length === 0;
    if (isStartOfCode && isEmpty) {
      return change.setBlocks(option.exitBlockType, { normalize: false }).unwrapNodeByKey(currentLine.key);
    }
  }
  return undefined;
};
// 切换到下一行,并退出当前代码编辑模式
export const codeOnExit = (change, option) => {
  // Default behavior: insert an exit block
  const range = change.value.selection;

  const exitBlock = Block.create({
      type: option.exitBlockType,
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

/**
 * 检测节点类型
 * @param {*object} value 检测节点
 * @param {*array} expect 期望类型
 */
export const checkNodeType = (value, expect) => {
  let output = {};
  const expectArr = expect || [];
  output.isValid = value.blocks.some(block => {
    output.type = block.type;
    console.log('type---->', block.type);
    return expectArr.includes(block.type);
  });
  return output;
}

export const increaseItemDepth = (option, value) => {

};