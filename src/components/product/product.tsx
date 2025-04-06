import { useEffect } from "react";
import { ProductType } from "@/lib/api/data_adapter/models/products";

export default function Product({ product }: { product: ProductType }) {
  useEffect(() => {
    console.log(product);
  });
  return <div>Product</div>;
}
