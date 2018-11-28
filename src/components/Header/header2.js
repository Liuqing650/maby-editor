import React from 'react';

const Header2 = (props) => {
  const { data } = props.node;
  const style = data.get('style');
  return (<h2 style={style}>{props.children}</h2>);
};
export default Header2;
