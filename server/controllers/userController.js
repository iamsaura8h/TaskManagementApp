// import your model which you created in
const User = require("../models/userModel");

const createUser = async (req, res) => {
  try {
    const { name, age, about } = req.body;

    // basic check
    // check if all feilds came through the body or not
    if (!name || !age || !about) {
      return res
        .status(400)
        .json({ message: "Bro I didn't recieve all the feilds" });
    }

    // now create the new user
    const newUser = await User.create({ name, age, about });

    // tell the FE about it
    res.status(201).json({
      message: "User created successfully bro!",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server said it couldn't create a new user",
      error: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users fetched successfully!",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server failed to fetch users",
      error: error.message,
    });
  }
};

module.exports = { createUser, getUsers };
