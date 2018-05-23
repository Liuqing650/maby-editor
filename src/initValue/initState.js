import { Value } from 'slate';
import Html from 'slate-html-serializer';
import Plain from 'slate-plain-serializer';

export function valueModel (value) {
  return Value.fromJSON({
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: value || ''
                }
              ]
            }
          ]
        }
      ]
    }
  })
};
export function htmlModel(value, html) {
  return html.deserialize(value || '<p></p>');
};

// 解析返回值
export function htmlAnalysis(value, html) {
  return html.serialize(value);
}

// 解析值
export function analysisValue(value, model, html) {
  let output = '';
  switch (model) {
    case 'json':
      output = JSON.stringify(value.toJSON());
      break;
    case 'text':
      output = Plain.serialize(value);
      break;
    case 'html':
      output = htmlAnalysis(value, html);
      break;
    default:
      break;
  }
  return output;
}
