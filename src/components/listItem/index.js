import React from "react";

const ListItem = (props) => {
  const { attributes, children, node, editor, plugin } = props;
  const isCurrentItem = plugin.utils
    .getItemsAtRange(editor.value)
    .contains(node);
  return (
    <li
      className={isCurrentItem ? 'current-item' : ''}
      title={isCurrentItem ? 'Current Item' : ''}
      {...props.attributes}
    >
      {props.children}
    </li>
  );
};
export default ListItem;
