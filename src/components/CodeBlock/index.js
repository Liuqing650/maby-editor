import React from 'react';
import { LANGUAGE_OPTIONS } from '../../options';

const CodeBlock = (props, options) => {
  const { editor, node } = props;
  const syntax = options.getSyntax(node);
  const onChange = (event) => {
    editor.change(c =>
      c.setNodeByKey(node.key, {
        data: {
          syntax: event.target.value
        }
      }));
  };
  const createOption = () => {
    return Object.keys(LANGUAGE_OPTIONS).map((key, idx) => (<option key={`${key}-${idx}`} value={key}>{LANGUAGE_OPTIONS[key]}</option>));
  };
  return (
    <div style={{ position: 'relative' }}>
      <pre>
        <code {...this.props.attributes}>{this.props.children}</code>
      </pre>
      <div
        contentEditable={false}
        style={{ position: 'absolute', top: '5px', right: '5px' }}
      >
        <select value={syntax} onChange={onChange}>
          {createOption()}
        </select>
      </div>
    </div>
  );
};
export default CodeBlock;
