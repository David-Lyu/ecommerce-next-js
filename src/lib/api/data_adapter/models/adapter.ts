import { ProductListType, ProductType } from "./products";
import { ProductTagType, ProductTagListType } from "./tags";

export interface DataAdapter {
  initialize(): void;
  getProducts(
    limit: number,
    offset: number,
    categoryIdList?: number[],
  ): Promise<ProductListType>;
  getProduct(id: number): Promise<ProductType>;
  getProductTag(id: number): Promise<ProductTagType>;
  getProductTags(): Promise<ProductTagListType>;
}
