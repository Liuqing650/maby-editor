import { CODE_BLOCK_OPTIONS } from '../options';
import { CommonUtil, CodeUtil } from '../utils';

// code类型的tab
const codeOnTab = (event, change, opts) => {
	const { value } = change;
	const { isCollapsed } = value;
	const indent = CodeUtil.getCurrentIndent(value, CODE_BLOCK_OPTIONS);
	// Shift+tab
	if (event.shiftKey) {
		event.preventDefault();
  	event.stopPropagation();
    return CodeUtil.dedentLines(change, indent, CODE_BLOCK_OPTIONS);
	}

	if (isCollapsed) { // 选中的单行
		event.preventDefault();
		return change.insertText(indent).focus();
	}
  event.preventDefault();
	return CodeUtil.indentLines(change, indent, CODE_BLOCK_OPTIONS);
};

function onTab(event, change, opts) {
	const { value } = change;
	// 判断是否是代码行
	const nodeType = CommonUtil.getNodeType(value);
	switch (nodeType.ntype) {
		case 'code':
			return codeOnTab(event, change, opts);
		default:
			return undefined;
	}
}
export default onTab;
