import { faker } from "@faker-js/faker";
import { IProduct } from "ui/data/salesPortal/product.types";

export const createProductPositiveCases: { title: string; value: Partial<IProduct> }[] = [
  // Name
  {
    title: "Valid name",
    value: {
      name: faker.string.alphanumeric({ length: 15 }),
    },
  },
  {
    title: "boundary values top - name",
    value: {
      name: faker.string.alphanumeric({ length: 40 }),
    },
  },
  {
    title: "boundary values down - name",
    value: {
      name: faker.string.alphanumeric({ length: 3 }),
    },
  },
  {
    title: "single space in name",
    value: {
      name: `${faker.string.alphanumeric({ length: 10 })} ${faker.string.alphanumeric({ length: 10 })}`,
    },
  },
  //Price
  {
    title: "boundary values down price",
    value: {
      price: 1,
    },
  },
  {
    title: "boundary values up price",
    value: {
      price: 99999,
    },
  },
  {
    title: "valid price",
    value: {
      price: 1022,
    },
  },
  //Amount
  {
    title: "Amount at minimum 0",
    value: {
      amount: 0,
    },
  },
  {
    title: "Amount at maximum 999",
    value: {
      amount: 999,
    },
  },
  //Notes
  {
    title: "Empty notes",
    value: {
      notes: "",
    },
  },
  {
    title: "Notes with 100 characters",
    value: {
      notes: faker.string.alphanumeric({ length: 100 }),
    },
  },
  {
    title: "Notes with 250 characters",
    value: {
      notes: faker.string.alphanumeric({ length: 250 }),
    },
  },
];
