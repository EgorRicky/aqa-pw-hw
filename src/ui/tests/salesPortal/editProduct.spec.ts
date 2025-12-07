import { test, expect } from "ui/fixtures/index";
import { generateProductData } from "ui/data/salesPortal/generateProductData";
import { NOTIFICATIONS } from "ui/data/salesPortal/notifications";

test.describe("Data of products", () => {
  let id = "";
  let token = "";

  test("Update product", async ({
    loginUIService,
    homeUIService,
    productsListUIService,
    productsApiService,
    productsListPage,
    updateProductUIService,
  }) => {
    token = await loginUIService.login();
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;
    await homeUIService.openModule("Products");
    await productsListUIService.clickOneditProduct(createdProduct.name);
    const updatedData = generateProductData();
    await updateProductUIService.update(updatedData);
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_UPDATED);
    await productsListUIService.openDetailsModal(updatedData.name);
    const modalData = await productsListPage.detailsModal.getData();
    productsListUIService.assertDetailsDataAfterEdit(modalData, updatedData);
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });
});
