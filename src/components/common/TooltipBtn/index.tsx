import * as React from 'react';

import { Icon, Tooltip } from 'antd';
import classnames from 'classnames';
import { IconBtnProps } from '../../../interface/common';
import * as styles from '../../../style/index.less';

class TooltipBtn extends React.Component<IconBtnProps, {}> {
  public static defaultProps = {
    disable: false,
  };
  public handleClick = (value: string, item: any) => {
    if (this.props.onClick) {
      this.props.onClick(value, item);
    }
  }
  public renderIconBtns = () => {
    const { options, active, defaultActive, disabled } = this.props;
    const output: any = [];
    const IconFont = Icon.createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1289235_lh0oenixe6.js',
    });
    const activeValue = active || defaultActive;
    options.map((item, index) => {
      const titleDom = (
        <div style={{ textAlign: 'center', fontSize: 12 }}>
          <div>{item.name}</div>
          {item.hotKey ? <div>{item.hotKey}</div> : null}
        </div>
      );
      const btnCssName = classnames(styles.meIconBtn, {
        [styles.iconActive]: activeValue && activeValue.length > 0 ? activeValue.includes(item.value) : false,
        [styles.mbBtnDisabled]: disabled,
      });
      output.push(
        <Tooltip key={`icon-${index}`} placement='bottom' title={titleDom}>
          <button className={btnCssName} onClick={this.handleClick.bind(this, item.value, item)}>
            <span>
              <IconFont type={item.icon} style={{ fontWeight: 700 }} />
            </span>
          </button>
        </Tooltip>
      );
    });
    return output;
  }
  public render() {
    return (
      <React.Fragment>
        {this.renderIconBtns()}
      </React.Fragment>
    );
  }
}
export default TooltipBtn;
