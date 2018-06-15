import { LANGUAGE_OPTIONS } from "../../options";
/**
 * 分离代码语言
 * @param {*object} matches
 */
const splitLanguage = (matches) => {
  const before = matches.before || '';
  if (!before || !before.input || before.input.indexOf(':') === -1) {
    return false;
  }
  const input = before.input;
  const arr = input.split(':');
  if (!arr || arr.length < 2) {
    return false;
  }
  const language = arr[1];
  if (LANGUAGE_OPTIONS[language]) {
    return language;
  }
  let keyLanguage = false;
  for (let key in LANGUAGE_OPTIONS) {
    if(LANGUAGE_OPTIONS[key] === language) {
      keyLanguage = key;
      break;
    }
  }
  return keyLanguage;
};
export default splitLanguage;
