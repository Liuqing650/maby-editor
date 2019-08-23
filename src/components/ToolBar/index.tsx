import * as React from 'react';

import { ToolBarProps } from '../../interface/editor';
import * as styles from '../../style/index.less';

import BaseTool from './BaseTool';
import FontSize from './FontSize';

class ToolBar extends React.Component<ToolBarProps> {
  public render() {
    const { visible } = this.props;
    if (!visible) {
      return null;
    }
    return (
      <div className={styles.meToolbar}>
        <div className={styles.meToolbarContent}>
          <div>
            <BaseTool />
            <FontSize />
          </div>
        </div>
      </div>
    );
  }
}
export default ToolBar;
