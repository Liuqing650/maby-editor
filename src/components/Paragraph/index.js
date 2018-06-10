import React from "react";

const Paragraph = (props) => {
  return (
    <p {...props.attributes}>{props.children}</p>
  )
};
export default Paragraph;
