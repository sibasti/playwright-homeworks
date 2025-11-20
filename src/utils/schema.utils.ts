import { expect } from "@playwright/test";
import Ajv from "ajv";

export function validateJsonSchema(body: object, schema: object) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  const isValid = validate(body);

  expect.soft(isValid, "Response body should match JSON schema").toBe(true);

  if (!isValid) {
    console.log("Schema validation failed:");
    console.log(validate.errors);
  }
}
