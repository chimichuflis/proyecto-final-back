const { validationResult } = require("express-validator");

const runValidation = (req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(409).json({error: errors.array()[0].msg});
  }
  next();
}

const runEmailValidation = (req,res,next)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.json({validity: false, msg: errors.array()[0].msg});
  }
  next();
}

module.exports = { runValidation, runEmailValidation };
