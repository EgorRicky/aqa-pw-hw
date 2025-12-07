import { expect, Page } from "@playwright/test";
import { IProductDetails } from "api/data/types/product.types";
import _ from "lodash";
import { AddNewProductPage } from "ui/pageObjects/addNewProduct.page";
import { ProductsListPage } from "ui/pageObjects/productList.page";
import { convertToFullDateAndTime } from "ui/utils/convertionDate.utils";
import { IProduct } from "ui/data/salesPortal/product.types";
import { ProductDetailsModal } from "ui/pageObjects/detailsModal.page";

export class ProductsListUIService {
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  productDetailsModal: ProductDetailsModal;

  constructor(private page: Page) {
    this.productsListPage = new ProductsListPage(page);
    this.addNewProductPage = new AddNewProductPage(page);
    this.productDetailsModal = new ProductDetailsModal(page);
  }

  async openAddNewProductPage() {
    await this.productsListPage.clickAddNewProduct();
    await this.addNewProductPage.waitForOpened();
  }

  async openDetailsModal(productName: string) {
    await this.productsListPage.detailsButton(productName).click();
    await this.productsListPage.detailsModal.waitForOpened();
  }

  async openDeleteModal(productName: string) {
    await this.productsListPage.clickOnActionButton(productName, "Delete");
    await this.productsListPage.deleteModal.waitForOpened();
  }

  async deleteProduct(productName: string) {
    await this.productsListPage.clickOnActionButton(productName, "Delete");
    await this.productsListPage.deleteModal.waitForOpened();
    await this.productsListPage.deleteModal.clickOnDeleteButton();
    await this.productsListPage.deleteModal.waitForClosed();
  }

  async clickOneditProduct(productName: string) {
    await this.productsListPage.clickOnEditButton(productName);
  }

  async search(text: string) {
    await this.productsListPage.fillSearchInput(text);
    await this.productsListPage.clickSearch();
    await this.productsListPage.waitForOpened();
  }

  async open() {
    await this.productsListPage.open("products");
    await this.productsListPage.waitForOpened();
  }

  assertDetailsData(actual: IProductDetails, expected: IProductDetails) {
    expect(actual).toEqual({
      ..._.omit(expected, ["_id"]),
      createdOn: convertToFullDateAndTime(expected.createdOn),
    });
  }

  async assertProductInTable(productName: string, { visible }: { visible: boolean }) {
    await expect(this.productsListPage.tableRowByName(productName)).toBeVisible({ visible });
  }

  async assertDetailsDataAfterEdit(actual: IProductDetails, expected: IProduct) {
    await expect({ ..._.omit(actual, ["createdOn"]) }).toEqual({
      ..._.omit(expected, ["_id"]),
    });
  }
}
