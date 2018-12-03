import React from 'react';

const Link = (props) => {
  const { attributes, children, mark, options } = props;
  const href = options.getHref(mark);
  return (
    <a {...attributes} href={href} target="_blank">{children}</a>
  );
};
export default Link;
