import * as React from 'react';

import { Dropdown, Icon, Menu, Tag } from 'antd';
import * as styles from '../../style/index.less';

class FontSize extends React.Component {
  public state = {
    font: 'p',
    fontSize: 14,
    config: [
      {
        name: '正文',
        key: 'p',
        options: [ 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 30, 36],
        optionTitle: '字号',
      },
      {
        name: '标题一',
        key: 'h1',
        prefix: 'H1'
      },
      {
        name: '标题二',
        key: 'h2',
        prefix: 'H2'
      },
      {
        name: '标题三',
        key: 'h3',
        prefix: 'H3'
      },
      {
        name: '标题四',
        key: 'h4',
        prefix: 'H4'
      },
      {
        name: '标题五',
        key: 'h5',
        prefix: 'H5'
      },
      {
        name: '标题六',
        key: 'h6',
        prefix: 'H6'
      },
    ],
  };
  public onMenuChange = (config: any) => {
    console.log('config------>', config);
    this.setState({font: config.key});
  }
  public renderIconBtns = (font: string) => {
    const { config } = this.state;
    const output: any = [];
    const activeConfig = config.find((cfg) => (cfg.key === font));
    config.map((item) => {
      output.push(
        <Menu.Item key={item.key}>
          <div className={styles.meIconBtn}>
            <span>{item.name} </span>
            <span>{item.prefix ? <Tag>{item.prefix}</Tag> : null}</span>
          </div>
        </Menu.Item>
      );
    });
    const menu = (<Menu onClick={this.onMenuChange}>{output}</Menu>);
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <button className={styles.meIconBtn}>
          <span className={styles.selectText}>
            {activeConfig ? activeConfig.name : '正文'}
          </span>
          <Icon type='caret-down' />
        </button>
      </Dropdown>
    );
  }
  public render() {
    const { font } = this.state;
    return (
      <div className={styles.meToolbarArea}>
        {this.renderIconBtns(font)}
      </div>
    );
  }
}
export default FontSize;
