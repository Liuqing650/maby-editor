import React from 'react';
import { Select } from 'antd';
import { LANGUAGE_OPTIONS } from '../../options';

const Option = Select.Option;
class CodeBlock extends React.Component {
  componentWillMount() {
    this.onChange('txt');
  }
  onChange = (syntax) => {
    const { editor, node } = this.props;
    editor.change(c =>
      c.setNodeByKey(node.key, {
        data: { syntax }
      }));
  };
  render() {
    const { node, options, attributes, children } = this.props;
    const syntax = options.getSyntax(node);
    const createOption = () => {
      return LANGUAGE_OPTIONS.map((item, idx) => (<Option key={`${item.value}-${idx}`} value={item.value} title={item.title}>{item.title}</Option>));
    };
    return (
      <div className="code-block code-linenumber">
        <div
          contentEditable={false}
          className="code-select-box clearfix"
        >
          <div className="code-select">
            <Select
              showSearch
              value={syntax}
              style={{ width: 180 }}
              onChange={this.onChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {createOption()}
            </Select>
          </div>
        </div>
        <pre>
          <code {...attributes}>{children}</code>
        </pre>
      </div>
    );
  }
}
export default CodeBlock;
