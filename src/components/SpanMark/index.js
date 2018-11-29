import React, { Component } from 'react';

export default class SpanMark extends Component {
  render() {
    return (
      <span {...this.props.attribute}>{this.props.children}</span>
    );
  }
}
