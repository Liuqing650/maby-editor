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
  HorizontalRule: 'icon-hr',
  Bold: 'icon-bold',
  Italic: 'icon-italic',
  Code: 'icon-mark',
  CodeBlock: 'icon-code',
  Strike: 'icon-strike',
};

const EditorIcon = ({ type, className }) => {
  const iconType = IconDict[type];
  if (!iconType) {
    return null;
  }
  return (<AliIcon type={iconType} className={className} />);
};

export default EditorIcon;
