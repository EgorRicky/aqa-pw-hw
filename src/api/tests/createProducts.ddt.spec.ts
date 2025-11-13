/*
Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
  - с позитивными проверками

  Используйте LoginApiService, ProductsApi, после каждого теста, где создастся продукт - удаляйте его.

  Требования:
  Name: обязательное, уникальное, Products's name should contain only 3-40 alphanumerical characters and one space between
  Manufacturer: обязательное
  Price: обязательное, Price should be in range 1-99999
  Amount: обязательное, Amount should be in range 0-999
  Notes: Notes should be in range 0-250 and without < or > symbols
*/

import { test } from "../fixtures/api.fixture";
import { createProductPositiveCases } from "../data/testData/createPositiveCases";
import { generateProductData } from "ui/data/salesPortal/generateProductData";
import { createProductSchema } from "../data/schemas/products/create.schema";
import { STATUS_CODES } from "../data/types/statuscodes.enum";
import { validateResponse } from "../utils/validate.response";

test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  test.beforeEach(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });
  for (const { title, value } of createProductPositiveCases) {
    test(title, async ({ productsApi }) => {
      const productData = generateProductData(value);
      const response = await productsApi.create(productData, token);

      validateResponse(response, {
        status: STATUS_CODES.CREATED,
        IsSuccess: true,
        ErrorMessage: null,
        schema: createProductSchema,
      });
      id = response.body.Product._id;
    });
  }

  // test("NOT create product with invalid data", async ({ loginApiService, productsApi }) => {
  //     token = await loginApiService.loginAsAdmin();
  //     const productData = generateProductData();
  //     const createdProduct = await productsApi.create({ ...productData, name: 123 } as unknown as IProduct, token);
  //     validateResponse(createdProduct, {
  //         status: STATUS_CODES.BAD_REQUEST,
  //         IsSuccess: false,
  //         ErrorMessage: "Incorrect request body",
  //     });
  // });
});
