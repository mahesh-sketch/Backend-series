import clusters from "node:cluster";
import express from "express";
import os from "os";

const cpuLength = os.cpus().length;

if (clusters.isPrimary) {
  for (let i = 0; i < cpuLength; i++) {
    clusters.fork();
  }
} else {
  const app = express();
  app.get("/", (req, res) => {
    res.send(`hello form ${process.pid}`);
  });
  app.listen(8000, () => {
    console.log("Server Is working...");
  });
}
