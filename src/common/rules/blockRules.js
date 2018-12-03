import { analysisStyle } from './utils';

export default function(Tag, blockType) {
  return {
    deserialize(element, next) {
      if (blockType && element.tagName && element.tagName.toLowerCase() === Tag) {
        const data = {};
        const style = analysisStyle(element.getAttribute('style'));
        if (Object.keys(data).length > 0) {
          data.style = style;
          return {
            object: 'block',
            type: blockType,
            data,
            nodes: next(element.childNodes)
          };
        }
        return {
          object: 'block',
          type: blockType,
          nodes: next(element.childNodes)
        };
      }
    }
  };
}
