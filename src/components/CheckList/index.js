import React from 'react';
import { Checkbox } from 'antd';

const CheckList = (props) => {
  const { editor, attributes, children, node, readOnly } = props;
  const checked = node.data.get('checked');
  const onChecked = event => {
    const checked = event.target.checked;
    editor.setNodeByKey(node.key, { data: { checked } });
  };
  return (
    <div {...attributes}>
      <Checkbox onChange={onChecked} contentEditable={false} checked={checked} />
      <div contentEditable={!readOnly}>
        {children}
      </div>
    </div>
  );
};
export default CheckList;
