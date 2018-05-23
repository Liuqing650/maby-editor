import React from "react";

const EmInline = (props) => {
  return (
    <em {...props.attributes}>{props.children}</em>
  )
};
export default EmInline;
