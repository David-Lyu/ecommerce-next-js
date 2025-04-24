import { NextRequest, NextResponse } from "next/server";
import { routeAuth } from "../../_functions/routeAuth";
import SQLiteDB from "@/lib/api/data_adapter/db/sqlite";
import DataAPI from "@/lib/api/data_adapter";

export default function GET(req: NextRequest) {
  if (!routeAuth(req)) {
    return NextResponse.error();
  }

  DataAPI.getProductTags();
}
