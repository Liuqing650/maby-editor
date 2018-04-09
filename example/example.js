import React, { Component } from 'react';
import MabyMarkdownEditor from 'src/index';
export default class Example extends Component {
  state = {
    value: null
  }
  onChange = ({ value }) => {
    console.log('value---->', value);
    // this.setState({ value })
  }
  handleSubmit = (value) => {
    console.log(value);
  }
  render() {
    const { value } = this.state;
    const mabyEditorProps = {
      placeholder: '输入一些文本吧',
      className: 'myEditor',
      value: value,
      mode: 'html',
      autoFocus: true,
      onChange: this.onChange,
      handleValue: this.handleSubmit
    };
    return (
      <div>
        <MabyMarkdownEditor {...mabyEditorProps} />
      </div>
    );
  }
}