import test, { expect } from "@playwright/test";
import Ajv from "ajv";

import { apiConfig } from "config/apiConfig";
import { STATUS_CODES } from "data/statusCodes";
import { credentials } from "config/env";
import { loginSchema } from "data/schemas/login/login.schema";
import { validateResponse } from "utils/validateResponse.utils";

test("API Smoke Login", async ({ request }) => {

  const response = await request.post(apiConfig.baseURL + apiConfig.endpoints.login, {
    data: {
      username: credentials.username,
      password: credentials.password,
    }
  });

  await validateResponse(response, {
    status: STATUS_CODES.OK,
    schema: loginSchema,
  });

  const token = response.headers()["authorization"];
  expect(token).toBeTruthy();
});
