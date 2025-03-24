import { ProductListType, ProductType } from "./products";

export interface BackendAdapter {
  initialize(): void;
  getProducts(): ProductListType;
  getProduct(): ProductType;
}
