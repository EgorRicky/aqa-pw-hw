/*
Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
https://anatoly-karpovich.github.io/demo-login-form/

Требования:
Страница регистрации:
  Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
  Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

Страница логина:
  Username: обязательное
  Password: обязательное
*/
import test, { expect } from "@playwright/test";
import invalidCreds from "../testData/registerData";

const url = "https://anatoly-karpovich.github.io/demo-login-form/";

for (const { username, password, title } of invalidCreds) {
  test(title, async ({ page }) => {
    const registerButtonOnLogin = page.locator("#registerOnLogin");
    const userNameInputOnRegister = page.locator("#userNameOnRegister");
    const passwordInputOnRegister = page.locator("#passwordOnRegister");
    const registerButtonOnRegister = page.locator("#register");
    const errorMessageOnRegister = page.locator("#errorMessageOnRegister");
    await page.goto(url);
    await registerButtonOnLogin.click();
    await userNameInputOnRegister.fill(username);
    await passwordInputOnRegister.fill(password);
    await registerButtonOnRegister.click();
    await expect(errorMessageOnRegister).toBeVisible();
  });
}
