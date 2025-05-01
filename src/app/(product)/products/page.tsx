import ProductsPage from "@/components/product/productsPage";
import { ProductListType } from "@/lib/api/data_adapter/models/products";
import { ProductTagListType } from "@/lib/api/data_adapter/models/tags";
import { SearchParams } from "next/dist/server/request/search-params";

type Props = {
  searchParams: Promise<SearchParams>;
};

const Page = async ({ searchParams }: Props) => {
  const limit = parseQueryParams((await searchParams).limit) || 10;
  const offset = parseQueryParams((await searchParams).offset);
  const tagList = parseQueryTags((await searchParams).categories);

  const productList: ProductListType = await getProducts(
    limit,
    offset,
    tagList,
  );

  const productTagList: ProductTagListType = await doQuery(
    "http://localhost:3000/api/product_tags",
    {
      headers: {
        "Content-Type": "application/json",
        route_token: process.env.ROUTE_HASH,
      },
    },
  );

  return (
    <ProductsPage
      productList={productList}
      productTagList={productTagList}
      limit={limit}
      offset={offset}
    />
  );
};
export default Page;

//Parse query params
function parseQueryParams(param: string | string[] | undefined): number {
  if (typeof param !== "string") return 0;
  const num = Number(param);
  return !isNaN(num) ? num : 0;
}

function parseQueryTags(param: string[] | undefined | string): number[] {
  if (typeof param === "string") {
    return [parseQueryParams(param)];
  }

  const numArr: number[] = [];
  if (param?.length) {
    for (let i = 0; i < param.length; i++) {
      const id = Number(param[i]);
      if (!isNaN(id)) {
        numArr.push(id);
      }
    }
  }

  return numArr;
}
// API Calls

// async function getTags() {}

async function getProducts(limit: number, offset: number, tagList: number[]) {
  let productList: ProductListType = [];
  try {
    const productsRequestInfo = {
      headers: {
        "Content-Type": "application/json",
        route_token: process.env.ROUTE_HASH,
      },
    };
    let url = "http://localhost:3000/api/products?";

    if (limit) {
      url += `limit=${limit}`;
      if (offset) {
        url += `&offset=${offset}`;
      }
    }

    if (tagList.length) url += "&";
    tagList.forEach((id, i) => {
      // Appends the & if not end of tagList
      url += `tag=${id}` + (i <= tagList.length ? "&" : "");
    });
    productList = await doQuery<ProductListType>(url, productsRequestInfo);
  } catch (err) {
    console.error(err);
  }
  return productList;
}

async function doQuery<Type>(url: string, params?: RequestInit): Promise<Type> {
  const response = await fetch(url, params);
  let data: Type;
  if (response.ok) {
    data = ((await response.json()) as { data: Type }).data;
  } else {
    throw Error(`Response status: ${response.status}`);
  }

  return data;
}
