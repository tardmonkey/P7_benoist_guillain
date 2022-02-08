const passwordValidator = require("password-validator")


const passwordSchema = new passwordValidator()

//On peut contrôler le niveau de sécurité qu'on applique au mot de passe,
// ici simplement 8 caractères minimum et 30 maximum 
passwordSchema
  .is()
  .min(8) 
  .is()
  .max(30)
  .has()
  .uppercase() 
  .has()
  .lowercase() 
  .has()
  .digits()
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .oneOf()


module.exports = passwordSchema
