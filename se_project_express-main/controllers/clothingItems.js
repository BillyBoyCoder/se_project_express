const ClothingItem = require("../models/clothingItem");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => res.status(500).send({ message: "Error retrieving items", error: err.message }));
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => res.status(400).send({ message: "Error creating item", error: err.message }));
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Requested resource not found" });
      }
      return res.status(200).send({ message: "Item deleted successfully" });
    })
    .catch((err) => res.status(500).send({ message: "Error deleting item", error: err.message }));
};

module.exports = { getItems, createItem, deleteItem };
