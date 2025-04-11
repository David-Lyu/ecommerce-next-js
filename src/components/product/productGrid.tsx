import Product from "./product";
import { ProductListPropType } from "./types";

export default function ProductsGrid(props: ProductListPropType) {
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
