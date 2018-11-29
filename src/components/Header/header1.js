import React from 'react';

const Header1 = (props) => {
  return (<h1 {...props.attributes}>{props.children}</h1>);
};
export default Header1;
