import * as React from 'react';

import { SelectProps } from '../../interface/common';
import Select from '../common/Select';

import IconFont from '../common/EditorIcon';

class CodeBlock extends React.Component {
  public state = {
    value: '',
  };
  public getOptions = () => ([
    {
      name: '插入代码块',
      key: 'code-block',
      prefix: <IconFont type="icon-codeblock-copy-copy-copy" />,
    },
    {
      name: '行内代码',
      key: 'code',
      prefix: <IconFont type="icon-code" />,
    },
    {
      name: '插入引用',
      key: 'blockquote',
      prefix: <IconFont type="icon-yinyongkuai-copy-copy" />,
    },
    {
      name: '插入分割线',
      key: 'hr',
      prefix: <IconFont type="icon-line" />,
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
      title: '更多样式',
      selectedValue: <IconFont type="icon-chajian-zitiyangshi" style={{fontSize: 18}} />,
      selectedWidth: 26,
      onChange: this.onChange,
    };
    return (
      <Select {...selectProps} />
    );
  }
}
export default CodeBlock;
