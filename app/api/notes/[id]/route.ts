import type { NextRequest } from "next/server";
import { proxyToBackend } from "@/lib/serverApiProxy";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return proxyToBackend(request, `/notes/${encodeURIComponent(id)}`);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  return proxyToBackend(request, `/notes/${encodeURIComponent(id)}`);
}
