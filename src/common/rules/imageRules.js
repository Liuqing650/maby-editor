import { analysisStyle } from './utils';

const getStyleByAttr = (element, attr) => {
  const isAttr = element.style[attr] && typeof element.style[attr] === 'number' && element.style[attr] > 0;
  const imgAttr = element.getAttribute(`img_${attr}`) || null;
  return isAttr ? element.style.width : imgAttr;
};

const defaultAttrs = {
  src: node => node.data.get('src')
};

export default function(blockType, stylesAttr = defaultAttrs) {
  return {
    deserialize(element, next) {
      if (blockType && element.tagName && element.tagName.toLowerCase() === 'img') {
        const data = {};
        const width = getStyleByAttr(element, 'width') || element.width;
        const height = getStyleByAttr(element, 'height') || element.height;
        const style = analysisStyle(element.getAttribute('style'));
        if (element.src) {
          data.src = element.getAttribute('src');
        }

        if (element.style.marginLeft) {
          data.indent = element.style.marginLeft;
        }

        if (width && !isNaN(Number(width))) {
          style.width = Number(width);
        }

        if (height && !isNaN(Number(height))) {
          style.height = Number(height);
        }
        data.style = style;
        return {
          object: 'block',
          type: blockType,
          nodes: next(element.childNodes),
          data,
          isVoid: true
        };
      }
    }
  };
}
