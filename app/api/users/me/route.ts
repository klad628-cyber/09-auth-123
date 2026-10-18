import type { NextRequest } from "next/server";
import { proxyToBackend } from "@/lib/serverApiProxy";

export function GET(request: NextRequest) {
  return proxyToBackend(request, "/users/me");
}

export function PATCH(request: NextRequest) {
  return proxyToBackend(request, "/users/me");
}
