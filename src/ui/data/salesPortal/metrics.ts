import { HomePage } from "ui/pageObjects/home.page";
import { Locator } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { IMetrics } from "api/data/types/metric.types";

interface ICreateMetricData {
  title: string;
  locator: (page: HomePage) => Locator;
  expectedData: string;
}

export function generateMetricsData(params?: Partial<IMetrics>): IMetrics {
  return {
    orders: {
      totalOrders: faker.number.int({ min: 0, max: 100 }),
      totalRevenue: faker.number.int({ min: 0, max: 100 }),
      averageOrderValue: faker.number.int({ min: 0, max: 100 }),
      totalCanceledOrders: faker.number.int({ min: 0, max: 100 }),
      recentOrders: [],
      ordersCountPerDay: [],
      ...params?.orders,
    },
    customers: {
      totalNewCustomers: faker.number.int({ min: 0, max: 100 }),
      topCustomers: [],
      customerGrowth: [],
      ...params?.customers,
    },
    products: {
      topProducts: [],
      ...params?.products,
    },
  };
}
export const metricsData = generateMetricsData();

export const metricCases: ICreateMetricData[] = [
  {
    title: "Orders This Year",
    locator: (page: HomePage) => page.ordersThisYear,
    expectedData: metricsData.orders.totalOrders.toString(),
  },
  {
    title: "New Customers",
    locator: (page: HomePage) => page.newCustomers,
    expectedData: metricsData.customers.totalNewCustomers.toString(),
  },
  {
    title: "Canceled Orders",
    locator: (page: HomePage) => page.canceledOrders,
    expectedData: metricsData.orders.totalCanceledOrders.toString(),
  },
];
