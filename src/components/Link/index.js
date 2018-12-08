import React from 'react';

const Link = (props) => {
  const { attributes, children, node, options } = props;
  const href = options.getHref(node);
  console.log('href------>', href);
  return (
    <a {...attributes} href={href} target="_blank">{children}</a>
  );
};
export default Link;
