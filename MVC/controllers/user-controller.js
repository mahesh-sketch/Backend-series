import User from "../models/user.model.js";

async function handleGetUsers(req, res) {
  const allUser = await User.find({});
  if (!allUser) res.status(400).json({ message: "Can not found" });
  res.json(allUser);
}

async function handleGetUsersById(req, res) {
  const iddbUser = await User.findById(req.params.id);
  if (!iddbUser) res.json({ message: "Not found" });
  res.send(iddbUser);
}

async function handleDelete(req, res) {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Success.." });
}

async function handlePatchUsersById(req, res) {
  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json({ message: "Success", updatedUser });
}

async function handlePostUser(req, res) {
  const body = req.body;
  if (!body.firstname || !body.lastname || !body.email || !body.gender) {
    res.status(400).json({ message: "Missing Fields.." });
  }

  await User.create({
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
    gender: body.gender,
  });

  res.status(201).json({ message: "Success" });
}

const userContoller = {
  handleGetUsers,
  handleGetUsersById,
  handlePatchUsersById,
  handlePostUser,
  handleDelete,
};

export default userContoller;
