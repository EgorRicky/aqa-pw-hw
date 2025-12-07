import { test as base, expect } from "@playwright/test";
import { HomePage } from "../pageObjects/home.page";
import { AddNewProductPage } from "../pageObjects/addNewProduct.page";
import { ProductsListPage } from "../pageObjects/productList.page";
import { SignInPage } from "../pageObjects/siginIn.page";
import { Mock } from "ui/mock/mock";
import { AddNewProductUIService } from "ui/services/addNewProduct.ui-service";
import { HomeUIService } from "ui/services/home.ui-service";
import { LoginUIService } from "ui/services/login.ui-service";
import { ProductsListUIService } from "ui/services/productList.ui-serivce";
import { UpdateProductUIService } from "ui/services/editProduct.ui-service";

export interface IPages {
  homePage: HomePage;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  signInPage: SignInPage;
  mock: Mock;
  homeUIService: HomeUIService;
  productsListUIService: ProductsListUIService;
  addNewProductUIService: AddNewProductUIService;
  loginUIService: LoginUIService;
  updateProductUIService: UpdateProductUIService;
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
  mock: async ({ page }, use) => {
    await use(new Mock(page));
  },
  homeUIService: async ({ page }, use) => {
    await use(new HomeUIService(page));
  },

  productsListUIService: async ({ page }, use) => {
    await use(new ProductsListUIService(page));
  },

  addNewProductUIService: async ({ page }, use) => {
    await use(new AddNewProductUIService(page));
  },

  loginUIService: async ({ page }, use) => {
    await use(new LoginUIService(page));
  },

  updateProductUIService: async ({ page }, use) => {
    await use(new UpdateProductUIService(page));
  },
});

export { expect };
