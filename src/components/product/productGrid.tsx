"use client";
import Product from "./product";
import { ProductListPropType } from "./types";

export default function ProductsGrid(props: ProductListPropType) {
  console.log(props);
  return (
    <section>
      {props.productList.map((product, index) => {
        return (
          <Product
            product={product}
            key={"product" + (product.product_id ?? index)}
          />
        );
      })}
    </section>
  );
}
