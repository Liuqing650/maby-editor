import * as React from 'react';

import { SelectProps } from '../../interface/common';
import * as styles from '../../style/index.less';
import Select from '../common/Select';

class FontSize extends React.Component {
  public state = {
    font: 'p',
    fontSize: '14px',
    fontSizeConfig: {
      related: ['p'],
      options: [ '9px', '10px', '11px', '12px', '13px', '14px', '16px', '18px', '20px', '22px', '24px', '30px', '36px'],
    },
    config: [
      {
        name: '正文',
        key: 'p',
      },
      {
        name: '标题一',
        key: 'h1',
        prefix: 'H1',
        title: 'Ctrl+1',
      },
      {
        name: '标题二',
        key: 'h2',
        prefix: 'H2',
        title: 'Ctrl+2',
      },
      {
        name: '标题三',
        key: 'h3',
        prefix: 'H3',
        title: 'Ctrl+3',
      },
      {
        name: '标题四',
        key: 'h4',
        prefix: 'H4',
        title: 'Ctrl+4',
      },
      {
        name: '标题五',
        key: 'h5',
        prefix: 'H5',
        title: 'Ctrl+5',
      },
      {
        name: '标题六',
        key: 'h6',
        prefix: 'H6',
        title: 'Ctrl+6',
      },
    ],
  };
  public onFontChange = (value: string) => {
    this.setState({font: value});
  }
  public onFontSizeChange = (value: string) => {
    console.log('value---->', value);
    this.setState({fontSize: value});
  }
  public renderFont = (font: string) => {
    const { config } = this.state;
    const selectProps: SelectProps = {
      value: font,
      defaultValue: 'p',
      options: config,
      selectedWidth: 46,
      onChange: this.onFontChange,
    };
    return (<Select {...selectProps} />);
  }
  public renderFontSize = (fontSize: string) => {
    const { fontSizeConfig, font } = this.state;
    const { options, related } = fontSizeConfig;
    const selectProps: SelectProps = {
      value: fontSize,
      defaultValue: '14px',
      options,
      placeholder: '字号',
      selectedWidth: 32,
      disabled: !related.includes(font),
      onChange: this.onFontSizeChange,
    };
    return (<Select {...selectProps} />);
  }
  public render() {
    const { font, fontSize } = this.state;
    return (
      <div className={styles.meToolbarArea}>
        {this.renderFont(font)}
        {this.renderFontSize(fontSize)}
      </div>
    );
  }
}
export default FontSize;
