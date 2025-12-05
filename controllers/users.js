const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: "Error retrieving users", error: err.message }));
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Requested resource not found" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => res.status(500).send({ message: "Error retrieving user", error: err.message }));
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: "Error creating user", error: err.message }));
};

module.exports = { getUsers, getUser, createUser };
