/*
Написать смоук API тест на логин
  - создать и проверить схему
  - проверить статус
  - проверить наличие токена в хедерах
*/
import test, { expect } from "@playwright/test";
import { apiConfig } from "../config";
import { config } from "../../ui/config";
import { loginSchema } from "../data/schemas/auth/login.schema";
import { STATUS_CODES } from "../data/types/statuscodes.enum";
import { validateJsonSchema } from "../utils/validate.schema";

test("Smoke for login with valid credentials", async ({ request }) => {
  const response = await request.post(`${apiConfig.baseUrl}${apiConfig.endpoints.login}`, {
    data: {
      username: config.login,
      password: config.password,
    },
    headers: {
      "content-type": "application/json",
    },
  });

  const responseBody = await response.json();
  validateJsonSchema(responseBody, loginSchema);
  expect(response.status()).toBe(STATUS_CODES.OK);
  const token = response.headers()["authorization"];
  expect(token).toBeTruthy();
});
