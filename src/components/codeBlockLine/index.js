import React from "react";

const CodeBlockLine = (props) => {
  return (
    <div {...props.attributes}>{props.children}</div>
  )
};
export default CodeBlockLine;
