import React from 'react';
import { LANGUAGE_OPTIONS } from '../../options';

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
      return LANGUAGE_OPTIONS.map((item, idx) => (<option key={`${item.value}-${idx}`} value={item.value}>{item.title}</option>));
    };
    return (
      <div style={{ position: 'relative' }}>
        <pre>
          <code {...attributes}>{children}</code>
        </pre>
        <div
          contentEditable={false}
          style={{ position: 'absolute', top: '5px', right: '5px' }}
        >
          <select value={syntax} onChange={(event) => { this.onChange(event.target.value); }}>
            {createOption()}
          </select>
        </div>
      </div>
    );
  }
}
export default CodeBlock;
