import { expect } from "@playwright/test";
import { LoginApi } from "api/api/login.api";
import { config } from "../../ui/config";
import { STATUS_CODES } from "../data/types/statuscodes.enum";
import { ICredentials } from "../data/types/credentials.types";
import { validateResponse } from "../utils/validate.response";

const credentials = {
  username: config.login,
  password: config.password,
};

export class LoginService {
  constructor(private loginApi: LoginApi) {}

  async loginAsAdmin(customCredentials?: ICredentials) {
    const response = await this.loginApi.login(customCredentials ?? credentials);
    validateResponse(response, {
      status: STATUS_CODES.OK,
      IsSuccess: true,
      ErrorMessage: null,
    });
    const headers = response.headers;
    const token = headers["authorization"]!;
    expect(token).toBeTruthy();

    return token;
  }
}
