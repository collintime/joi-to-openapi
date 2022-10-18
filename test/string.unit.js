const chai = require("chai");

const { expect } = chai;

const chaiAsPromised = require("chai-as-promised");
const sinonChai = require("sinon-chai");
const Joi = require("joi");

const { convert } = require("../index");

chai.use(chaiAsPromised);
chai.use(sinonChai);

describe("Joi String to OpenAPI", () => {
  beforeEach(() => { });

  describe("When a string is given", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string();
      expectedObj = {
        type: "string"
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a strings is given with values", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().valid("500", "300", "200").allow("test", "mano");
      expectedObj = {
        type: "string",
        enum: ["500", "300", "200", "test", "mano"]
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a strings is given with only valid values", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().valid("500", "300", "200");
      expectedObj = {
        type: "string",
        enum: ["500", "300", "200"]
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a strings allow empty string and null", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().allow("").allow(null);
      expectedObj = {
        type: "string",
        nullable: true
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a strings allow with different types", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().allow("", 1, true, null);
      expectedObj = {
        anyOf: [
          {
            type: "string",
            nullable: true
          },
          {
            type: "number",
            enum: [1]
          },
          {
            type: "boolean",
            enum: [true]
          }
        ]
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a strings allow with different types", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().allow("", 1, true);
      expectedObj = {
        anyOf: [
          {
            type: "string"
          },
          {
            type: "number",
            enum: [1]
          },
          {
            type: "boolean",
            enum: [true]
          }
        ]
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a string with null", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().allow(null);
      expectedObj = {
        type: "string",
        nullable: true
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a strings is given with examples", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().example("This is a test");
      expectedObj = {
        type: "string",
        example: "This is a test"
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a string is given with multiple examples", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().example("This is a test").example("Happy Joi");
      expectedObj = {
        type: "string",
        examples: ["This is a test", "Happy Joi"]
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a string is given with description", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().description("This is a test");
      expectedObj = {
        type: "string",
        description: "This is a test"
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a string is given with label", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().label("This is a test");
      expectedObj = {
        type: "string",
        title: "This is a test"
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a string is given with default", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().default("This is a test");
      expectedObj = {
        type: "string",
        default: "This is a test"
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a string with guid", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().guid();
      expectedObj = {
        type: "string",
        format: "uuid",
        pattern: "/^([\\[{\\(]?)[0-9A-F]{8}([:-]?)[0-9A-F]{4}\\2?[0-9A-F][0-9A-F]{3}\\2?[0-9A-F][0-9A-F]{3}\\2?[0-9A-F]{12}([\\]}\\)]?)$/i"
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("A string with a uuid", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().uuid();
      expectedObj = {
        type: "string",
        format: "uuid",
        pattern: "/^([\\[{\\(]?)[0-9A-F]{8}([:-]?)[0-9A-F]{4}\\2?[0-9A-F][0-9A-F]{3}\\2?[0-9A-F][0-9A-F]{3}\\2?[0-9A-F]{12}([\\]}\\)]?)$/i"
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a string with email", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().email();
      expectedObj = {
        type: "string",
        format: "email",
        pattern: "/\\s*[,]\\s*/"
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a string with uri", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().uri();
      expectedObj = {
        type: "string",
        format: "uri",
        pattern: "/^(?=.)(?!https?:\\/$)(?:[a-zA-Z][a-zA-Z\\d+-\\.]*:(?:(?:\\/\\/(?:[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:]*@)?(?:\\[(?:(?:(?:[\\dA-Fa-f]{1,4}:){6}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|::(?:[\\dA-Fa-f]{1,4}:){5}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:[\\dA-Fa-f]{1,4})?::(?:[\\dA-Fa-f]{1,4}:){4}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,1}[\\dA-Fa-f]{1,4})?::(?:[\\dA-Fa-f]{1,4}:){3}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,2}[\\dA-Fa-f]{1,4})?::(?:[\\dA-Fa-f]{1,4}:){2}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,3}[\\dA-Fa-f]{1,4})?::[\\dA-Fa-f]{1,4}:(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,4}[\\dA-Fa-f]{1,4})?::(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,5}[\\dA-Fa-f]{1,4})?::[\\dA-Fa-f]{1,4}|(?:(?:[\\dA-Fa-f]{1,4}:){0,6}[\\dA-Fa-f]{1,4})?::)|v[\\dA-Fa-f]+\\.[\\w-\\.~!\\$&'\\(\\)\\*\\+,;=:]+)\\]|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])|[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=]{1,255})(?::\\d*)?(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*)|\\/(?:[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]+(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*)?|[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]+(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*|(?:\\/\\/\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*)))(?:\\?[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@\\/\\?]*(?=#|$))?(?:#[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@\\/\\?]*)?$/"
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a string with uri with allow", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().uri().allow("");
      expectedObj = {
        anyOf: [
          {
            type: "string",
            format: "uri",
            pattern: "/^(?=.)(?!https?:\\/$)(?:[a-zA-Z][a-zA-Z\\d+-\\.]*:(?:(?:\\/\\/(?:[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:]*@)?(?:\\[(?:(?:(?:[\\dA-Fa-f]{1,4}:){6}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|::(?:[\\dA-Fa-f]{1,4}:){5}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:[\\dA-Fa-f]{1,4})?::(?:[\\dA-Fa-f]{1,4}:){4}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,1}[\\dA-Fa-f]{1,4})?::(?:[\\dA-Fa-f]{1,4}:){3}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,2}[\\dA-Fa-f]{1,4})?::(?:[\\dA-Fa-f]{1,4}:){2}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,3}[\\dA-Fa-f]{1,4})?::[\\dA-Fa-f]{1,4}:(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,4}[\\dA-Fa-f]{1,4})?::(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,5}[\\dA-Fa-f]{1,4})?::[\\dA-Fa-f]{1,4}|(?:(?:[\\dA-Fa-f]{1,4}:){0,6}[\\dA-Fa-f]{1,4})?::)|v[\\dA-Fa-f]+\\.[\\w-\\.~!\\$&'\\(\\)\\*\\+,;=:]+)\\]|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])|[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=]{1,255})(?::\\d*)?(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*)|\\/(?:[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]+(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*)?|[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]+(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*|(?:\\/\\/\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*)))(?:\\?[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@\\/\\?]*(?=#|$))?(?:#[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@\\/\\?]*)?$/"
          },
          {
            type: "string",
            enum: [""]
          }
        ]
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a string with uri with allow null", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().uri().allow(null);
      expectedObj = {
        type: "string",
        format: "uri",
        pattern: "/^(?=.)(?!https?:\\/$)(?:[a-zA-Z][a-zA-Z\\d+-\\.]*:(?:(?:\\/\\/(?:[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:]*@)?(?:\\[(?:(?:(?:[\\dA-Fa-f]{1,4}:){6}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|::(?:[\\dA-Fa-f]{1,4}:){5}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:[\\dA-Fa-f]{1,4})?::(?:[\\dA-Fa-f]{1,4}:){4}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,1}[\\dA-Fa-f]{1,4})?::(?:[\\dA-Fa-f]{1,4}:){3}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,2}[\\dA-Fa-f]{1,4})?::(?:[\\dA-Fa-f]{1,4}:){2}(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,3}[\\dA-Fa-f]{1,4})?::[\\dA-Fa-f]{1,4}:(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,4}[\\dA-Fa-f]{1,4})?::(?:[\\dA-Fa-f]{1,4}:[\\dA-Fa-f]{1,4}|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|(?:(?:[\\dA-Fa-f]{1,4}:){0,5}[\\dA-Fa-f]{1,4})?::[\\dA-Fa-f]{1,4}|(?:(?:[\\dA-Fa-f]{1,4}:){0,6}[\\dA-Fa-f]{1,4})?::)|v[\\dA-Fa-f]+\\.[\\w-\\.~!\\$&'\\(\\)\\*\\+,;=:]+)\\]|(?:(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:0{0,2}\\d|0?[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])|[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=]{1,255})(?::\\d*)?(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*)|\\/(?:[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]+(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*)?|[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]+(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*|(?:\\/\\/\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*(?:\\/[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@]*)*)))(?:\\?[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@\\/\\?]*(?=#|$))?(?:#[\\w-\\.~%\\dA-Fa-f!\\$&'\\(\\)\\*\\+,;=:@\\/\\?]*)?$/",
        nullable: true
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a string with iso date", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().isoDate();
      expectedObj = {
        type: "string",
        format: "date-time"
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a string with min", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().min(10);
      expectedObj = {
        type: "string",
        minLength: 10
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a string with max", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().max(10);
      expectedObj = {
        type: "string",
        maxLength: 10
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a string with lenght", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().length(10);
      expectedObj = {
        type: "string",
        length: 10
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });

  describe("When a string with pattern", () => {
    let obj;
    let expectedObj;

    beforeEach(() => {
      obj = Joi.string().pattern(/^[abc]+$/);
      expectedObj = {
        type: "string",
        pattern: "^[abc]+$"
      };
    });

    it("should be converted in the proper open-api", () =>
      expect(convert(obj)).deep.equal(expectedObj));
  });
});
