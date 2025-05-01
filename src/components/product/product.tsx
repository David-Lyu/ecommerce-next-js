import { ProductType } from "@/lib/api/data_adapter/models/products";
import Image from "next/image";
import Link from "next/link";
import css from "./product.module.css";

export default function Product({ product }: { product: ProductType }) {
  return (
    <Link href={"/product/" + product.product_id}>
      <section className={css["product-card"]}>
        <h4>{product.name}</h4>
        {product.image && (
          //Todo add external images to modules.export in config
          <div className={css["product-image-container"]}>
            <Image
              src={product.image}
              alt={product.name}
              width="100"
              height="100"
              blurDataURL="/loading_item_remove_if_prod.jpg"
              placeholder="blur"
              unoptimized={true}
            />
          </div>
        )}
        <div className={css["product-info"]}>
          <p>{product.price}</p>
          <p>{product.description}</p>
        </div>
      </section>
    </Link>
  );
}
