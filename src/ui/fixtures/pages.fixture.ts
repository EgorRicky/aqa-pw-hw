import { test as base, expect } from "@playwright/test";
import { HomePage } from "../pageObjects/home.page";
import { AddNewProductPage } from "../pageObjects/addNewProduct.page";
import { ProductsListPage } from "../pageObjects/productList.page";
import { SignInPage } from "../pageObjects/siginIn.page";

export interface IPages {
  homePage: HomePage;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  signInPage: SignInPage;
}

export const test = base.extend<IPages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },
  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  },
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
});

export { expect };
