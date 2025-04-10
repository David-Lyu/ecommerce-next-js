import { NextRequest, NextResponse } from "next/server";

export function routeAuth(req: NextRequest) {
  if (req.headers.get("route_token") === process.env.ROUTE_HASH) {
    return true;
  }
}
export function routeAuth404(req: NextRequest) {
  if (!routeAuth(req)) {
    return NextResponse.error();
  }
}
