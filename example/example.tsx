import * as React from 'react';

import MabyEditor from '../src/index';

export default class Example extends React.Component {
  public state = {
    value: null,
  };
  public onChange = (slateValue) => {
    this.setState({ value: slateValue.value });
  }
  public handleSubmit = (value) => {
    console.log(value);
  }
  public render() {
    const { value } = this.state;
    const debug = false;
    if (debug) {
      console.log('value----->', value);
    }
    const mabyEditorProps = {
      className: 'myEditor',
      placeholder: 'Enter some text...',
      toolBar: {
        visible: true,
      },
      onChange: this.onChange,
      editorContainerStyle: {
        padding: '10px',
      }
    };
    const style = {
      borderLeft: '1px solid #ccc',
      borderRight: '1px solid #ccc',
      margin: '30px auto',
      minHeight: 800,
      width: 800,
    };
    return (
      <div style={style}>
        <MabyEditor {...mabyEditorProps} />
      </div>
    );
  }
}
