import React from 'react';
import { Icon } from 'antd';

// antd > 3.9.0
const AliIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_959691_ml3wy2yq6hc.js',
});

const IconDict = {
  Header1: 'icon-header',
  Header2: 'icon-header-1',
  Header3: 'icon-header-2',
  Header4: 'icon-header-3',
  Header5: 'icon-header-',
  Header6: 'icon-header-4',
  Blockquote: 'icon-blockquote',
  HorizontalRule: 'minus',
  Bold: 'bold',
  Italic: 'italic',
  Underline: 'underline',
  Code: 'icon-mark',
  CodeBlock: 'code',
  Strike: 'strikethrough',
};
const EditorIcon = ({ type, className }) => {
  const iconType = IconDict[type];
  if (!iconType) {
    return null;
  }
  switch (iconType) {
    case 'code':
      return (<Icon type={iconType} className={className} />);
    case 'minus':
      return (<Icon type={iconType} className={className} />);
    case 'bold':
      return (<Icon type={iconType} className={className} />);
    case 'italic':
      return (<Icon type={iconType} className={className} />);
    case 'underline':
      return (<Icon type={iconType} className={className} />);
    case 'strikethrough':
      return (<Icon type={iconType} className={className} />);
    default:
      break;
  }
  return (<AliIcon type={iconType} className={className} />);
};

export default EditorIcon;
