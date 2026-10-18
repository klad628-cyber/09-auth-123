import type { NextRequest } from "next/server";

const API_BASE_URL =
  process.env.NOTEHUB_API_URL ?? "https://notehub-api.goit.study";

export async function proxyToBackend(
  request: NextRequest,
  backendPath: string,
): Promise<Response> {
  const url = new URL(
    `${API_BASE_URL.replace(/\/+$/, "")}/${backendPath.replace(/^\/+/, "")}`,
  );

  for (const [key, value] of request.nextUrl.searchParams.entries()) {
    url.searchParams.append(key, value);
  }

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const cookie = request.headers.get("cookie");

  if (contentType) headers.set("content-type", contentType);
  if (cookie) headers.set("cookie", cookie);

  try {
    const upstream = await fetch(url, {
      method: request.method,
      headers,
      body:
        request.method === "GET" || request.method === "HEAD"
          ? undefined
          : await request.text(),
      cache: "no-store",
      credentials: "include",
    });

    const responseHeaders = new Headers();
    const contentTypeHeader = upstream.headers.get("content-type");
    if (contentTypeHeader) {
      responseHeaders.set("content-type", contentTypeHeader);
    }

    const getSetCookie = (
      upstream.headers as Headers & { getSetCookie?: () => string[] }
    ).getSetCookie;
    const setCookieValues = getSetCookie?.call(upstream.headers) ?? [];

    if (setCookieValues.length > 0) {
      for (const value of setCookieValues) {
        responseHeaders.append("set-cookie", value);
      }
    } else {
      const singleCookieHeader = upstream.headers.get("set-cookie");
      if (singleCookieHeader) {
        responseHeaders.set("set-cookie", singleCookieHeader);
      }
    }

    const responseBody = upstream.status === 204 ? null : await upstream.text();
    return new Response(responseBody, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch {
    return Response.json(
      { message: "Unable to reach the NoteHub API" },
      { status: 502 },
    );
  }
}
