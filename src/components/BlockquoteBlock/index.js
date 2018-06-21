import React from "react";

const BlockquoteBlock = (props) => {
  return (
    <blockquote {...props.attributes}>
      {props.children}
    </blockquote>
  )
};
export default BlockquoteBlock;
