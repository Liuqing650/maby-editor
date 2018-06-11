import React from "react";

const CodeInline = (props) => {
  return (
    <code className="maby-editor-tag" {...props.attributes}>{props.children}</code>
  )
};
export default CodeInline;
