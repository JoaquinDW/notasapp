const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("notes", {
    content: 1,
    date: 1,
  });
  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  try {
    const { body } = req;
    const { username, name, password } = body;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = usersRouter;
