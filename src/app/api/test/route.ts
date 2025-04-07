import DataAPI from "@/lib/api/data_adapter/index";
import {
  ProductListType,
  ProductType,
} from "@/lib/api/data_adapter/models/products";
import { type NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("single");
  let data: ProductListType | ProductType | null = null;
  console.log(query);
  if (query) {
    data = await DataAPI.getProduct(1);
    console.log(query);
    console.log(data);
  } else {
    data = await DataAPI.getProducts(10, 0, [1, 2]);
  }
  return Response.json({ data });
}
