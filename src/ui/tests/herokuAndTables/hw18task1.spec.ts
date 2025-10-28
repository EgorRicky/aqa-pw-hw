/*
Разработать тест со следующими шагами:
  - открыть https://the-internet.herokuapp.com/
  - перейти на страницу Dynamic Controls
  - Дождаться появления кнопки Remove
  - Завалидировать текста в заголовке страницы
  - Чекнуть чекбокс
  - Кликнуть по кнопке Remove
  - Дождаться исчезновения чекбокса
  - Проверить наличие кнопки Add
  - Завалидировать текст It's gone!
  - Кликнуть на кнопку Add
  - Дождаться появления чекбокса
  - Завалидировать текст It's back!
*/

import { test, expect } from "@playwright/test";
const url = "https://the-internet.herokuapp.com/";

test("Dynamic controls", async ({ page }) => {
  const dynamicControlButton = page.getByText("Dynamic Controls");
  const removeButton = page.getByRole("button", { name: "Remove" });
  const headerOfThePage = page.locator("h4:nth-child(1)");
  const subTextOfHeader = page.locator(".example p");
  const subHeader = page.getByRole("heading", { name: "Remove/add" }); // не определил я нормально локатор, получается конфликт со следующим h4. Плюнул и вставил плейрайтовский сахар
  const checkBox = page.locator("input[type=checkbox]");
  const addButton = page.getByRole("button", { name: "Add" });
  const message = page.locator("#message");
  await page.goto(url);
  await dynamicControlButton.click();
  await removeButton.waitFor({ state: "visible" });
  await expect(headerOfThePage).toHaveText("Dynamic Controls");
  await expect(subTextOfHeader).toHaveText(
    "This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.",
  );
  await expect(subHeader).toHaveText("Remove/add");
  await checkBox.check();
  await removeButton.click();
  await expect(checkBox).toBeHidden();
  await addButton.waitFor({ state: "visible" });
  await expect(message).toHaveText("It's gone!");
  await addButton.click();
  await checkBox.waitFor({ state: "visible" });
  await expect(message).toHaveText("It's back!");
});
