import test, { expect } from "@playwright/test";
import { config } from "../../config";
import { NOTIFICATIONS } from "../../data/salesPortal/notifications";
import { generateProductData } from "../../data/salesPortal/generateProductData";
import { HomePage } from "../../pageObjects/home.page";
import { AddNewProductPage } from "../../pageObjects/addNewProduct.page";
import { ProductsListPage } from "../../pageObjects/productList.page";
import { SignInPage } from "../../pageObjects/siginIn.page";
import { DeleteModal } from "ui/pageObjects/deleteModal.page";

test.describe("[Sales Portal] [Products]", async () => {
  test.only("Delete product", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);
    const signInPage = new SignInPage(page);
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
