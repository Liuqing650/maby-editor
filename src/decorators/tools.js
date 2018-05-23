// 定义一个新的回调函数，在按键时记录下按下的 key code。
export const onKeyDown = (event, change, callback) => {
  if (!event.ctrlKey) return;
  switch (event.key) {
    case 'b': {
      event.preventDefault();
      console.log(change.value);
      change.toggleMark('bold');
      return true;
    }
    case '`': {
      event.preventDefault();
      const isCode = change.value.blocks.some(block => block.type == 'pre-code');
      change.setBlocks(isCode ? 'paragraph' : 'pre-code');
      return true;
    }
    case 's': {
      event.preventDefault();
      callback();
      return true;
    }
  }
};

export const MarkHotkey = (options) => {
  const { type, key } = options;
  return {
    onKeyDown(event, change) {
      if (!event.ctrlKey || event.key != key) return;
      event.preventDefault();
      change.toggleMark(type)
      return true
    },
  };
}
