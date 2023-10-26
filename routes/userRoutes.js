const express = require("express");
const { userLogin, userRegister, validEmail } = require("../controllers/user");
const { runValidation, runEmailValidation } = require("../middleweares/validators");
const { registerValidation, loginValidation , emailValidation} = require("../middleweares/validators/userValidator");
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

router.post(
  "/user/available",
  emailValidation,
  runEmailValidation,
  validEmail
)
module.exports = router;
