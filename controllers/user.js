const knex = require("../config/knexfile");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");


const validEmail = async (req, res) => {
  try {
    const user = await knex("users")
      .where("email", req.body.email)
      .first()

    return res.json({ validity: !user, msg: user ? "email ya existe" : "email disponible" });
  }
  catch (err) {
    res.status(400).json(err);
  }
}


const userRegister = async (req, res) => {
  try {
    const user = await knex("users")
      .where("email", req.body.email)
      .first();

    if (user) {
      return res.json({ pass: false, msg: "email already in use" });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypt = await bcrypt.hash(req.body.password, salt);
    await knex("users")
      .insert(
        {
          email: req.body.email,
          password: passwordEncrypt,
          user_name: req.body.profile,
          user_title: req.body.profile
        }
      );
    return res.json({ pass: true, msg: "user created succesfuly" });
  }
  catch (err) {
    res.status(400).json(err);
  }
}


const userLogin = async (req, res) => {
  try {
    const user = await knex("users")
      .where("email", req.body.profile)
      .orWhere("user_name", req.body.profile)
      .first()

    if (!user) {
      return res.json({ pass: false, msg: "invalid user or password" });
    }

    const validatePassword = await bcrypt.compare(
      req.body.password, user.password
    );
    if (!validatePassword) {
      return res.json({ pass: false, msg: "invalid email or password" });
    }

    const token = jsonwebtoken.sign(
      {
        id: user.user_id,
        name: user.user_name,
        email: user.email
      }, "audn", { expiresIn: '600000s' }
    );
    return res.json({ pass: true, msg: "token generated successfuly", token: token });
  }
  catch (err) {
    res.status(400).json(err);
  }
}


module.exports = { userRegister, userLogin, validEmail };
