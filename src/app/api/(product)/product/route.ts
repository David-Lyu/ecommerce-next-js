import DataAPI from "@/lib/api/data_adapter";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { routeAuth } from "../../_functions/routeAuth";

export async function GET(req: NextRequest) {
  //Check hash todo use Forbidden when no longer experimental
  if (!routeAuth(req)) {
    return NextResponse.error();
  }

  //Id check
  const id = req.nextUrl.searchParams.get("id");
  if (!id || isNaN(Number(id))) notFound();

  return Response.json({ data: await DataAPI.getProduct(Number(id)) });
}
