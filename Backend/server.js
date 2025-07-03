// console.log("Hello");
// const backendData = require("./dataModels/backendDatas");
// const frontendData = require("./dataModels/frontendDatas");
// const http = require("http");
// const protocol = "http://";
// let host = "localhost";
// let baseURL = "";
// const server = http.createServer((req, res) => {
//   host = req.headers.host;
//   res.writeHead(200, { "Content-Type": backendData.contentType.TEXTPLAIN });
//   res.end("Hello World");
// });
// const port = 3000;
// server.listen(port, () => {
//   console.log(`server is runing at ${protocol}${host}:${port}`);
// });
const backendData = require("./dataModels/backendDatas");
const frontendData = require("./dataModels/frontendDatas");
const http = require("http");

const protocol = "http://";
let host = "localhost";
// let baseUrl = "";
const server = http.createServer((req, res) => {
  host = req.headers.host;

  //   if (req.url === "/navbar-data") {
  res.writeHead(200, { "Content-Type": backendData.contentType.APPJSON });
  res.end(JSON.stringify(frontendData.navBar));
  //   } else {
  //     res.writeHead(200, { "Content-Type": backendData.contentType.TEXTPLAIN });
  //     res.end("Hello World");
  //   }
});

const port = 5000;
server.listen(port, () => {
  console.log(`server is running at ${protocol}${host}:${port}`);
});
