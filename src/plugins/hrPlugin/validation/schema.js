const schema = (opts) => {
  const schemaObj = {};
  schemaObj.blocks = {
    hr: {
      object: 'block',
      type: opts.type,
      isVoid: true,
    }
  };
  return schemaObj;
};

export default schema;
