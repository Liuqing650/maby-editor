import React, { Component } from 'react';
import MabyMarkdownEditor from 'src/index';
export default class Example extends Component {
  state = {
    value: null,
    saveData: null,
    editState: null
  }
  componentDidMount() {
    if (localStorage.editContent) {
      this.setState({
        value: JSON.parse(localStorage.editContent)
      })
    }
  };
  onChange = (value, editState) => {
    this.setState({
      saveData: value,
      editState: editState
    });
  }
  handleSubmit = () => {
    const saveData = this.state.saveData;
    localStorage.editContent = JSON.stringify(saveData);
    console.log(saveData);
  }
  render() {
    const { value } = this.state;
    const mabyEditorProps = {
      placeholder: '输入一些文本吧',
      className: 'myEditor',
      value: value,
      autoFocus: true,
      onChange: this.onChange
    };
    return (
      <div>
        <div>
          <button onClick={this.handleSubmit}>保存</button>
        </div>
        <MabyMarkdownEditor {...mabyEditorProps} />
      </div>
    );
  }
}