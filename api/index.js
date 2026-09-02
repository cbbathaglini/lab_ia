import server from "../dist/server/server.js";

export default async function handler(req, res) {
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
