import { Text } from 'slate';

export const formatValueByText = (text: string): object => ({
  object: 'value',
  document: {
    object: 'document',
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: text || '',
          },
        ],
      },
    ],
  },
});
