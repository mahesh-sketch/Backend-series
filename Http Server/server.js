import http from "http";
import file from "fs";
import url from "url";

const server = http.createServer((req, res) => {
  //   console.log(req);
  const myurl = url.parse(req.url,true);
  console.log(myurl);

  if (myurl.pathname === "/favicon.ico") return res.end();
  const log = `${Date.now()}: New Req Received from ${myurl.pathname}\n`;
  file.appendFile("./Http Server/log.txt", log, (err, data) => {
    try {
      switch (myurl.pathname) {
        case "/":
          res.end("Home Page");
          break;
        case "/about":
          const queryname = myurl.query.name;
          res.end(`Hi you are ${queryname}`);
          break;
        default:
          res.end("404 not found");
      }
    } catch (error) {
      console.log(err);
      console.log(error);
    }
  });
});

server.listen(8000, () => {
  console.log("Server listening at 8000");
});
