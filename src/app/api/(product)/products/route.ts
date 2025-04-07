import DataAPI from "@/lib/api/data_adapter/index";
import { ProductListType } from "@/lib/api/data_adapter/models/products";
import { type NextRequest } from "next/server";
import { routeAuth } from "../../_functions/routeAuth";
export async function GET(req: NextRequest) {
  //Need to get limit offset and category[]
  routeAuth(req);

  const offset = Number(req.nextUrl.searchParams.get("offset")) ?? 0;
  const limit = Number(req.nextUrl.searchParams.get("limit")) ?? 0;
  const tagNameList = req.nextUrl.searchParams.getAll("tag") ?? undefined;
  let tagIdList = undefined;

  if (tagNameList.length) {
    tagIdList = [];
    //Todo: Get tagId
  }

  let data: ProductListType | null = null;
  data = await DataAPI.getProducts(Number(limit), Number(offset), tagIdList);
  return Response.json({ data });
}
