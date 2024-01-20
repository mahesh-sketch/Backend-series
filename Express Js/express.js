import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello from Home page");
});

app.get("/about", (req, res) => {
  return res.send(`Hello ${req.query.name}`);
});

app.listen(8000, () => {
  console.log("server is working at 8000");
});
