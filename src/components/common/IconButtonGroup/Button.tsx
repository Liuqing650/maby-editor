import * as React from 'react';

import { Tooltip } from 'antd';
import * as styles from '../../../style/index.less';

import IconFont from '../EditorIcon';

class IconButton extends React.Component<any, {}> {
  public handleClick = (type: string, selectItem: any) => {
    if (this.props.onChange) {
      this.props.onChange(type, selectItem);
    }
  }
  public render() {
    const { config } = this.props;
    if (!config.title) {
      return (
        <button className={styles.meIconBtn} onClick={this.handleClick.bind(this, config.type, config)}>
          <span>
            <IconFont type={config.icon} icontype={config.icontype || 'iconfont'} />
          </span>
        </button>
      );
    }
    const titleDom = (
      <div style={{textAlign: 'center', fontSize: 12}}>
        <div>{config.title}</div>
        {config.hotKey ? <div>{config.hotKey}</div> : null}
      </div>
    );
    return (
      <Tooltip placement="bottom" title={titleDom}>
        <button className={styles.meIconBtn} onClick={this.handleClick.bind(this, config.type, config)}>
          <span>
            <IconFont type={config.icon} icontype={config.icontype || 'iconfont'} />
          </span>
        </button>
      </Tooltip>
    );
  }
}
export default IconButton;
