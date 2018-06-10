
const headerDict = {
  '1': 'header-one',
  '2': 'header-two',
  '3': 'header-three',
  '4': 'header-four',
  '5': 'header-five',
  '6': 'header-six',
};

/**
 * 
 * @param {*object} event 
 * @param {*Slate} change 
 * @param {*string} type 可选
 */
const onHeader = (event, change, type) => {
  event.preventDefault();
  const isHeader = type ? change.value.blocks.some(block => block.type == type) : change.value.blocks.some(block => block.type == headerDict[event.key]);
  change.setBlocks(isHeader ? 'paragraph' : type || headerDict[event.key]);
  return true;
};

export default onHeader;
