import React from 'react';

const Header1 = (props) => {
  const { data } = props.node;
  const style = data.get('style');
  return (<h1 style={style}>{props.children}</h1>);
};
export default Header1;
