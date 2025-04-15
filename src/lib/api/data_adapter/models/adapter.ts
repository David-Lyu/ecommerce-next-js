import { ProductListType, ProductType } from "./products";
import { ProductTag, ProductTagList } from "./tags";

export interface DataAdapter {
  initialize(): void;
  getProducts(
    limit: number,
    offset: number,
    categoryIdList?: number[],
  ): Promise<ProductListType>;
  getProduct(id: number): Promise<ProductType>;
  getProductTag(id: number): Promise<ProductTag>;
  getProductTags(): Promise<ProductTagList>;
}
