import createCodeBlock from './createCodeBlock';
import onEnter from './onEnter';
import onTab from './onTab';
import onHeader from './onHeader';
import onBackspace from './onBackspace';
import onExitModel from './onExitModel';
import onSave from './onSave';

const onKeyDown = (event, change, callback) => {
  const { value } = change;
  // ctrl
  if (event.ctrlKey) {
    switch (event.key) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6': return onHeader(event, change);
      case 'm': return createCodeBlock(event, change);
      case 'Enter': return onExitModel(event, change);// 退出模式
      case 's': 
        event.preventDefault();
        return onSave(event, callback);// 保存
      default:
        break;
    }
  }
  // 无ctrl
  switch (event.key) {
    case 'Enter': return onEnter(event, change);
    case 'Tab': return onTab(event, change);
    case 'Backspace': return onBackspace(event, change);
    default:
      break;
  }
  return;
};
export default onKeyDown;
