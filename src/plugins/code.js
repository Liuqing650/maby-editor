import CodeUtils from 'draft-js-code';

const codePlugin = {
  handleKeyCommand(command, editorState) {
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
  keyBindingFn(e, { getEditorState}) {
    const editorState = getEditorState();
    if (CodeUtils.hasSelectionInBlock(editorState)) {
      return CodeUtils.getKeyBinding(e);
    }
    return null;
  },
  handleReturn(e, editorState) {
    console.log('editorState----->', editorState);
    console.info(CodeUtils.hasSelectionInBlock(editorState));
    // if (CodeUtils.hasSelectionInBlock(editorState)) {
    //   editorState.setEditorState(CodeUtils.handleReturn(e, editorState));
    //   return 'handled';
    // }
    return 'not-handled';
  },
  handleTab(e, editorState) {
    console.info(CodeUtils.hasSelectionInBlock(editorState));
    // if (CodeUtils.hasSelectionInBlock(editorState)) {
    //   setEditorState(CodeUtils.handleTab(e, editorState));
    //   return 'handled';
    // }
    return 'not-handled';
  }
};

export default codePlugin;