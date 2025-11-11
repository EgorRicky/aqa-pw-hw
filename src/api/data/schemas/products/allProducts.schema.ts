import { requiredFieldsSchema, requiredFields } from "../core.schema";
import { productSchema } from "./product.schema";

export const getAllProductsSchema = {
  type: "object",
  properties: {
    Products: {
      type: "array",
      items: productSchema,
    },
    ...requiredFieldsSchema,
  },
  required: ["Products", ...requiredFields],
};
