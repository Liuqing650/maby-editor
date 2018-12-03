const schema = (opts) => {
  const schemaObj = {};
  schemaObj.blocks = {
    hr: {
      isVoid: true,
    }
  };
  return schemaObj;
};

export default schema;
