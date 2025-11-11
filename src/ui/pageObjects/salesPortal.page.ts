import { expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import { config } from "../config";

export abstract class SalesPortalPage extends BasePage {
  readonly spinner = this.page.locator(".spinner-border");
  readonly toastMessage = this.page.locator(".toast-body");
  abstract readonly uniqueElement: Locator;

  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible();
    await expect(this.spinner).toHaveCount(0);
  }

  async open() {
    await this.page.goto(config.baseUrl);
  }
}
