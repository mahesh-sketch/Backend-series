import express from "express";
import userContoller from "../controllers/user-controller.js";

const router = express.Router();

//Get list of all user from DB and also for Post
router
  .route("/")
  .get(userContoller.handleGetUsers)
  .post(userContoller.handlePostUser);

//Do all basis of Id of data (GET, PUT, PATCH, DELETE)
router
  .route("/:id")
  .get(userContoller.handleGetUsersById)
  .patch(userContoller.handlePatchUsersById)
  .delete(userContoller.handleDelete);

export default router;
