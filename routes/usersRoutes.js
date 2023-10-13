const express = require("express");
const { usersList } = require("../controllers/users");
const router = express.Router();

router.get("/users", usersList);

module.exports = router;
