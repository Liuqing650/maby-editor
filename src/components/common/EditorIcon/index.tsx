import * as React from 'react';

import { Icon } from 'antd';
import { IconProps } from 'antd/lib/icon';

type icontype = 'antd' | 'iconfont';

interface IconFontTypeProps {
  icontype?: icontype;
}

type EditorIconProps = IconFontTypeProps & IconProps;

/**
 * 编辑器 Icon 组件封装
 *
 * @param icontype: string|antd antd的默认icon与iconfont中的图标切换变量，默认为iconfont 中的变量
 * @param IconProps ant默认配置
 */
class EditorIcon extends React.Component<EditorIconProps, {}> {
  public render() {
    const IconFont = Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1289235_elurp7ig8l.js',
    });
    if (this.props.icontype && this.props.icontype === 'antd') {
      return <Icon {...this.props} />;
    }
    return <IconFont {...this.props} />;
  }
}
export default EditorIcon;
