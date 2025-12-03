/*
Создайте 3 интеграционных теста для проверки следующих метрик на странице Home:
1. Orders This Year
2. New Customers
3. Canceled Orders

Для реализации подмокивайте респонс эндпоинта metrics

  - Orders This Year: Metrics.orders.totalOrders
  - New Customers: Metrics.customers.totalNewCustomers
  - Canceled Orders: Metrics.orders.totalCanceledOrders

Остальной объект оставьте как есть сейчас в респонсе, замените просто на ваши данные в метриках нужных
*/

import { test, expect } from "../../fixtures/pages.fixture";
import { config } from "../../config";
import { metricCases, metricsData } from "../../data/salesPortal/metrics";

test.describe("Sales portal - metrics", async () => {
  test.beforeEach(async ({ mock, homePage, signInPage }) => {
    await mock.metrics({
      Metrics: metricsData,
      IsSuccess: true,
      ErrorMessage: null,
    });
    await homePage.open();
    await expect(signInPage.emailInput).toBeVisible();
    await signInPage.fillCreds(config.login, config.password);
    await signInPage.clickOnLoginButton();
    await homePage.waitForOpened();
  });
  for (const { title, locator, expectedData } of metricCases) {
    test(`[Metrics] ${title}`, async ({ homePage }) => {
      await expect(locator(homePage)).toHaveText(expectedData);
    });
  }
});
