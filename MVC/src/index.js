import express from "express";
import dbConnection from "../db/db.connection.js";
import logMiddleware from "../middlewares/index.js";
import userRouter from "../routes/user.js";

const app = express();

//Data base Connection
dbConnection("mongodb://127.0.0.1:27017/DetailsofUser");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(logMiddleware("log.txt"));

//Routes
app.use("/api/users", userRouter);

app.listen(8000, () => {
  console.log("Server is listening...");
});
