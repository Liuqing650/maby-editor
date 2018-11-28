import React from 'react';

const Header6 = (props) => {
  const { data } = props.node;
  const style = data.get('style');
  return (<h6 style={style}>{props.children}</h6>);
};
export default Header6;
