const deepcopy = require("deepcopy");
const _ = require("lodash");
const { retrievePrintedReference } = require("./utils");

const mergeProperties = (property1, property2, state, convert) => {
  const _property1 = deepcopy(property1);
  const _property2 = deepcopy(property2);

  return Object.entries(_property2 || {}).reduce((acc, [k, v]) => {
    if (!acc[k]) return { ...acc, [k]: v };
    return { ...acc, [k]: merge(acc[k], v, state, convert) };
  }, _property1 || {});
};

const mergeString = (str1, str2) => {
  if (!str2) str1;
  if (str1.enum || str2.enum)
    str1.enum = [...new Set([...(str1.enum || []), ...(str2.enum || [])])];

  if (str1.nullable || str2.nullable)
    str1.nullable = str1.nullable || str2.nullable;

  if (str1.format !== str2.format)
    throw new Error("cannot merge different formats");

  return str1;
};

const mergeInteger = (int1, int2) => {
  if (!int2) int1;

  if (
    typeof int1.minimum !== "undefined" ||
    typeof int2.minimum !== "undefined"
  ) {
    int1.minimum = Math.min(int1.minimum || Infinity, int2.minimum || Infinity);
  }

  if (
    typeof int1.maximum !== "undefined" ||
    typeof int2.maximum !== "undefined"
  ) {
    int1.maximum = Math.min(
      int1.maximum || -Infinity,
      int2.maximum || -Infinity
    );
  }

  if (int1.nullable || int2.nullable) {
    int1.nullable = str1.nullable || int2.nullable;
  }

  if (int1.format !== int2.format) {
    throw new Error("cannot merge different formats");
  }

  return int1;
};

const mergeBoolean = (bool1, bool2) => {
  if (!bool2) bool1;

  if (bool1.nullable || bool2.nullable) {
    bool1.nullable = bool1.nullable || bool2.nullable;
  }

  return bool1;
};

const mergeObject = (obj1, obj2, state, convert) => {
  if (!obj2) obj1;
  if (!obj1) obj2;

  const mergedObj = {
    type: "object",
    properties: mergeProperties(
      obj1.properties,
      obj2.properties,
      state,
      convert
    ),
  };

  if (obj1.required || obj2.required) {
    mergedObj.required = [
      ...new Set([...(obj1.required || []), ...(obj2.required || [])]),
    ];
  }
  debugger;
  return mergedObj;
};

const mergeOneOf = (obj1, obj2) => {
  if (!obj2) obj1;
  if (!obj1) obj2;

  return { oneOf: [...(obj1.oneOf || []), ...(obj2.oneOf || [])] };
};

const mergeRef = (obj1, obj2) => {
  if (!obj2) obj1;
  if (!obj1) obj2;

  if (object1.$ref != object2.$ref) new Error("different $ref - cannot merge");

  return object1;
};

const wrapInOneOf = (obj) => ({
  oneOf: obj.oneOf ? obj.oneOf : [obj],
});

const merge = (obj1, obj2, state, convert) => {
  if (_.isEmpty(obj1)) return obj2;
  if (_.isEmpty(obj2)) return obj1;

  let object1 = deepcopy(obj1);
  let object2 = deepcopy(obj2);
  if (object1.oneOf || object2.oneOf) {
    object1 = wrapInOneOf(object1);
    object2 = wrapInOneOf(object2);
  }
  if (object1.$ref) {
    object1 = convert(
      retrievePrintedReference(object1, state.components),
      state
    );
  }
  if (object2.$ref) {
    object2 = convert(
      retrievePrintedReference(object2, state.components),
      state
    );
  }

  if (object1.type !== object2.type)
    throw new Error(
      "cannot merge different types;\n" +
        JSON.stringify(object1) +
        ";\n" +
        JSON.stringify(object2)
    );
  switch (object1.type) {
    case "object":
      return mergeObject(object1, object2, state, convert);
    case "string":
      return mergeString(object1, object2);
    case "number":
      return mergeInteger(object1, object2);
    case "integer":
      return mergeInteger(object1, object2);
    case "boolean":
      return mergeBoolean(object1, object2);
    default:
      debugger;
      if (object1.oneOf && object2.oneOf) {
        return mergeOneOf(object1, object2);
      }
      if (object1.$ref && object2.$ref) {
        return mergeRef(object1, object2);
      }
      throw new Error("type not supported");
  }
};

module.exports = { merge };
