const express = require("express")
const checkPassword = require("../middleware/checkPassword")
const authn = require("../middleware/authn")
const limit = require("../middleware/express-rate-limit-config");
const router = express.Router()

//Appel du controller User
const userCtrl = require("../controllers/userCtrl.js")

router.post("/signup", checkPassword, userCtrl.signup)
router.post("/login", limit, userCtrl.login)
router.post("/logout", authn, userCtrl.logout)

router.get("/", authn, userCtrl.findAll)
router.get("/:id", authn, userCtrl.findOne)

router.put("/:id", authn, userCtrl.updateOne)

router.delete("/:id", authn, userCtrl.deleteOne)

module.exports = router
