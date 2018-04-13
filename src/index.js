import React from 'react';
import Editor from 'draft-js-plugins-editor';
import Draft, {
  Editor,
  RichUtils,
  ContentState,
  EditorState,
  convertToRaw
} from 'draft-js';
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import Immutable from 'immutable';
import 'prismjs/themes/prism-funky.css';
import prismPlugin from './plugins/prism';
// import codePlugin from './plugins/code';
import customStyleMap from './styles';
// import './styles/prism.less';
const plugins = [
  // codePlugin,
  prismPlugin,
  createMarkdownShortcutsPlugin()
];
const contentState = ContentState.createFromText('');
const initialEditorState = EditorState.createWithContent(contentState);

class MabyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: initialEditorState};
    this.Draft = Draft;
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
  }
  componentDidMount = () => {
    const { editor } = this;
    if (editor) {
      setTimeout(editor.focus.bind(editor), 1000);
    }
  }
  onChange = (editorState) => {
    this.setState({ 
      editorState,
    })
  };
  render() {
    const { editorState } = this.state;
    const { placeholder, className, height, autoFocus } = this.props;
    return (
      <div>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          customStyleMap={customStyleMap}
          plugins={plugins}
          spellCheck
          ref={(element) => { this.editor = element; }}
        />
      </div>
    );
  };
};
export default MabyEditor;
