import { Document } from 'slate';
import { getEventTransfer } from 'slate-react';
import detectIndent from 'detect-indent';
import { onTab as onListTab } from '../handlers';
import * as utils from '../utils';

const CODEOPTIONS = {
  lineType: 'code-line',
  containerType: 'code-block',
  exitBlockType: 'paragraph'
};
const LISTOPTIONS = {
  types: ['ul_list', 'ol_list'],
  typeItem: 'list_item',
  typeDefault: 'paragraph'
};
const onShiftTab = (event, change) => {
  const { value } = change;
  event.preventDefault();
  event.stopPropagation();
  const { isCollapsed } = value;
  const isCodeLine = value.blocks.some(block => block.type === 'code-line');
  const isCodeBlock = value.blocks.some(block => block.type === 'code-block');
  // const type = isCodeLine ? 'code-line' : isCodeBlock ? 'code-block' : false;
  const type = isCodeLine ? 'code-block' : isCodeBlock ? 'code-block' : false;
  // const indent = utils.getCurrentIndent(value, type);
  const indent = utils.getCurrentIndent(value, CODEOPTIONS);
  // if (isCollapsed) { // 选中的单行
  //   return change.insertText(indent).focus();
  // }
  // return utils.dedentLines(change, indent, type);
  return utils.dedentLines(change, indent, CODEOPTIONS);
};

const onTab = (event, change) => {
  const { value } = change;
  event.preventDefault();

  const { isCollapsed } = value;
  const nodeTypeInfo = utils.checkNodeType(value, ['code-line', 'code-block']);
  console.log('nodeTypeInfo----->', nodeTypeInfo);
  if (nodeTypeInfo.isValid) {
    const indent = utils.getCurrentIndent(value, CODEOPTIONS);
    if (isCollapsed) { // 选中的单行
      return change.insertText(indent).focus();
    }
    return utils.indentLines(change, indent, CODEOPTIONS);
  } else {
    return onListTab(event, change, LISTOPTIONS);
    // if (!isCollapsed || !utils.getCurrentItem(LISTOPTIONS, value)) {
    //   return undefined;
    // }
    // if (event.shiftKey) {
    //   event.preventDefault();

    //   return decreaseItemDepth(opts, change);
    // }
    // return utils.increaseItemDepth(LISTOPTIONS, change);
  }
  return undefined;
};

export const onBackspace = (event, change) => {
  const { value } = change;
  if (value.isExpanded) return;
  if (value.startOffset != 0) return;

  const { startBlock } = value;
  if (startBlock.type == 'paragraph') return;

  const nodeTypeInfo = utils.checkNodeType(value, ['code-line', 'code-block']);
  console.log('nodeTypeInfo====>', nodeTypeInfo);
  if (nodeTypeInfo.isValid) {
    event.preventDefault();
    return utils.deleteCodeBlock(change, CODEOPTIONS);
  } else if (startBlock.type == 'list-item') {
    // change.unwrapBlock('bulleted-list');
  } else {
    event.preventDefault();
    change.setBlocks('paragraph');
    return true;
  }
  return undefined;
};

export const onEnter = (event, change) => {
  const { value } = change;
  const { startBlock, focusBlock,startOffset, endOffset } = value;
  if (startBlock.type === 'code-block' || startBlock.type === 'code-line') {
    // 删除选中的区域
    if (value.isExpanded) change.delete();
    // 换行
    // change.insertText('\n');
    change.splitBlock().insertText('');
    return true;
  } else {
    if (value.isExpanded) return;

    if (startOffset == 0 && startBlock.text.length == 0)
      return onBackspace(event, change)
    if (endOffset !== startBlock.text.length) return;

    // 其他块状化退出效果
    if (
      startBlock.type != 'header-one' &&
      startBlock.type != 'header-two' &&
      startBlock.type != 'header-three' &&
      startBlock.type != 'header-four' &&
      startBlock.type != 'header-five' &&
      startBlock.type != 'header-six' &&
      startBlock.type != 'block-quote'
    ) {
      return
    }
  }
  event.preventDefault()
  change.splitBlock().setBlocks('paragraph')
  return true
};

// 定义一个新的回调函数，在按键时记录下按下的 key code。
export const onKeyDown = (event, change, callback) => {
  const { value } = change;
  // shift  
  if (event.shiftKey) {
    switch (event.key) {
      case 'Tab':
        return onShiftTab(event, change);
      default:
        break;
    }
  }
  // ctrl
  if (event.ctrlKey) {
    switch (event.key) {
      case 'm': {
        event.preventDefault();
        const nodeTypeInfo = utils.checkNodeType(value, ['code-line', 'code-block']);
        if (!nodeTypeInfo.isValid) {
          change.setBlocks('code-block');
          return true;
        }
        
      }
      case 'Enter': // 退出该模式
        const isCodeLine = value.blocks.some(block => block.type === 'code-line');
        const isCodeBlock = value.blocks.some(block => block.type === 'code-block');
        const type = isCodeLine ? 'code-line' : isCodeBlock ? 'code-block' : false;
        if (type) { // 代码块需特殊形式退出
          utils.codeOnExit(change, CODEOPTIONS);
        } else {
          event.preventDefault();
          change.splitBlock().setBlocks('paragraph');
        }
        return true;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6': {
        event.preventDefault();
        const dict = {
          '1': 'header-one',
          '2': 'header-two',
          '3': 'header-three',
          '4': 'header-four',
          '5': 'header-five',
          '6': 'header-six',
        };
        const isCode = change.value.blocks.some(block => block.type == dict[event.key]);
        change.setBlocks(isCode ? 'paragraph' : dict[event.key]);
        return true;
      }
      case 's': {
        event.preventDefault();
        callback();
        return true;
      }
      default:
        break;
    }
  }
  // 无ctrl
  switch (event.key) {
    case 'Enter':
      return onEnter(event, change);
    case 'Tab':
      return onTab(event, change);
    case 'Backspace':
      return onBackspace(event, change);
    default:
      break;
  }
  return;
};

export const MarkHotkey = (options) => {
  const { type, key } = options;
  return {
    onKeyDown(event, change) {
      if (!event.ctrlKey || event.key != key) return;
      event.preventDefault();
      change.toggleMark(type)
      return true
    },
  };
}

// 复制
export const onPaste = (event, change) => {
  const { value } = change;
  const { startBlock, endBlock } = value;
  if (startBlock.type !== 'code-line') return;
  const opts = CODEOPTIONS;
  const data = getEventTransfer(event);
  const currentCode = utils.getCurrentCode(value, opts);

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

  const lines = utils.deserializeCode(opts, text).nodes;

  const fragment = Document.create({ nodes: lines });

  return change.insertFragment(fragment);
}
