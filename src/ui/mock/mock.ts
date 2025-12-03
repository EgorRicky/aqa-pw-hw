import { Page } from "@playwright/test";
import { apiConfig } from "api/config";
import { STATUS_CODES } from "api/data/types/statuscodes.enum";
import { IMetricsResponse } from "api/data/types/metric.types";

export class Mock {
  constructor(private page: Page) {}

  async metrics(body: IMetricsResponse, statusCode: STATUS_CODES = STATUS_CODES.OK) {
    await this.page.route(apiConfig.baseUrl + apiConfig.endpoints.metrics, async (route) => {
      await route.fulfill({
        status: statusCode,
        contentType: "application/json",
        body: JSON.stringify(body),
      });
    });
  }
}
