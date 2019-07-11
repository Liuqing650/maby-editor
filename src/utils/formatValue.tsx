type TextType = string;

export const formatValueByText = (text: TextType): object => ({
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
                text: text || '',
              },
            ],
          },
        ],
      },
    ],
  },
});
