import DataAPI from "@/lib/api/data_adapter";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";
import { routeAuth } from "../../_functions/routeAuth";

export async function GET(req: NextRequest) {
  console.log("In route");
  console.log(req.headers.get("route_token"));
  //Check hash todo use Forbidden when no longer experimental
  routeAuth(req);

  //Id check
  const id = req.nextUrl.searchParams.get("id");
  if (!id || isNaN(Number(id))) notFound();

  return Response.json({ data: await DataAPI.getProduct(Number(id)) });
}
