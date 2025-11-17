import { ID, IResponseFields } from "./core.types";
import { IProduct } from "ui/data/salesPortal/product.types";
export interface ICreatedOn {
  createdOn: string;
}
export interface IProductFromResponse extends Required<IProduct>, ICreatedOn, ID {}
export interface IGetAllProductsResponse {
  Products: IProductFromResponse[];
  IsSuccess: boolean;
  ErrorMessage: string | null;
}
export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
}
