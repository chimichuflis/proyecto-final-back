const express = require("express");
const { userLogin, userRegister } = require("../controllers/user");
const { runValidation } = require("../middleweares/validators");
const { registerValidation, loginValidation } = require("../middleweares/validators/userValidator");
const router = express.Router();

router.post(
  "/user/register",
  registerValidation,
  runValidation,
  userRegister
);

router.post(
  "/user/login",
  loginValidation,
  runValidation,
  userLogin
);
module.exports = router;
