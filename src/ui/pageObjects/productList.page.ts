import { SalesPortalPage } from "./salesPortal.page";
import { ButtonActions } from "../data/salesPortal/product.types";

export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');

  readonly tableRowByName = (productName: string) =>
    this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: productName }) });

  readonly actionButton = (productName: string, action: ButtonActions) =>
    this.tableRowByName(productName).locator(`button[title=${action}]`);

  readonly uniqueElement = this.addNewProductButton;

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  async clickOnActionButton(productName: string, action: ButtonActions) {
    await this.actionButton(productName, action).click();
  }
}
