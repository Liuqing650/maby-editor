import React from "react";

const CheckListBlock = (props) => {
  const { attributes, children, node } = this.props;
  const checked = node.data.get('checked');
  return (
    <div
      className={`check-list-item ${checked ? 'checked' : ''}`}
      contentEditable={false}
      {...attributes}
    >
      <span>
        <input
          type="checkbox"
          checked={checked}
          onChange={this.onChange}
        />
      </span>
      <span contentEditable suppressContentEditableWarning>
        {children}
      </span>
    </div>
  )
};
export default CheckListBlock;
