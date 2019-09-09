import * as React from 'react';

import { ToolBarProps } from '../../interface/editor';
import * as styles from '../../style/index.less';

import ColorPicker from '../common/ColorPicker';
import IconButtonGroup from '../common/IconButtonGroup';
import IconGroup from '../common/IconGroup';
import AliginBlock from './AliginBlock';
import CodeBlock from './CodeBlock';
import FontSize from './FontSize';

class ToolBar extends React.Component<ToolBarProps> {
  public state = {
    actionOptions: [
      {
        icon: 'icon-save',
        title: '保存',
        hotKey: 'Ctrl+S',
        type: 'save',
      },
      {
        icon: 'icon-redo',
        title: '撤销',
        hotKey: 'Ctrl+Z',
        type: 'redo',
      },
      {
        icon: 'icon-undo',
        title: '重做',
        hotKey: 'Ctrl+Shift+Z',
        type: 'undo',
      },
    ],
    baseOptions: [
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
    listOptions: [
      {
        icon: 'icon-unorderedlist',
        title: '无序列表',
        type: 'unlist',
      },
      {
        icon: 'icon-orderedlist',
        title: '有序列表',
        type: 'list',
      },
      {
        icon: 'icon-check-square',
        title: '任务列表',
        type: 'task-list',
      },
      {
        icon: 'icon-link',
        title: '插入链接',
        hotKey: 'Ctrl+K',
        type: 'link',
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
    const { baseOptions, actionOptions, fontStyle, listOptions } = this.state;
    const { visible } = this.props;
    if (!visible) {
      return null;
    }
    return (
      <div className={styles.meToolbar}>
        <div className={styles.meToolbarContent}>
          <IconGroup>
            <IconButtonGroup options={actionOptions} />
          </IconGroup>
          <IconGroup>
            <IconButtonGroup options={baseOptions} />
            <CodeBlock />
          </IconGroup>
          <FontSize />
          <IconGroup>
            <ColorPicker {...fontStyle.fontColorConfig} />
            <ColorPicker {...fontStyle.bgColorConfig} />
            <AliginBlock />
            <IconButtonGroup options={listOptions} />
          </IconGroup>
        </div>
      </div>
    );
  }
}
export default ToolBar;
