const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const root = __dirname;
const port = Number(process.argv[2] || process.env.PORT || 8000);

const mimeTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".m4v": "video/x-m4v",
  ".md": "text/markdown; charset=utf-8",
  ".mov": "video/quicktime",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8"
};

function sendFile(response, filePath) {
  const extension = path.extname(filePath).toLowerCase();
  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("File not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": mimeTypes[extension] || "application/octet-stream",
      "Content-Length": data.length
    });
    response.end(data);
  });
}

function isSafePath(filePath) {
  return filePath.startsWith(root);
}

function handleRequest(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);
  const requestedPath = path.join(root, pathname);
  const hasFileExtension = Boolean(path.extname(pathname));

  if (!isSafePath(requestedPath)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(requestedPath, (error, stats) => {
    if (!error && stats.isFile()) {
      sendFile(response, requestedPath);
      return;
    }

    if (!error && stats.isDirectory()) {
      const indexPath = path.join(requestedPath, "index.html");
      if (fs.existsSync(indexPath)) {
        sendFile(response, indexPath);
        return;
      }
    }

    if (!hasFileExtension) {
      sendFile(response, path.join(root, "index.html"));
      return;
    }

    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("File not found");
  });
}

http.createServer(handleRequest).listen(port, "127.0.0.1", () => {
  console.log(`Supergroup slideshow available at http://localhost:${port}`);
});
