import { Handler } from "$fresh/server.ts";
import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { cors } from "hono/cors";
import { route } from "../../api/route.ts";

/* /api/* 以下へのリクエストは全てこのファイルで受け取る */

const app = new OpenAPIHono().basePath("/api")
  .openapi(route, (c) => {
    const { id } = c.req.valid("param");
    return c.json({
      id,
      age: 20,
      name: "Ultra-man",
    });
  })
  .doc("/doc_spec", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "My API",
    },
  })
  .get(
    "/doc",
    swaggerUI({
      url: "/api/doc_spec",
    }),
  );

// ルーティングの設定
// const route = app
//   .use("/api/*", cors())
//   .get("/status", (c) => c.json({ status: "ok" }))
//   .get("/hello", (c) => c.json({ hello: "world" }));

export const handler: Handler = (req) => app.fetch(req);
export type AppType = typeof route; // rpcモードを使用するときはこのAppTypeをexportする
