import { Page } from "@playwright/test";
import { config } from "ui/config";
import { HomePage } from "ui/pageObjects/home.page";
import { SignInPage } from "ui/pageObjects/siginIn.page";

export class LoginUIService {
  homePage: HomePage;
  signInPage: SignInPage;

  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.signInPage = new SignInPage(page);
  }

  async login() {
    await this.signInPage.open();
    await this.signInPage.fillCreds(config.login, config.password);
    await this.signInPage.clickOnLoginButton();
    await this.homePage.waitForOpened();
    const token = (await this.page.context().cookies()).find((c) => c.name === "Authorization")!.value;
    return token;
  }
}
