/*
Написать Page Object класс для страницы Sign In:
  - email input
  - password input
  - login button
  - fillCredentials method
  - click on login button method
*/
import { SalesPortalPage } from "./salesPortal.page";

export class SignInPage extends SalesPortalPage {
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.locator("button[type='submit']");
  readonly uniqueElement = this.emailInput;

  async fillCreds(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickOnLoginButton() {
    await this.loginButton.click();
  }
}
