import { ProductListType, ProductType } from "./products";

export interface DataAdapter {
  initialize(): void;
  getProducts(): Promise<ProductListType>;
  getProduct(id: number, categoryId?: number): Promise<ProductType>;
}
