import React from 'react';

const Paragraph = (props) => {
  const { data } = this.props.node;
  const style = data.get('style');
  return (
    <blockquote slate-block-type={props.node.type} {...props.attributes} style={style}>{props.children}</blockquote>
  );
};
export default Paragraph;
