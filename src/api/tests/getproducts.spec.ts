/*
Написать смоук API тест на получение всех продуктов (без фильтрационных параметров) со следующими шагами:
  - Залогиниться
  - Создать продукт и проверить 201й статус
  - Получить все продукты
  - создать и проверить схему
  - проверить статус
  - проверить, что в массиве тела респонса есть созданный продукт
  - Проверить поля IsSuccess и ErrorMessage
*/
import test, { expect } from "@playwright/test";
import { apiConfig } from "../config";
import { config } from "../../ui/config";
import { STATUS_CODES } from "../data/types/statuscodes.enum";
import { generateProductData } from "../../ui/data/salesPortal/generateProductData";
import { getAllProductsSchema } from "../data/schemas/products/allProducts.schema";
import { IProductFromResponse, IGetAllProductsResponse, IProductResponse } from "../data/types/product.types";
import { validateJsonSchema } from "../utils/validate.schema";

test.describe("Get all the products", () => {
  let id = "";
  let token = "";

  test.beforeEach(async ({ request }) => {
    const loginResponse = await request.post(`${apiConfig.baseUrl}${apiConfig.endpoints.login}`, {
      data: {
        username: config.login,
        password: config.password,
      },
      headers: {
        "content-type": "application/json",
      },
    });
    token = loginResponse.headers()["authorization"]!;
    expect(loginResponse.status()).toBe(STATUS_CODES.OK);
    expect(token).toBeTruthy();
  });

  test.afterAll(async ({ request }) => {
    if (id) {
      const deleteResponse = await request.delete(`${apiConfig.baseUrl}${apiConfig.endpoints.productById(id)}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      expect(deleteResponse.status()).toBe(STATUS_CODES.DELETED);
      expect(token).toBeTruthy();
    }
  });

  test("Get all products", async ({ request }) => {
    const product = generateProductData();
    const createProductResponse = await request.post(`${apiConfig.baseUrl}${apiConfig.endpoints.products}`, {
      data: product,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const createdProductBody = (await createProductResponse.json()) as IProductResponse;
    id = createdProductBody.Product._id;
    expect(createProductResponse.status()).toBe(STATUS_CODES.CREATED);
    const productsResponse = await request.get(`${apiConfig.baseUrl}${apiConfig.endpoints.productsAll}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const productsBody = (await productsResponse.json()) as IGetAllProductsResponse;
    validateJsonSchema(productsBody, getAllProductsSchema);
    const foundProduct = productsBody.Products.some(
      (item: IProductFromResponse) => item._id === id && item.name === product.name,
    );
    expect.soft(productsResponse.status()).toBe(STATUS_CODES.OK);
    expect.soft(foundProduct).toBe(true);
    expect.soft(productsBody.IsSuccess).toBe(true);
    expect.soft(productsBody.ErrorMessage).toBe(null);
  });
});
