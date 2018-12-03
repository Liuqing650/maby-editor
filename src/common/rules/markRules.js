import { analysisStyle } from './utils';

export default function(Tag, markType) {
  return {
    deserialize(element, next) {
      if (markType && element.tagName && element.tagName.toLowerCase() === Tag) {
        const data = {};
        if (element.href) {
          data.href = element.href;
        }
        data.style = analysisStyle(element.getAttribute('style'));
        return {
          object: 'mark',
          type: markType,
          data,
          nodes: next(element.childNodes)
        };
      }
    }
  };
}
