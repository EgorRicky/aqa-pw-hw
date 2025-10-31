import { test, expect } from "../../fixtures/pages.fixture";
import { config } from "../../config";
import { NOTIFICATIONS } from "../../data/salesPortal/notifications";
import { generateProductData } from "../../data/salesPortal/generateProductData";

test.describe("[Sales Portal] [Products]", async () => {
  test("Add new product", async ({ signInPage, homePage, productsListPage, addNewProductPage }) => {
    await homePage.open();
    await expect(signInPage.emailInput).toBeVisible();
    await signInPage.fillCreds(config.login, config.password);
    await signInPage.clickOnLoginButton();
    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
  });
});
