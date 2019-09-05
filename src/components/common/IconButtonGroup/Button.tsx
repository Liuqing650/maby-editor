import * as React from 'react';

import { Icon, Tooltip } from 'antd';
import * as styles from '../../../style/index.less';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1289235_zpv7w23lj7c.js',
});
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
            <IconFont type={config.icon} />
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
            <IconFont type={config.icon} />
          </span>
        </button>
      </Tooltip>
    );
  }
}
export default IconButton;
