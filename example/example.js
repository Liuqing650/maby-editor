import React, { Component } from 'react';
import MabyEditor from '../src';

export default class Example extends Component {
  state = {
    value: null
  }
  onChange = ({ value }) => {
    // console.log('value---->', value);
    this.setState({ value });
  }
  handleSubmit = (value) => {
    console.log(value);
  }
  render() {
    const { value } = this.state;
    const debug = false;
    if (debug) {
      console.log('value----->', value);
    }
    const mabyEditorProps = {
      placeholder: '输入一些文本吧',
      className: 'myEditor'
    };
    return (
      <div>
        <MabyEditor {...mabyEditorProps} />
      </div>
    );
  }
}
