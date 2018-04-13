import CodeUtils from 'draft-js-code';

const codePlugin = {
  handleKeyCommand(command, editorState) {
    console.log('editorState--com--->', editorState);
    let newEditorState = editorState;
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newEditorState = CodeUtils.handleKeyCommand(editorState, command);
    }
    if (newEditorState && newEditorState !== editorState) {
      // setEditorState(newEditorState);
      return 'handled';
    }
    return 'not-handled';
  },
  keyBindingFn(evt, editorState) {
    console.log('editorState--bf--->', editorState);
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      return CodeUtils.getKeyBinding(evt);
    }
    return null;
  },
  handleReturn(evt, editorState) {
    console.log('editorState----->', editorState);
    console.info(CodeUtils.hasSelectionInBlock(editorState));
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      editorState.setEditorState(CodeUtils.handleReturn(evt, editorState));
      return 'handled';
    }
    return 'not-handled';
  },
  handleTab(evt, editorState) {
    console.info(CodeUtils.hasSelectionInBlock(editorState));
    if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

    this.onChange(CodeUtils.onTab(evt, editorState));
    return 'handled';
  }
};

export default codePlugin;