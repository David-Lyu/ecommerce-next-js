import { ProductType } from "@/lib/api/data_adapter/models/products";
import Image from "next/image";
import Link from "next/link";

export default function Product({ product }: { product: ProductType }) {
  return (
    <Link href={"/product/" + product.product_id}>
      <section className="product-card">
        <h4>{product.name}</h4>
        {product.image && (
          //Todo add external images to modules.export in config
          <Image src={product.image} alt={product.name} fill={true} />
        )}
        <div className="product-info">
          <p>{product.price}</p>
          {/* <p>{product.description}</p> */}
        </div>
      </section>
    </Link>
  );
}
