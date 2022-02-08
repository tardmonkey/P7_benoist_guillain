const passwordSchema = require("../models/passwordValidator")


module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.writeHead(
      400,
      '{"message": "Votre mot de passe doit contenir au moins 8 caractères.}',
      { "content-type": "application/json" }
    )
    res.end("Le mot de passe ne correspond pas au format attendu")
  } else {
    next()
  }
}
