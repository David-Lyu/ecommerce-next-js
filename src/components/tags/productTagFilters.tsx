import { ProductTagListType } from "@/lib/api/data_adapter/models/tags";
type Props = {
  productTagList: ProductTagListType;
  callBack: (e: React.MouseEvent) => void;
};

export default function ProductTagFilters({ productTagList, callBack }: Props) {
  return productTagList.length ? (
    <section className="product-tag_filter_container">
      {productTagList.map((tag) => {
        return (
          <button
            onClick={callBack}
            className="product-tag_filter"
            data-id={tag.id}
            key={"product_tag" + tag.id}
          >
            {tag.name}
          </button>
        );
      })}
    </section>
  ) : null;
}
