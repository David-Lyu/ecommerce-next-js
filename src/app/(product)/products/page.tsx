import { ProductListType } from "@/lib/api/data_adapter/models/products";
import { SearchParams } from "next/dist/server/request/search-params";

type ApiResponse = {
  data: ProductListType;
};

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  let results: ApiResponse | undefined;
  const limit = parseQueryParams((await searchParams).limit);
  const offset = parseQueryParams((await searchParams).offset);
  const tagList = parseQueryTags((await searchParams).categories);

  console.log(limit, offset, tagList);
  try {
    const request = await fetch(
      `http://localhost:${process.env.PORT}/api/products`,
      {
        headers: {
          "Content-Type": "application/json",
          route_token: process.env.ROUTE_HASH,
        },
      },
    );
    if (request.status === 200) {
      results = await request.json();
    } else {
      throw new Error("request status: " + request.status);
    }
  } catch (err) {
    console.error(err);
  }
  console.log(results?.data[0]);

  return (
    <div>
      Hello <p>world</p>
    </div>
  );
};
export default Page;

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
