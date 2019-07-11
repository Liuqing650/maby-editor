import * as React from 'react';

import { Icon } from 'antd';
import { ToolBarProps } from '../../interface/editor';

import './style/index';

const MeIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1289235_ajd0xaseh6k.js',
});
class ToolBar extends React.Component<ToolBarProps> {
  public render() {
    const { visible } = this.props;
    if (!visible) {
      return null;
    }
    return (
      <div className='me-toolbar-wrap'>
        ToolBar
        <MeIcon type='heart' />
      </div>
    );
  }
}
export default ToolBar;
