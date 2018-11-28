import React, { Component } from 'react';

export default class FontBgColor extends Component {
  render() {
    const { data } = this.props.node;
    const style = data.get('style');
    return (
      <span {...this.props.attribute} style={style}>{this.props.children}</span>
    );
  }
}
