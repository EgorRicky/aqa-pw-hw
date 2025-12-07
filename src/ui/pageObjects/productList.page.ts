import { SalesPortalPage } from "./salesPortal.page";
import { ButtonActions } from "../data/salesPortal/product.types";
import { ProductDetailsModal } from "./detailsModal.page";
import { DeleteModal } from "./deleteModal.page";

export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly searchInput = this.page.locator("#search");
  readonly searchButton = this.page.locator("#search-products");
  readonly detailsModal = new ProductDetailsModal(this.page);
  readonly deleteModal = new DeleteModal(this.page);
  readonly detailsButton = (productName: string) => this.tableRowByName(productName).getByTitle("Details");
  readonly saveButtonEditProduct = this.page.locator("#save-product-changes");

  readonly tableRowByName = (productName: string) =>
    this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: productName }) });

  readonly actionButton = (productName: string, action: ButtonActions) =>
    this.tableRowByName(productName).locator(`button[title=${action}]`);

  readonly editButton = (productName: string) => this.tableRowByName(productName).locator("[title=Edit]");

  readonly uniqueElement = this.addNewProductButton;

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  async clickOnActionButton(productName: string, action: ButtonActions) {
    await this.actionButton(productName, action).click();
  }

  async clickOnEditButton(productName: string) {
    await this.editButton(productName).click();
  }

  async fillSearchInput(text: string) {
    await this.searchInput.fill(text);
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async clickSaveEditProduct() {
    await this.saveButtonEditProduct.click();
  }
}
