import { analysisStyle } from './utils';

export default function(Tag: string, markType: string) {
  return {
    deserialize(element: any, next: any) {
      if (markType && element.tagName && element.tagName.toLowerCase() === Tag) {
        const data: any = {};
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
