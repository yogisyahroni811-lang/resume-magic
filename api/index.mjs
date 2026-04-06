import { Readable } from "node:stream";

/**
 * @type {import('@vercel/node').VercelRequestHandler}
 */
export default async function handler(request, response) {
  try {
    // Import the TanStack Start server entry dynamically
    const serverEntry = await import("../dist/server/server.js");

    const protocol = request.headers["x-forwarded-proto"] || "http";
    const host = request.headers.host || "localhost";
    const url = `${protocol}://${host}${request.url}`;

    // Convert Node.js IncomingMessage to Web Request
    const method = (request.method || "GET").toUpperCase();
    const headers = new Headers();
    for (const [key, value] of Object.entries(request.headers)) {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          for (const item of value) headers.append(key, item);
        } else {
          headers.set(key, String(value));
        }
      }
    }

    const webRequest = new Request(url, {
      method,
      headers,
      body:
        method !== "GET" && method !== "HEAD"
          ? Readable.toWeb(request)
          : undefined,
      duplex: "half",
    });

    // Call the TanStack Start server
    const webResponse = await serverEntry.default.fetch(webRequest);

    // Set response status
    response.statusCode = webResponse.status;
    response.statusMessage = webResponse.statusText;

    // Set response headers
    webResponse.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        const existing = response.getHeader("set-cookie");
        if (!existing) {
          response.setHeader("set-cookie", value);
        } else if (Array.isArray(existing)) {
          response.setHeader("set-cookie", [...existing, value]);
        } else {
          response.setHeader("set-cookie", [String(existing), value]);
        }
      } else {
        response.setHeader(key, value);
      }
    });

    // Send response body
    if (method === "HEAD" || !webResponse.body) {
      response.end();
      return;
    }

    Readable.fromWeb(webResponse.body).pipe(response);
  } catch (error) {
    console.error("Vercel SSR error:", error);
    if (!response.headersSent) {
      response.statusCode = 500;
      response.setHeader("Content-Type", "text/plain; charset=utf-8");
    }
    response.end("Internal Server Error");
  }
}

// @ts-ignore
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
