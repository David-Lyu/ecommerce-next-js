import Product from "./product";
import { ProductList } from "./types";

export default function ProductsGrid(props: ProductList) {
  return (
    <section>
      {props.productList.map((product) => {
        return <Product product={product} key={"product" + product.id} />;
      })}
    </section>
  );
}
