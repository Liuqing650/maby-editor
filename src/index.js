import React from 'react';
import Editor from 'draft-js-plugins-editor';
import Draft, {
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

window.Draft = Draft;
const plugins = [
  // prismPlugin,
  createMarkdownShortcutsPlugin()
];
const contentState = ContentState.createFromText('');
const initialEditorState = EditorState.createWithContent(contentState);
const rawContentState = convertToRaw(initialEditorState.getCurrentContent());

class MabyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: initialEditorState, rawContent: rawContentState};
    this.Draft = Draft;
  }
  componentDidMount = () => {
    const { editor } = this;
    if (editor) {
      setTimeout(editor.focus.bind(editor), 1000);
    }
  }
  onChange = (editorState) => {
    window.editorState = editorState;
    window.rawContent = convertToRaw(editorState.getCurrentContent());
    this.setState({ 
      editorState,
      rawContent: convertToRaw(editorState.getCurrentContent())
    })
    // console.log('editorState', convertToRaw(editorState.getCurrentContent()));
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
