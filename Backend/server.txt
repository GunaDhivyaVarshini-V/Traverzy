const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const backendData = require("./dataModels/backendDatas");
const frontendData = require("./dataModels/frontendDatas");

const protocol = "http://";
let host = "localhost";

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  res.setHeader("Access-Control-Allow-Origin", "*");

  if (pathname === "/api/nav") {
    res.writeHead(200, { "Content-Type": backendData.contentType.APPJSON });
    res.end(JSON.stringify(frontendData.navBar));
  }

  else if (pathname === "/api/packageImages") {
    res.writeHead(200, { "Content-Type": backendData.contentType.APPJSON });
    res.end(JSON.stringify(frontendData.packageData));
  }

  else if (pathname === "/api/trendingImages") {
    const filePath = path.join(__dirname, "data", "trendingData.json");
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": backendData.contentType.APPJSON });
        res.end(JSON.stringify({ error: "Failed to read trending data." }));
      } else {
        res.writeHead(200, { "Content-Type": backendData.contentType.APPJSON });
        res.end(data);
      }
    });
  }

  else {
    res.writeHead(404, { "Content-Type": backendData.contentType.APPJSON });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`server is running at ${protocol}${host}:${port}`);
});
