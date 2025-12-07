import { expect, Page } from "@playwright/test";
import { apiConfig } from "api/config";
import { generateProductData } from "ui/data/salesPortal/generateProductData";
import { STATUS_CODES } from "api/data/types/statuscodes.enum";
import { IProductResponse } from "api/data/types/product.types";
import { IProduct } from "ui/data/salesPortal/product.types";
import _ from "lodash";
import { AddNewProductPage } from "ui/pageObjects/addNewProduct.page";
import { ProductsListPage } from "ui/pageObjects/productList.page";

export class AddNewProductUIService {
  addNewProductPage: AddNewProductPage;
  productsListPage: ProductsListPage;

  constructor(private page: Page) {
    this.addNewProductPage = new AddNewProductPage(page);
    this.productsListPage = new ProductsListPage(page);
  }

  async open() {
    await this.addNewProductPage.open("products/add");
    await this.addNewProductPage.waitForOpened();
  }

  async create(productData?: Partial<IProduct>) {
    const data = generateProductData(productData);
    await this.addNewProductPage.fillForm(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await this.addNewProductPage.interceptResponse<IProductResponse, any>(
      apiConfig.endpoints.products,
      this.addNewProductPage.clickSave.bind(this.addNewProductPage),
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Product, "_id", "createdOn")).toEqual(data);

    await this.productsListPage.waitForOpened();
    return response.body.Product;
  }
}
