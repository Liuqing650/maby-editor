import { Value } from 'slate';

export function valueModel(value) {
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
  });
}

// 解析值
export function analysisValue(value, model, html) {
  let output = '';
  switch (model) {
    case 'json':
      output = JSON.stringify(value.toJSON());
      break;
    default:
      break;
  }
  return output;
}
