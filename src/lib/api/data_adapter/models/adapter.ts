import { ProductListType, ProductType } from "./products";

export interface DataAdapter {
  initialize(): void;
  getProducts(): ProductListType;
  getProduct(): ProductType;
}
