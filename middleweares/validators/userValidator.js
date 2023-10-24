const {check,param} = require("express-validator");
const registerValidation = [
  check("profile")
    .not()
    .isEmpty()
    .withMessage("a profile name is required")
    .isString()
    .withMessage("profile name must contain leters")
  ,
  check("email")
    .not()
    .isEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("invalid email")
  ,
  check("password")
    .not()
    .isEmpty()
    .withMessage("password cannot be empty")
    .isLength({min:8})
    .withMessage("password must have at least 8 characters")
];
const loginValidation = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("email field is empty")
    .isEmail()
    .withMessage("invalid email")
  ,
  check("password")
    .not()
    .isEmpty()
    .withMessage("please type your password")
    .isLength({min:8})
    .withMessage("password must have at least 8 characters")
]

module.exports = {registerValidation, loginValidation};
