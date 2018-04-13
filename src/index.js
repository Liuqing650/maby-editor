import React from 'react';
import Editor from 'draft-js-plugins-editor';
import Draft, {
  convertFromRaw,
  ContentState,
  EditorState
} from 'draft-js';
import createPrismPlugin from 'draft-js-prism-plugin';
import createMarkdownPlugin from './draft-js-markdown-plugin';
import customStyleMap from './styles';
import languageStyle from './styles/languageSelect';
import styles from './index.less';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-scala';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-swift';
import initialState from "./initstate";
// code-theme
import './styles/prism.less';

const renderLanguageSelect = ({
  options,
  onChange,
  selectedValue,
  selectedLabel
}) => {
  return (
    <div style={languageStyle.switcherContainer}>
      <div style={languageStyle.switcher}>
        <select
          style={languageStyle.switcherSelect}
          value={selectedValue}
          onChange={onChange}
        >
          {options.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <div style={languageStyle.switcherLabel}>
          {selectedLabel} {String.fromCharCode(9662)}
        </div>
      </div>
    </div>
  )
};

const prismPlugin = createPrismPlugin({
  prism: Prism,
});

const plugins = [
  prismPlugin,
  createMarkdownPlugin({ renderLanguageSelect })
]

const contentState = ContentState.createFromText('');
const initialEditorState = EditorState.createWithContent(contentState);

// const initialEditorState = EditorState.createWithContent(
//   convertFromRaw(initialState)
// );
class MabyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      editorState: initialEditorState
    };
  }
  componentDidMount = () => {
    const { editor } = this;
    if (editor) {
      setTimeout(editor.focus.bind(editor), 1000);
    }
  }
  onChange = editorState => {
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
          plugins={plugins}
          spellCheck
          autoFocus
          ref={(element) => { this.editor = element; }}
        />
      </div>
    );
  };
};
export default MabyEditor;
