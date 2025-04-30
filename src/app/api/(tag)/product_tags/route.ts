import { NextRequest, NextResponse } from "next/server";
import { routeAuth } from "../../_functions/routeAuth";
import DataAPI from "@/lib/api/data_adapter";

export default async function GET(req: NextRequest) {
  if (!routeAuth(req)) {
    return NextResponse.error();
  }

  Response.json({ data: await DataAPI.getProductTags() });
}
