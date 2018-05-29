
const headerDict = {
  '1': 'header-one',
  '2': 'header-two',
  '3': 'header-three',
  '4': 'header-four',
  '5': 'header-five',
  '6': 'header-six',
};

const onHeader = (event, change) => {
  event.preventDefault();
  const isHeader = change.value.blocks.some(block => block.type == headerDict[event.key]);
  change.setBlocks(isHeader ? 'paragraph' : headerDict[event.key]);
  return true;
};

export default onHeader;
