const passwordSchema = require("../models/passwordValidator")


module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    
      res.status(401).json({ message: error.message })
    
  }
  else{
    next()
  }
}
