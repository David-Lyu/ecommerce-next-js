import { ProductListType, ProductType } from "./products";

export default interface BackendAdapter {
  getProducts(): ProductListType;
  getProduct(): ProductType;
}
