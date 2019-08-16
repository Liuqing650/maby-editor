import * as React from 'react';

import { Dropdown, Icon, Menu, Tag } from 'antd';
import classnames from 'classnames';
import { SelectProps } from '../../../interface/common';
import * as styles from '../../../style/index.less';

class Select extends React.Component<SelectProps, {}> {
  public static defaultProps = {
    disabled: false,
    selectedWidth: 60,
    placeholder: '请选择',
  };
  public onMenuChange = (config: any) => {
    if (this.props.onChange) {
      this.props.onChange(config.key, config);
    }
  }
  public renderIconBtns = () => {
    const { options, value, defaultValue, selectedWidth, disabled, placeholder } = this.props;
    const selectValue = value || defaultValue;
    const output: any = [];
    const activeOptions = options.find((cfg) => {
      if (typeof cfg !== 'object') {
        return cfg === selectValue;
      }
      return cfg.key === selectValue;
    });
    options.map((item) => {
      if (typeof item !== 'object') {
        output.push(
          <Menu.Item key={item}>
            <div className={styles.mbSelectBtn}>
              <span>{item}</span>
            </div>
          </Menu.Item>
        );
      } else {
        output.push(
          <Menu.Item key={item.key}>
            <div className={styles.mbSelectBtn}>
              <span>{item.name} </span>
              <span>{item.prefix ? <Tag>{item.prefix}</Tag> : null}</span>
            </div>
          </Menu.Item>
        );
      }
    });
    const menu = (<Menu onClick={this.onMenuChange}>{output}</Menu>);
    const btnCssName = classnames(styles.mbSelectBtn, { [styles.mbBtnDisabled]: disabled });
    let activeText = placeholder;
    if (activeOptions) {
      activeText = typeof activeOptions !== 'object' ? activeOptions : activeOptions.name;
    }
    return (
      <Dropdown overlay={menu} trigger={['click']} disabled={disabled}>
        <button className={btnCssName}>
          <span className={styles.selectText} style={{width: selectedWidth}}>
            {activeText}
          </span>
          <Icon type='caret-down' />
        </button>
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
