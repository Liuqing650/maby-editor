
import * as utils from '../utils';

const onShiftTab = (event, change) => {
  const { value } = change;
  event.preventDefault();
  event.stopPropagation();
  const isCode = value.blocks.some(block => block.type == 'code-block');
  const type = isCode ? 'code-block' : false;
  const indent = utils.getCurrentIndent(value, type);
  return utils.dedentLines(change, indent, type);
};

const onTab = (event, change) => {
  const { value } = change;
  event.preventDefault();
  event.stopPropagation();

  const { isCollapsed } = value;
  const isCode = value.blocks.some(block => block.type == 'code-block');
  const type = isCode ? 'code-block' : false;
  const indent = utils.getCurrentIndent(value, type);
  if (isCollapsed) {
    return change.insertText(indent).focus();
  }
  return utils.indentLines(change, indent, type);
};

export const onBackspace = (event, change) => {
  const { value } = change;
  if (value.isExpanded) return;
  if (value.startOffset != 0) return;

  const { startBlock } = value;
  if (startBlock.type == 'paragraph') return;

  event.preventDefault();
  change.setBlocks('paragraph');

  if (startBlock.type == 'list-item') {
    // change.unwrapBlock('bulleted-list');
  }
  return true;
};

export const onEnter = (event, change, isExit) => {
  const { value } = change;
  const { startBlock, focusBlock,startOffset, endOffset } = value;

  if (startBlock.type === 'code-block') {
    // 删除选中的区域
    if (value.isExpanded) change.delete();
    // 连续空行则退出该模式
    if (endOffset != startBlock.text.length) {
      change.splitBlock().setBlocks('paragraph');
      return true;
    }
    // 换行
    // change.insertText('\n');
    change.insertInline('code-line')
    return true;
  } else {
    if (value.isExpanded) return;

    if (startOffset == 0 && startBlock.text.length == 0)
      return onBackspace(event, change)
    if (endOffset != startBlock.text.length) return;

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
        const isCode = value.blocks.some(block => block.type == 'code-block');
        change.setBlocks(isCode ? 'paragraph' : 'code-block');
        return true;
      }
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
        return false;
    }
  }
  // 无ctrl
  switch (event.key) {
    case 'Enter':
      return onEnter(event, change);
    case 'Tab':
      return onTab(event, change);
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