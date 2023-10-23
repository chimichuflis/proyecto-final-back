const express = require("express");
const { userLogin, userRegister } = require("../controllers/user");
const router = express.Router();

router.post("/user/login", userLogin);
router.post("/user/register", userRegister)
module.exports = router;
