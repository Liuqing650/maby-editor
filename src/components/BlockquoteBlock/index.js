import React from "react";

const BlockquoteBlock = (props) => {
  return (
    <blockquote {...props.attributes}>
      <p>{props.children}</p>
    </blockquote>
  )
};
export default BlockquoteBlock;
