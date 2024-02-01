import express from "express";
import os from "os";

const app = express();

app.get("/", (req, res) => {
  res.json({ id: process.pid });
});

app.listen(8000, () => {
  console.log("Server Is working...");
});
