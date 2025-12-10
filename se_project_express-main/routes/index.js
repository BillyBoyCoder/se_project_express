const router = require("express").Router();
const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");

// Public routes (no authentication required)
router.post("/signin", login);
router.post("/signup", createUser);

// Protected routes (authentication required)
router.use("/users", auth, usersRouter);
router.use("/items", clothingItemsRouter);

module.exports = router;
