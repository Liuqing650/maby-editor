import { isKeyHotkey } from 'is-hotkey';
import hotkey from '../dict/hotKey';
// 设置热键
export function setHotKeys(tools) {
  let output = {};
  tools.map((item) => {
    Object.keys(hotkey).map((key) => {
      if (item[key]) {
        output[`${key}HotKey`] = isKeyHotkey(hotkey[key]);
      }
    })
  })
  return output;
}
