/*
Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

Сайт: https://anatoly-karpovich.github.io/test-automation-sandbox/sortable-table
*/

import test, { expect } from "@playwright/test";
import { type Page } from "@playwright/test";
import tableUsers from "testData/tableUsersData";

async function getTableRow(page: Page, email: string): Promise<string[] | undefined> {
  await page.goto("https://anatoly-karpovich.github.io/test-automation-sandbox/");
  const tableSection = page.locator('a[href="/test-automation-sandbox/sortable-table"]');
  await tableSection.click();
  const table = page.locator("table");
  await expect(table).toBeVisible();
  const rows = await table.locator("tr").all();
  const headers: string[] = await table.locator("tr th").allInnerTexts();
  for (const row of rows) {
    const infoFromSingleRow = await row.locator("td").allInnerTexts();
    const objOfVals: Record<string, string> = {};
    for (let i = 0; i < headers.length - 1; i++) {
      const keyName = headers[i] as string;
      const valueName = infoFromSingleRow[i];
      objOfVals[keyName] = valueName ?? "";
    }
    if (objOfVals["Email"] === email) {
      return infoFromSingleRow;
    }
  }
  return undefined;
}

for (let i = 0; i < tableUsers.length; i++) {
  test(`test of the function for email ${tableUsers[i]}`, async ({ page }) => {
    const res = await getTableRow(page, tableUsers[i] ?? "");
    expect(res).toContain(tableUsers[i]);
  });
}
