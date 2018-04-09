import React from 'react';
import Editor from 'draft-js-plugins-editor';
import {EditorState} from 'draft-js';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import Immutable from 'immutable';
import './index.less';

const plugins = [
  createMarkdownShortcutsPlugin()
];
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
    return (
      <div>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref="editor"
        />
      </div>
    );
  };
};
export default MabyEditor;
