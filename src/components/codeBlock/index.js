import React from "react";

const CodeBlock = (props) => {
  const { editor, node } = props;
  const language = node.data.get('language') || 'js';
  const onChange = (event) => {
    editor.change(c =>
      c.setNodeByKey(node.key, { data: { language: event.target.value } })
    )
  }
  return (
    <div style={{ position: 'relative' }}>
      <pre>
        <code {...props.attributes}>{props.children}</code>
      </pre>
      <div
        contentEditable={false}
        style={{ position: 'absolute', top: '5px', right: '5px' }}
      >
        <select value={language} onChange={onChange}>
          <option value="css">CSS</option>
          <option value="js">JavaScript</option>
          <option value="html">HTML</option>
        </select>
      </div>
    </div>
  )
};
export default CodeBlock;
