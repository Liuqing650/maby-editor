import React, {Component} from 'react';

export default class Bold extends Component {
  render() {
    return (
      <strong {...this.props.attribute}>{this.props.children}</strong>
    );
  }
}
