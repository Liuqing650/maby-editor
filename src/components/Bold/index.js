import React, {Component} from 'react';

export default class Bold extends Component {
  render() {
    return (
      <strong {...this.props.attributes}>{this.props.children}</strong>
    );
  }
}
