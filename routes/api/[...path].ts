import { Handler } from "$fresh/server.ts";
import { Hono } from "hono";
import { cors } from "hono/cors";

/* /api/* 以下へのリクエストは全てこのファイルで受け取る */

const app = new Hono().basePath("/api");

// ルーティングの設定
const route = app
  .use("/api/*", cors())
  .get("/status", (c) => c.json({ status: "ok" }))
  .get("/hello", (c) => c.json({ hello: "world" }));

export const handler: Handler = (req) => app.fetch(req);
export type AppType = typeof route; // rpcモードを使用するときはこのAppTypeをexportする
