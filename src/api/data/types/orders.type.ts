import { ICustomer } from "./customers.types";
import { IDelivery } from "./delivery.types";
import { IProduct } from "ui/data/salesPortal/product.types";

export interface IOrdersMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCanceledOrders: number;
  recentOrders: IRecentOrder[];
  ordersCountPerDay: IOrdersCountPerDay[];
}

export interface IRecentOrder {
  _id: string;
  status: string;
  customer: ICustomer;
  products: IProduct[];
  total_price: number;
  createdOn: string;
  delivery: IDelivery;
  comments: unknown[];
  history: unknown;
  assignedManager: unknown;
}

export interface IOrdersCountPerDay {
  date: IOrderDate;
  count: number;
}

export interface IOrderDate {
  day: number;
  month: number;
  year: number;
}
