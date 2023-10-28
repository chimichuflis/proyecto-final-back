const express = require("express");
const { userLogin, userRegister, validEmail } = require("../controllers/user");
const { runValidation, runEmailValidation } = require("../middleweares/validators");
const { registerValidation, loginValidation , emailValidation} = require("../middleweares/validators/userValidator");
const router = express.Router();

router.post(
  "/user/register",         // req.body = { email: "", password: "", profile: "" }
  registerValidation,       // returns { }
  runValidation,            // { pass: boolean, msg: "" }
  userRegister
);

router.post(                // can login with username or password
  "/user/login",            // req.body { profile:"", password:"" }
  loginValidation,          // returns { }
  runValidation,            // { pass: boolean, msg: "", token:"" }
  userLogin
);

router.post(
  "/user/available",        // checks if email available
  emailValidation,          // req.body = { email: "" }
  runEmailValidation,       // returns { }
  validEmail                // { validity: boolean, msg:"" }
)
module.exports = router;
