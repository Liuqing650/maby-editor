import getCurrentCode from './getCurrentCode';
import getIndent from './getIndent';

/**
 * 
 * @param {*value} value
 * @param {*object} option
 */
const getCurrentIndent = (value, option) => {
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
export default getCurrentIndent;
