import { ProductListType, ProductType } from "./products";

export interface BackendAdapter {
  getProducts(): ProductListType;
  getProduct(): ProductType;
}
