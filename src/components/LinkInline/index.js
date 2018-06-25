import React from "react";

const LinkInline = (props) => {
  const node = props.node;
  const url = node.data.get('url');
  return (
    <a {...props.attributes} className="link" href={url || ''} target="_blank">{props.children}</a>
  )
};
export default LinkInline;
