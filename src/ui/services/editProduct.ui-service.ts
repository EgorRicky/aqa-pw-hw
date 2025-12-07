import { Page } from "@playwright/test";
import { IProduct } from "ui/data/salesPortal/product.types";
import { AddNewProductPage } from "ui/pageObjects/addNewProduct.page";
import { ProductsListPage } from "ui/pageObjects/productList.page";

export class UpdateProductUIService {
  addNewProductPage: AddNewProductPage;
  productsListPage: ProductsListPage;

  constructor(private page: Page) {
    this.addNewProductPage = new AddNewProductPage(page);
    this.productsListPage = new ProductsListPage(page);
  }

  async update(productData: IProduct) {
    await this.addNewProductPage.fillForm(productData);
    await this.productsListPage.clickSaveEditProduct();
    await this.productsListPage.waitForOpened();
  }
}
