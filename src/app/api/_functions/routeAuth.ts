import { NextRequest } from "next/server";
import RouteAuth from "@/lib/auth/route_auth";
import { notFound } from "next/navigation";

export function routeAuth(req: NextRequest) {
  if (req.headers.get("route_token") !== RouteAuth.authHash) notFound();
}
