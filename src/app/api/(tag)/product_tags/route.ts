import { NextRequest, NextResponse } from "next/server";
import { routeAuth } from "../../_functions/routeAuth";
import DataAPI from "@/lib/api/data_adapter";

export async function GET(req: NextRequest) {
  if (!routeAuth(req)) {
    return NextResponse.error();
  }

  return Response.json({ data: await DataAPI.getProductTags() });
}
