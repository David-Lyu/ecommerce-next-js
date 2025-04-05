import { useEffect } from "react";
import { Product as ProductType } from "./types";

export default function Product({ product }: { product: ProductType }) {
  useEffect(() => {
    console.log(product);
  });
  return <div>Product</div>;
}
