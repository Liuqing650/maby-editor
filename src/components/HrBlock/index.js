import React from "react";

const HrBlock = (props) => {
  return (
    <div className="maby-editor-hr" contentEditable={false}>
      <div {...props.attributes} className="hr">{props.children}</div>
    </div>
  )
};
export default HrBlock;
