import React from "react";

const DelInline = (props) => {
  return (
    <del {...props.attributes}>{props.children}</del>
  )
};
export default DelInline;
