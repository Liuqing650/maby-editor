import { analysisStyle } from './utils';

export default function(Tag, blockType) {
  return {
    deserialize(element) {
      if (blockType && element.tagName && element.tagName.toLowerCase() === Tag) {
        const data = {};
        const style = analysisStyle(element.getAttribute('style'));

        data.style = style;
        if (Object.keys(data).length > 0) {
          return {
            object: 'block',
            type: blockType,
            data,
            isVoid: true
          };
        }
        return {
          object: 'block',
          type: blockType,
          isVoid: true
        };
      }
    }
  };
}
