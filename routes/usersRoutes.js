const express = require("express");
const { usersList } = require("../controllers/users");
const router = express.Router();

router.get("/usersList", usersList);

module.exports = router;
