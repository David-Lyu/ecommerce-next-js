import { ProductListType, ProductType } from "./products";

export interface DataAdapter {
  initialize(): void;
  getProducts(
    limit: number,
    offset: number,
    categoryIdList?: number[],
  ): Promise<ProductListType>;
  getProduct(id: number): Promise<ProductType>;
}
