import createCodeBlock from './createCodeBlock';
import onEnter from './onEnter';
import onTab from './onTab';
import onHeader from './onHeader';
import onBackspace from './onBackspace';
import onExitModel from './onExitModel';
import onSave from './onSave';
import DICT from '../static';

const MARK = 'mark';
const BLOCK = 'block';
/**
 * 工具栏按键处理
 * @param {*object} event 
 * @param {*Slate} change 
 * @param {*string} type 
 * @param {*string} tag
 * @param {*function} callback
 */
const onToolBtn = (event, change, type, tag, callback) => {
  const { value } = change;
  const handleBlock = () => {
    if (type.indexOf('header') > -1) {
      onHeader(event, change, type);
      return callback ? callback(change) : null;
    }
    switch (type) {
      case 'code-block':
        createCodeBlock(event, change);
        return callback ? callback(change) : null;
      case 'code-block':
        createCodeBlock(event, change);
        return callback ? callback(change) : null;
      case 'save':
        event.preventDefault();
        return callback ? onSave(event, callback) : null;// 保存
      default:
        break;
    }
  };
  const handleMark = () => {
    event.preventDefault();
    change.toggleMark(type);
    return callback ? callback(change) : null;
  };
  switch (tag) {
    case DICT.BLOCK:
      handleBlock();
      break;
    case DICT.MARK:
      handleMark();
      break;
    default:
      break;
  }
  return;
};
export default onToolBtn;
