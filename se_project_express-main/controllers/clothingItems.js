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

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Requested resource not found" });
      }

      // Check if the current user is the owner of the item
      if (item.owner.toString() !== req.user._id) {
        return res.status(403).send({ message: "Forbidden: You do not have permission to delete this item" });
      }

      return ClothingItem.findByIdAndDelete(itemId)
        .then(() => res.status(200).send({ message: "Item deleted successfully" }));
    })
    .catch((err) => res.status(500).send({ message: "Error deleting item", error: err.message }));
};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Requested resource not found" });
      }
      return res.status(200).send(item);
    })
    .catch((err) => res.status(500).send({ message: "Error liking item", error: err.message }));
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Requested resource not found" });
      }
      return res.status(200).send(item);
    })
    .catch((err) => res.status(500).send({ message: "Error unliking item", error: err.message }));
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
