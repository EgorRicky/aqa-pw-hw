import dotenv from "dotenv";
dotenv.config();
export const apiConfig = {
  baseUrl: process.env.BACKEND_BASE_URL,
  endpoints: {
    login: "/api/login",
    productsAll: "/api/products/all",
    products: "/api/products",
    productById: (id: string) => `/api/products/${id}/`,
    metrics: "/api/metrics",
  },
};
