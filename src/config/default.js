import _tool from '../dict/tool';
export default {
  tools: [ // 工具栏
    { 'bold': '加粗', 'icon': 'icon-bold' },
    { 'italic': '倾斜', 'icon': 'icon-italic' },
    { 'underlined': '下划线', 'icon': 'icon-underline' },
    { 'code': '代码块', 'icon': 'icon-insert_tag_field' },
    { 'header': '标题', 'dict': _tool.header},
  ],
  value: '', // 编辑器的值
  mode: 'json', // 当前输入/输出模式 'text' | 'json' | 'html' | 'markdown'
};
