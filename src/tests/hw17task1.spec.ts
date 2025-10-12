/*
  Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/

  Требования:
    Страница регистрации:
      Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
      Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
    Страница логина:
      Username: обязательное
      Password: обязательное
*/

import test, { expect } from "@playwright/test";

const url = "https://anatoly-karpovich.github.io/demo-login-form/";

interface ICredentials {
  username: string;
  password: string;
}

enum NOTIFICATIONS {
  LOGIN_SUCCESS = "Hello, egors!",
  REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
  INVALID_CREDS = "Invalid credentials",
  EXISTING_USER = "Username is in use",
}

const validCredentials: ICredentials = {
  username: "Egor",
  password: "SuperSecretPassword",
};

const invalidCredentials: ICredentials = {
  username: "Incorrect User Name",
  password: "invalidpass",
};

test.describe("Register suite", () => {
  test("Should register with valid credentials", async ({ page }) => {
    const registerButtonOnRegister = page.locator("#register");
    const registerButtonOnLogin = page.locator("#registerOnLogin");
    const userNameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const messageAboutRegister = page.locator("#errorMessageOnRegister");
    await page.goto(url);
    await registerButtonOnLogin.click();
    await userNameInput.fill(validCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await registerButtonOnRegister.click();
    await expect(messageAboutRegister).toHaveText(NOTIFICATIONS.REGISTER_SUCCESS);
  });

  test("Should not register with invalid username", async ({ page }) => {
    const registerButtonOnRegister = page.locator("#register");
    const registerButtonOnLogin = page.locator("#registerOnLogin");
    const userNameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const messageAboutRegister = page.locator("#errorMessageOnRegister");
    await page.goto(url);
    await registerButtonOnLogin.click();
    await userNameInput.fill(invalidCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await registerButtonOnRegister.click();
    await expect(messageAboutRegister).toHaveText(NOTIFICATIONS.INVALID_CREDS);
  });

  test("Should not register with invalid password", async ({ page }) => {
    const registerButtonOnRegister = page.locator("#register");
    const registerButtonOnLogin = page.locator("#registerOnLogin");
    const userNameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const messageAboutRegister = page.locator("#errorMessageOnRegister");
    await page.goto(url);
    await registerButtonOnLogin.click();
    await userNameInput.fill(validCredentials.username);
    await passwordInput.fill(invalidCredentials.password);
    await registerButtonOnRegister.click();
    await expect(messageAboutRegister).toHaveText(NOTIFICATIONS.INVALID_CREDS);
  });

  test("Should not register the same user", async ({ page }) => {
    const registerButtonOnRegister = page.locator("#register");
    const registerButtonOnLogin = page.locator("#registerOnLogin");
    const userNameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const messageAboutRegister = page.locator("#errorMessageOnRegister");
    await page.goto(url);
    await registerButtonOnLogin.click();
    await userNameInput.fill(validCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await registerButtonOnRegister.click();
    await userNameInput.clear();
    await passwordInput.clear();
    await userNameInput.fill(validCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await registerButtonOnRegister.click();
    await expect(messageAboutRegister).toHaveText(NOTIFICATIONS.EXISTING_USER);
  });
});
