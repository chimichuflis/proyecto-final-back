const jsonwebtoken = require("jsonwebtoken");

const tokenValidator = (req,res,next)=>{
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({error: "token not found"});
  
  jsonwebtoken.verify(token, "audn", (err,user)=>{
    if(err) return res.status(401).json({error: "invalid token"});
    req.user = user;
    next();
  })
}

module.exports = tokenValidator;
