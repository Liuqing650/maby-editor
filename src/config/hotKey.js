import { isKeyHotkey } from 'is-hotkey';
import hotkeys from '../dict/hotKey';
// 设置热键
export function setHotKeys(tools) {
  let output = {};
  tools.map((item) => {
    Object.keys(hotkeys).map((key) => {
      if (item[key]) {
        output[`${key}HotKey`] = isKeyHotkey(hotkeys[key]);
      }
    })
  })
  return output;
}
/**
 * 获取热键标题
 * @param {String} toolkey 要获取热键的 toolkey
 * @return {String} hotkey
 */
export function setHotKeysTitle(toolkey) {
  let hotkey = false;
  Object.keys(hotkeys).map((key) => {
    if (toolkey === key) {
      hotkey = 'Ctrl+' + hotkeys[key].replace('mod+', '');
    }
  })
  return hotkey;
}
