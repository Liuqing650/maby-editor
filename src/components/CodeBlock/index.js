import React from 'react';
import { Select, Icon } from 'antd';
import options, { LANGUAGE_OPTIONS } from '../../options';
import { editCodePlugin } from '../../plugins/import';

const { BLOCKS } = options;

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
  onHandleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const { editor } = this.props;
    editor.change(change => {
      editCodePlugin.changes.unwrapCodeBlock(change, BLOCKS.PARAGRAPH);
      return change;
    });
  };
  renderDeleteIcon = () => {
    const deleteProps = {
      className: 'code-delete',
      onClick: this.onHandleDelete
    };
    return (
      <span {...deleteProps}>
        <Icon type="delete" />
      </span>
    );
  };
  render() {
    const { node, options, attributes, children } = this.props;
    const syntax = options.getSyntax(node);
    const createOption = () => {
      return LANGUAGE_OPTIONS.map((item, idx) => (<Option key={`${item.value}-${idx}`} value={item.value} title={item.title}>{item.title}</Option>));
    };
    return (
      <div className="code-block code-linenumber" {...attributes}>
        <div
          contentEditable={false}
          className="code-select-box clearfix"
        >
          {this.renderDeleteIcon()}
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
          <code>{children}</code>
        </pre>
      </div>
    );
  }
}
export default CodeBlock;
