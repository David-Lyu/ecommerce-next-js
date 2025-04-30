import { NextRequest, NextResponse } from "next/server";
import { routeAuth } from "../../_functions/routeAuth";
import DataAPI from "@/lib/api/data_adapter";
import { notFound } from "next/navigation";

export default async function GET(req: NextRequest) {
  if (!routeAuth(req)) {
    return NextResponse.error();
  }

  //Id check
  const id = Number(req.nextUrl.searchParams.get("id"));
  //okay with falsey value including 0
  if (!id || isNaN(id)) notFound();

  return Response.json({ data: await DataAPI.getProductTag(id) });
}
