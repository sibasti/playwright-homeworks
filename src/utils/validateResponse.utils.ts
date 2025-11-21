import { APIResponse, expect } from "@playwright/test";
import { validateJsonSchema } from "utils/schema.utils";

export async function validateResponse(
  response: APIResponse,
  expected: {
    status: number;
    schema?: object;
    IsSuccess?: boolean;
    ErrorMessage?: string | null;
  }
) {
  expect.soft(response.status()).toBe(expected.status);

  const body = await response.json();

  if (expected.schema) validateJsonSchema(body, expected.schema);

  if (expected.IsSuccess !== undefined) {
  console.log("🔥 validateResponse called from:", expected);
  expect.soft(body.IsSuccess).toBe(expected.IsSuccess);
}

  if (expected.ErrorMessage !== undefined) {
    expect.soft(body.ErrorMessage).toBe(expected.ErrorMessage);
  }

  return body;
}
