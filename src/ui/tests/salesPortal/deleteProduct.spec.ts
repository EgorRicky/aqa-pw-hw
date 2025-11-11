// import test, { expect } from "@playwright/test";
import { test, expect } from "../../fixtures/pages.fixture";
import { config } from "../../config";
import { NOTIFICATIONS } from "../../data/salesPortal/notifications";
import { generateProductData } from "../../data/salesPortal/generateProductData";
import { DeleteModal } from "ui/pageObjects/deleteModal.page";

test.describe("[Sales Portal] [Products]", async () => {
  test("Delete product", async ({ page, signInPage, homePage, productsListPage, addNewProductPage }) => {
    const deleteModal = new DeleteModal(page);
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
    await productsListPage.clickOnActionButton(productData.name, "Delete");
    await deleteModal.clickOnDeleteButton();
    await expect(productsListPage.tableRowByName(productData.name)).toBeHidden();
  });
});
