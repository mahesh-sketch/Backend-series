import express from "express";
import userData from "./userdata.json" assert { type: "json" };
import file from "fs";

const app = express();

//Best way to read and import the JSON data
// const json = JSON.parse(
//   await file.readFile(new URL("./userdata.json", import.meta.url))
// );

//Middle ware -plugin
app.use(express.urlencoded({ extended: false }));

//Here we get all user data
app.get("/api/users", (req, res) => {
  return res.json(userData);
});

//Here we get the user data with specific id by searching
//If we want to do DELETE, PUT, PATCH on same Route then we can also do this
app
  .route("/api/users/:id")
  .get((req, res) => {
    // req.params property is an object containing properties mapped to the named route parameters
    const id = Number(req.params.id);
    const user = userData.find((user) => user.id === id);
    res.json(user);
  })
  .patch((req, res) => {
    //Edit the user with ID
    const id = Number(req.params.id);
    const updateduserName = userData.map((user) => {
      if (user.id === id) {
        return { ...user, ...req.body };
      }
      return user;
    });
    file.writeFile(
      "./Rest Api/userdata.json",
      JSON.stringify(updateduserName),
      (err, data) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .json({ status: "error", message: "Failed to update user data" });
        } else {
          res.json({
            status: "success",
            message: "User data updated successfully",
          });
        }
      }
    );
  })
  .put((req, res) => {
    const id = Number(req.params.id);
    const userIndex = userData.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      userData[userIndex] = { ...req.body, id };
      file.writeFile(
        "./Rest Api/userdata.json",
        JSON.stringify(userData),
        (err) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .json({ status: "error", message: "Failed to update user data" });
          } else {
            res.json({
              status: "success",
              message: "User data updated successfully",
            });
          }
        }
      );
    } else {
      res.status(404).json({ status: "error", message: "User not found" });
    }
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const updatedUserData = userData.filter((user) => user.id !== id);

    // Write the updated data back to the JSON file
    file.writeFile(
      "./Rest Api/userdata.json",
      JSON.stringify(updatedUserData),
      (err) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .json({ status: "error", message: "Failed to delete user" });
        } else {
          res.json({ status: "success", message: "User deleted successfully" });
        }
      }
    );
  });

// Create the new user
app.post("/api/users", (req, res) => {
  const body = req.body;
  userData.push({ ...body, id: userData.length + 1 });
  file.writeFile(
    "./Rest Api/userdata.json",
    JSON.stringify(userData),
    (err, data) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .json({ status: "error", message: "Failed to add user data" });
      } else {
        res.json({
          status: "success",
          message: "User data add successfully",
        });
      }
    }
  );
});

//Here we get the users name by returning in html
app.get("/users", (req, res) => {
  const html = `
     <ul>
      ${userData.map((user) => `<li> ${user.first_name}</li>`).join("")}
     </ul>
    `;
  res.send(html);
});

app.listen(8000, () => {
  console.log("Server is working....");
});