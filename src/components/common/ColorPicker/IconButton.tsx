import * as React from 'react';

import { Tooltip } from 'antd';
import classnames from 'classnames';
import * as styles from '../../../style/index.less';

import IconFont from '../EditorIcon';

class IconButton extends React.Component<any, {}> {
  public state = {
    visible: false,
  };
  public handleClick = (type: string, selectItem: any) => {
    this.handleTooltipChange(false);
    if (this.props.onChange) {
      this.props.onChange(type, selectItem);
    }
  }
  public handleTooltipChange = (visible: boolean): void => {
    this.setState({visible});
  }
  public render() {
    const { config, color } = this.props;
    const btnCssName = classnames({ [styles.meIconColor]: !!color, [styles.meIconBtn]: !color });
    return (
      <Tooltip
        placement="bottom"
        visible={this.state.visible}
        onVisibleChange={this.handleTooltipChange}
        title={config.title}
      >
        <button className={btnCssName} onClick={this.handleClick.bind(this, config.type, config)}>
          <span className={styles.bgColorIcon} >
            <IconFont type={config.icon} />
          </span>
          <span className={styles.bgColorBox} style={{backgroundColor: color}} />
        </button>
      </Tooltip>
    );
  }
}
export default IconButton;
