import React from "react";

const CodeInline = (props) => {
  return (
    <code {...props.attributes}>{props.children}</code>
  )
};
export default CodeInline;
