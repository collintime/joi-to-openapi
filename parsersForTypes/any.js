const parser = schema => {
  if (schema._flags.presence === "forbidden") return undefined;
  // TODO add required if needed
  return {
    oneOf: [
      { type: "array" },
      { type: "boolean" },
      { type: "number" },
      { type: "object" },
      { type: "string" }
    ]
  };
};

module.exports = parser;
