const knex = require("../config/knexfile");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
/*
const userList = async (req, res) => {
  try {
    const result = await knex("users");
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
*/
const userRegister = async (req,res)=>{
  try{
    if(!req.body){
      return res.status(400).json({error:"post is empty"});
    }
    const {email, profile, password} = req.body;
    // username
    if(!profile){
      return res.status(400).json({error:"empty username"});
    }

    // password

    if(!password){
      return res.status(400).json({error: "empty password"});
    }
    if(password.length<8){
      return res.status(400).json({error:"password needs to be at least 8 characters"});
    }
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypt = await bcrypt.hash(password,salt);

    // email
    if(!email){
      return res.status(400).json({error:"empty email"});
    }
    const emailExists = await knex(users)
      .where("email", email)
      .first()
      

    res.json(emailExists);
  }
  catch(err){
    res.json(err);
    console.log(err)
  }
}
const userLogin = (req,res)=>{
  res.json("empty login function");
}


module.exports = { userRegister, userLogin };
