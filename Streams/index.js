import express from "express";
import fs from "fs";
import statusmonitor from "express-status-monitor";
import zib from "zlib";

const app = express();

app.use(statusmonitor());
// app.use(express.static(path.resolve("/sample.TXT")));

// It will takes so much memory because of no use of streams
// app.get("/", (req, res) => {
//   fs.readFile("./Streams/sample.txt", (err, data) => {
//     res.end(data);
//   });
// });

//Zip file
fs.createReadStream("./Streams/sample.txt").pipe(
  zib.createGzip().pipe(fs.createWriteStream("./Streams/sample.zip"))
);

//use of streams
app.get("/", (req, res) => {
  const stream = fs.createReadStream("./Streams/sample.txt", "utf-8");
  stream.on("data", (chunk) => res.write(chunk));
  stream.on("end", () => res.end());
});

app.listen(8000, () => {
  console.log("Server is Working");
});
