import * as React from 'react';

import { ToolBarProps } from '../../interface/editor';
import * as styles from '../../style/index.less';

import ColorPicker from '../common/ColorPicker';
import IconButtonGroup from '../common/IconButtonGroup';
import IconGroup from '../common/IconGroup';
import FontSize from './FontSize';

class ToolBar extends React.Component<ToolBarProps> {
  public state = {
    options: [
      {
        icon: 'icon-yinyongkuai-copy-copy',
        title: '插入引用',
        type: 'blockquote'
      },
      {
        icon: 'icon-codeblock-copy-copy-copy',
        title: '插入代码块',
        type: 'code-block',
      },
      {
        icon: 'icon-code',
        title: '行内代码',
        type: 'code-line',
      },
      {
        icon: 'icon-line',
        title: '插入分割线',
        type: 'hr',
      },
      {
        icon: 'icon-bold',
        title: '加粗',
        hotKey: 'Ctrl+B',
        type: 'bold',
      },
      {
        icon: 'icon-italic',
        title: '斜体',
        hotKey: 'Ctrl+I',
        type: 'italic',
      },
      {
        icon: 'icon-strikethrough',
        title: '删除线',
        hotKey: 'Ctrl+Shift+X',
        type: 'del',
      },
      {
        icon: 'icon-underline',
        title: '下划线',
        hotKey: 'Ctrl+U',
        type: 'underline',
      },
    ],
    fontStyle: {
      fontColorConfig: {
        icon: 'icon-font-color',
        type: 'FONT_COLOR',
        defaultColor: '#222222',
        title: '前景色',
      },
      bgColorConfig: {
        icon: 'icon-highlight',
        type: 'FONT_COLOR_BG',
        defaultColor: 'transparent',
        title: '背景色',
      }
    }
  };
  public render() {
    const { options, fontStyle } = this.state;
    const { visible } = this.props;
    if (!visible) {
      return null;
    }
    return (
      <div className={styles.meToolbar}>
        <div className={styles.meToolbarContent}>
          <div>
            <IconButtonGroup options={options} />
            <FontSize />
            <IconGroup>
              <ColorPicker {...fontStyle.fontColorConfig} />
              <ColorPicker {...fontStyle.bgColorConfig} />
            </IconGroup>
          </div>
        </div>
      </div>
    );
  }
}
export default ToolBar;
