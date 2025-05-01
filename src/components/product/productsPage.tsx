"use client";
import { MouseEvent } from "react";
import ProductTagFilters from "../tags/productTagFilters";
import ProductsGrid from "./productGrid";
import { getProductsAction } from "@/app/actions/product/product";
import { ProductTagListType } from "@/lib/api/data_adapter/models/tags";
import { ProductListType } from "@/lib/api/data_adapter/models/products";

type Props = {
  limit: number;
  offset: number;
  productTagList: ProductTagListType;
  productList: ProductListType;
};

export default function ProductsPage(props: Props) {
  //Todo move this to server actions
  const onClickTagFilters = (e: MouseEvent) => {
    console.log(e);
    const id = (e.currentTarget as HTMLButtonElement).dataset.id;
    if (id) {
      getProductsAction(props.limit, props.offset, [Number(id)]);
    }
  };

  return (
    <div>
      {/* Tag filter here */}
      <ProductTagFilters
        productTagList={props.productTagList}
        callBack={onClickTagFilters}
      />
      <ProductsGrid productList={props.productList} />
    </div>
  );
}
