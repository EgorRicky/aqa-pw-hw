import { MANUFACTURERS } from "../salesPortal/manufactures";

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}

export type ButtonActions = "Details" | "Delete" | "Edit";
