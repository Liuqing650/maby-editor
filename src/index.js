import React from 'react';
import {Editor, EditorState} from 'draft-js';
import Immutable from 'immutable';
import './index.less';

class MabyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.focus = () => this.refs.editor.focus();
  }
  onChange = (editorState) => {
    this.setState({ editorState })
    console.log('editorState', editorState);
  };
  render() {
    const { editorState } = this.state;
    const { placeholder, className, height, autoFocus } = this.props;
    const blockRenderMap = Immutable.Map({
      'maby-section': {
        element: 'code'
      },
    });
    function getBlockStyle(blockName) {
      switch (blockName.getType()) {
        case 'blockquote':
          return 'maby-blockquote';
        case 'code-block':
          return 'maby-code';
        default:
          return null;
      }
    }
    return (
      <div>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          ref="editor"
        />
      </div>
    );
  };
};
export default MabyEditor;
