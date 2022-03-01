const rateLimit = require("express-rate-limit")

const max = rateLimit({
  windowMs: 1 * 60 * 1000, // délai 1 minute (premier chiffre) 
  max: 3, // nombre de tentatives autorisées
})


module.exports = max 