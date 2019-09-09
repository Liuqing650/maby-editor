import * as React from 'react';

import { IconBtnProps } from '../../interface/common';
import * as styles from '../../style/index.less';
import TooltipBtn from '../common/TooltipBtn';

class BaseTool extends React.Component {
  public state = {
    options: [
      {
        icon: 'icon-yinyongkuai-copy-copy',
        name: '插入引用',
        value: 'BLOCKQUOTE',
      },
      {
        icon: 'icon-codeblock-copy',
        name: '插入代码块',
        value: 'CODE_BLOCK',
      },
      {
        icon: 'icon-code',
        name: '行内代码',
        value: 'CODE_LINE',
      },
      {
        icon: 'icon-line',
        name: '插入分割线',
        value: 'HR',
      },
      {
        icon: 'icon-bold',
        name: '加粗',
        hotKey: 'Ctrl+B',
        value: 'BOLD',
      },
      {
        icon: 'icon-italic',
        name: '斜体',
        hotKey: 'Ctrl+I',
        value: 'ITALIC',
      },
      {
        icon: 'icon-underline',
        name: '下划线',
        hotKey: 'Ctrl+U',
        value: 'UNDERLINE',
      },
      {
        icon: 'icon-strikethrough',
        name: '删除线',
        hotKey: 'Ctrl+Shift+X',
        value: 'STRIKETHROUGH',
      },
    ],
  };
  public render() {
    const tooltipProps: IconBtnProps = {
      options: this.state.options,
      defaultActive: ['STRIKETHROUGH'],
    };
    return (
      <div className={styles.meToolbarArea}>
        <TooltipBtn {...tooltipProps} />
      </div>
    );
  }
}
export default BaseTool;
