import mongoose from "mongoose";

async function dbConnection(path) {
  return await mongoose
    .connect(path)
    .then(() => {
      console.log("Connection Success..");
    })
    .catch((err) => {
      console.log(err);
    });
}

export default dbConnection;
