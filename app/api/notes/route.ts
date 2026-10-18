import type { NextRequest } from "next/server";
import { proxyToBackend } from "@/lib/serverApiProxy";

export function GET(request: NextRequest) {
  return proxyToBackend(request, "/notes");
}

export function POST(request: NextRequest) {
  return proxyToBackend(request, "/notes");
}
