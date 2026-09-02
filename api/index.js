import { readFile } from "node:fs/promises";
import { join } from "node:path";
import server from "../dist/server/server.js";

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};

export default async function handler(req, res) {
  if (req.url?.startsWith("/assets/") || req.url === "/robots.txt") {
    const filePath = req.url.startsWith("/assets/")
      ? join(process.cwd(), "dist/client", req.url)
      : join(process.cwd(), "dist/client/robots.txt");

    try {
      const file = await readFile(filePath);
      const extension = filePath.slice(filePath.lastIndexOf("."));
      res.setHeader("content-type", contentTypes[extension] ?? "application/octet-stream");
      res.setHeader("cache-control", "public, max-age=31536000, immutable");
      res.end(file);
      return;
    } catch {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }
  }

  const host = req.headers.host ?? "localhost";
  const protocol = req.headers["x-forwarded-proto"] ?? "https";
  const request = new Request(`${protocol}://${host}${req.url}`, {
    method: req.method,
    headers: req.headers,
    body: ["GET", "HEAD"].includes(req.method) ? undefined : req,
    duplex: "half",
  });

  const response = await server.fetch(request);
  res.statusCode = response.status;
  response.headers.forEach((value, key) => res.setHeader(key, value));
  res.end(Buffer.from(await response.arrayBuffer()));
}
