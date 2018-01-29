import React, { Component } from 'react';
import MabyEdit from '../index';
export default class Examples extends Component {
  state = {
    value: null
  }
  onChange = ({ value }) => {
    this.setState({ value })
  }
  render() {
    const { value } = this.state;
    const mabyEditProps = {
      value: value,
      onChange: this.onChange
    };
    return (
      <div>
        <h2>测试maby-edit</h2>
        <MabyEdit {...mabyEditProps} />
      </div>
    );
  }
}