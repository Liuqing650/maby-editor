import * as React from 'react';

import { SelectProps } from '../../interface/common';
import Select from '../common/Select';

import IconFont from '../common/EditorIcon';

class AliginBlock extends React.Component {
  public state = {
    value: '',
  };
  public getOptions = () => ([
    {
      name: '左对齐',
      key: 'align-left',
      prefix: <IconFont type="icon-align-left" />,
    },
    {
      name: '居中对齐',
      key: 'align-center',
      prefix: <IconFont type="icon-align-center" />,
    },
    {
      name: '右对齐',
      key: 'align-right',
      prefix: <IconFont type="icon-align-right" />,
    },
    {
      name: '两端对齐',
      key: 'align-side',
      prefix: <IconFont type="icon-menu" />,
    },
  ])
  public onChange = (value: string) => {
    this.setState({value});
  }
  public render() {
    const { value } = this.state;
    const selectProps: SelectProps = {
      value,
      options: this.getOptions(),
      title: '对齐方式',
      selectedValue: <IconFont type="icon-align-left" style={{fontSize: 18}} />,
      selectedWidth: 26,
      onChange: this.onChange,
    };
    return (
      <Select {...selectProps} />
    );
  }
}
export default AliginBlock;
