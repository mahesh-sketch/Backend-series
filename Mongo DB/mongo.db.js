import mongoose from "mongoose";
import User from "./model/user.model.js";
import express from "express";

const app = express();

app.use(express.urlencoded({ extended: false }));

//Connection of mongo DB
mongoose
  .connect("mongodb://127.0.0.1:27017/User-Details")
  .then(() => {
    console.log("Mongo DB connection Successfull... ");
  })
  .catch((err) => {
    console.log("Mongo Db Error: ", err);
  });

//Get list of all user from DB
app.get("/users", async (req, res, next) => {
  const allUser = await User.find({});
  if (!allUser) res.status(400).json({ message: "Can not found" });
  res.json(allUser);
});

//Get list of all user and show in form of HTML format
app.get("/api/users", async (req, res, next) => {
  const allDbuser = await User.find({});
  const html = `
  <ul>
   ${allDbuser
     .map((users) => `<li>${users.firstName} - ${users.email}</li>`)
     .join("")}
  </ul>
  `;
  res.send(html);
});

//Do all basis of Id of data (GET, PUT, PATCH, DELETE)
app
  .route("/api/users/:id")
  .get(async (req, res, next) => {
    const iddbUser = await User.findById(req.params.id);
    if (!iddbUser) res.json({ message: "Not found" });
    res.send(iddbUser);
  })
  .patch(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "Success", updatedUser });
  })
  .delete(async (req, res, next) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Success.." });
  });

//Add the data to DB
app.post("/api/users", async (req, res, next) => {
  const body = req.body;
  if (!body.first_name || !body.last_name || !body.email || !body.gender) {
    res.status(400).json({ message: "Missing Fields.." });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
  });

  res.status(201).json({ message: "Success" });
  console.log(result);
});

app.listen(8000, () => {
  console.log("Server is listening..");
});
