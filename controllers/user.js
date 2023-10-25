const knex = require("../config/knexfile");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const userRegister = async (req,res)=>{
  try{

    const emailExists = await knex("users")
      .where("email", req.body.email)
      .first();
    
    if(emailExists){
      res.status(409).json("email already in use");
    }else{
      const salt = await bcrypt.genSalt(10);
      const passwordEncrypt = await bcrypt.hash(req.body.password,salt);
      await knex("users")
        .insert(
          {
            email: req.body.email,
            password: passwordEncrypt,
            user_name: req.body.profile,
            user_title: req.body.profile
          }
        );
      res.json("ok");
    }
  }
  catch(err){
    res.status(400).json(err);
  }
}


const userLogin = async (req,res)=>{
  try{
    const emailExists = await knex("users")
      .where("email", req.body.email)
      .first()

    if(!emailExists){
      res.status(409).json({error: "invalid email or password"});
    }else{
      const validatePassword = await bcrypt.compare(
        req.body.password, emailExists.password
      );
      if(!validatePassword){
        res.status(409).json({error: "invalid email or password"});
      }else{
        const token = jsonwebtoken.sign(
          {
            email: req.body.email
          },"audn",{ expiresIn: '600000s' }
        );
        res.json({message:"token generated successfuly", token: token});
      }
    }
  }
  catch(err){
    res.status(400).json(err);
  }
}


module.exports = { userRegister, userLogin };
