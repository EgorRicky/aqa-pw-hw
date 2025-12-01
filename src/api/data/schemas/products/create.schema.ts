import { requiredFieldsSchema, requiredFields } from "../core.schema";
import { productSchema } from "./product.schema";

export const createProductSchema = {
  type: "object",
  properties: {
    Product: productSchema,
    ...requiredFieldsSchema,
  },
  required: ["Product", ...requiredFields],
};
