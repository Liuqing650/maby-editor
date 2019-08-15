import * as React from 'react';

import { Icon, Tooltip } from 'antd';
import { ToolBarProps } from '../../interface/editor';
import * as styles from '../../style/index.less';

import FontSize from './FontSize';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1289235_ajd0xaseh6k.js',
});
class ToolBar extends React.Component<ToolBarProps> {
  public state = {
    options: [
      {
        icon: 'icon-yinyongkuai-copy-copy',
        name: '插入引用',
      },
      {
        icon: 'icon-codeblock-copy-copy-copy',
        name: '插入代码块',
      },
      {
        icon: 'icon-code',
        name: '行内代码',
      },
      {
        icon: 'icon-line',
        name: '插入分割线',
      },
      {
        icon: 'icon-bold',
        name: '加粗',
        hotKey: 'Ctrl+B',
      },
      {
        icon: 'icon-italic',
        name: '斜体',
        hotKey: 'Ctrl+I',
      },
      {
        icon: 'icon-strikethrough',
        name: '删除线',
        hotKey: 'Ctrl+Shift+X',
      },
      {
        icon: 'icon-underline',
        name: '下划线',
        hotKey: 'Ctrl+U',
      },
    ],
  };
  public renderIconBtns = () => {
    const { options } = this.state;
    const output: any = [];
    options.map((item, index) => {
      const titleDom = (
        <div style={{textAlign: 'center', fontSize: 12}}>
          <div>{item.name}</div>
          {item.hotKey ? <div>{item.hotKey}</div> : null}
        </div>
      );
      output.push(
        <Tooltip key={`icon-${index}`} placement='bottom' title={titleDom}>
          <button className={styles.meIconBtn}>
            <span>
              <IconFont type={item.icon} />
            </span>
          </button>
        </Tooltip>
      );
    });
    return output;
  }
  public render() {
    const { visible } = this.props;
    if (!visible) {
      return null;
    }
    return (
      <div className={styles.meToolbar}>
        <div className={styles.meToolbarContent}>
          <div>
            <div className={styles.meToolbarArea}>
              {this.renderIconBtns()}
            </div>
            <FontSize />
          </div>
        </div>
      </div>
    );
  }
}
export default ToolBar;
