import { FreshContext } from "$fresh/server.ts";
import { basicAuth } from "https://deno.land/x/basic_auth@v1.1.1/mod.ts";

export async function handler(
  req: Request,
  ctx: FreshContext,
) {
  /* /api/* 配下のパスにはBASIC認証を適用しない */
  const url = new URL(req.url);
  if (url.pathname.startsWith("/api/")) {
    console.log("skip basic auth");
    return await ctx.next();
  }

  const unauthorized = basicAuth(req, "config-app", {
    "user": "password",
  });
  if (unauthorized) return unauthorized;

  return await ctx.next();
}
