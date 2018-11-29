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
      placeholder: 'Enter some text...',
      className: 'myEditor'
    };
    const style = {
      width: 800,
      margin: '30px auto',
      borderLeft: '1px solid #ccc',
      borderRight: '1px solid #ccc',
      minHeight: 800,
    };
    return (
      <div style={style}>
        <MabyEditor {...mabyEditorProps} />
      </div>
    );
  }
}
