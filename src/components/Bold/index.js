import React, {Component} from 'react';

export default class Bold extends Component {
  render() {
    const { data } = this.props.node;
    const style = data.get('style');
    return (
      <strong {...this.props.attribute} style={style}>{this.props.children}</strong>
    );
  }
}
