import React from 'react';

const Paragraph = (props) => {
  return (
    <blockquote slate-block-type={props.node.type} {...props.attributes}>{props.children}</blockquote>
  );
};
export default Paragraph;
