import Product from "./product";
import { ProductListPropType } from "./types";

export default function ProductsGrid(props: ProductListPropType) {
  return (
    <section>
      {props.productList.map((product) => {
        return <Product product={product} key={"product" + product.id} />;
      })}
    </section>
  );
}
