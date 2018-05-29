import { CommonUtil, CodeUtil } from '../utils';

const createCodeBlock = (event, change) => {
  const { value } = change;
  event.preventDefault();
  const nodeTypeInfo = CommonUtil.checkNodeType(value, ['code-line', 'code-block']);
  if (!nodeTypeInfo.isValid) {
    change.setBlocks('code-block');
    return true;
  }
};
export default createCodeBlock;
