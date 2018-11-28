const getStyleByAttr = (element, attr) => {
  const isAttr = element.style[attr] && typeof element.style[attr] === 'number' && element.style[attr] > 0;
  const imgAttr = element.getAttribute(`img_${attr}`) || null;
  return isAttr ? element.style.width : imgAttr;
};

const defaultAttrs = {
  src: node => node.data.get('src')
};

export default function(inlineType, stylesAttr = defaultAttrs) {
  return {
    deserialize(element, next) {
      if (inlineType && element.tagName && element.tagName.toLowerCase() === 'img') {
        const data = {};
        const width = getStyleByAttr(element, 'width');
        const height = getStyleByAttr(element, 'height');
        const style = {};
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
          type: inlineType,
          nodes: next(element.childNodes),
          data,
          isVoid: true
        };
      }
    }
  };
}
