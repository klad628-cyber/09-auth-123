import type { NextRequest } from "next/server";
import { proxyToBackend } from "@/lib/serverApiProxy";

export function POST(request: NextRequest) {
  return proxyToBackend(request, "/auth/register");
}
