import * as React from 'react';

import { Dropdown, Icon, Menu, Tag, Tooltip } from 'antd';
import classnames from 'classnames';
import { SelectProps } from '../../../interface/common';
import * as styles from '../../../style/index.less';

import IconFont from '../EditorIcon';

class Select extends React.Component<SelectProps, {}> {
  public static defaultProps = {
    disabled: false,
    selectedWidth: 60,
    placeholder: '请选择',
  };
  public state = {
    visible: false,
  };
  public onMenuChange = (config: any) => {
    if (this.props.onChange) {
      this.props.onChange(config.key, config);
    }
  }
  public handleTooltipChange = (visible: boolean): void => {
    this.setState({visible});
  }
  public handleDropdownChange = (): void => {
    this.handleTooltipChange(false);
  }
  public renderActiveDom = (isActive: boolean) => {
    if (!isActive) {
      return null;
    }
    return (
      <div>
        <span className={styles.selectActiveCheck}>
          <IconFont type="check" icontype="antd" />
        </span>
      </div>
    );
  }
  public renderIconBtns = () => {
    const { options, value, defaultValue, selectedWidth, disabled, placeholder, title } = this.props;
    const selectValue = value || defaultValue;
    const output: any = [];
    const self = this;
    const activeOptions = options.find((cfg) => {
      if (typeof cfg !== 'object') {
        return cfg === selectValue;
      }
      return cfg.key === selectValue;
    });
    let activeText = placeholder;
    if (activeOptions) {
      activeText = typeof activeOptions !== 'object' ? activeOptions : activeOptions.name;
    }
    options.map((item) => {
      if (typeof item !== 'object') {
        const isActive = item === selectValue;
        output.push(
          <Menu.Item key={item}>
            <div className={styles.mbSelectOptionBtn}>
              <div className={styles.selectItem}>
                <span>{item}</span>
              </div>
              {self.renderActiveDom(isActive)}
            </div>
          </Menu.Item>
        );
      } else {
        const isActive = item.key === selectValue;
        output.push(
          <Menu.Item key={item.key}>
            <Tooltip placement="right" title={item.title}>
              <div className={styles.mbSelectOptionBtn}>
                <div className={styles.selectItem}>
                  <span>{item.prefix ? <Tag>{item.prefix}</Tag> : null}</span>
                  <span>{item.name} </span>
                </div>
                {self.renderActiveDom(isActive)}
              </div>
            </Tooltip>
          </Menu.Item>
        );
      }
    });
    const menu = (<Menu onClick={this.onMenuChange}>{output}</Menu>);
    const btnCssName = classnames(styles.meIconBtn, { [styles.mbBtnDisabled]: disabled });
    return (
      <Dropdown
        overlay={menu}
        trigger={['click']}
        disabled={disabled}
        onVisibleChange={this.handleDropdownChange}
      >
        <Tooltip
          placement="bottom"
          visible={this.state.visible}
          onVisibleChange={this.handleTooltipChange}
          title={title}
        >
          <button className={btnCssName}>
            <span className={styles.selectText} style={{width: selectedWidth}}>
              {this.props.selectedValue || activeText}
            </span>
            <Icon type="caret-down" className={styles.mbSelectBtnIndicator} />
          </button>
        </Tooltip>
      </Dropdown>
    );
  }
  public render() {
    return (
      <React.Fragment>
        {this.renderIconBtns()}
      </React.Fragment>
    );
  }
}
export default Select;
