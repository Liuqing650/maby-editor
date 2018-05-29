import { CODE_BLOCK_OPTIONS, LIST_OPTIONS} from '../options';
import { Common, Code, ListFn } from '../utils';
import onShiftTab from './onShiftTab';
import onEnter from './onEnter';
import onTab from './onTab';
import onBackspace from './onBackspace';

const headerDict = {
  '1': 'header-one',
  '2': 'header-two',
  '3': 'header-three',
  '4': 'header-four',
  '5': 'header-five',
  '6': 'header-six',
};
export default onKeyDown = (event, change, callback) => {
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
        const nodeTypeInfo = Common.checkNodeType(value, ['code-line', 'code-block']);
        if (!nodeTypeInfo.isValid) {
          change.setBlocks('code-block');
          return true;
        }
        
      }
      case 'Enter': // 退出该模式
        const nodeTypeInfo = Common.checkNodeType(value, ['code-line', 'code-block']);
        if (nodeTypeInfo.isValid) { // 代码块需特殊形式退出
          Code.exitCodeBlock(change, CODE_BLOCK_OPTIONS);
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
        const isHeader = change.value.blocks.some(block => block.type == headerDict[event.key]);
        change.setBlocks(isHeader ? 'paragraph' : headerDict[event.key]);
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
