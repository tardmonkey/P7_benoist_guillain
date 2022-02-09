const express = require("express")

const router = express.Router()

//Appel des controllers
const postCtrl = require("../controllers/postCtrl")
const commentCtrl = require("../controllers/commentCtrl")
const likeCtrl = require("../controllers/likeCtrl")

//Appel des middlewares
const authn = require("../middleware/authn")
const multer = require("../middleware/multer-config")

router.get("/", authn, postCtrl.findAll)
router.get("/:id", authn, postCtrl.findOne)
router.get("/user/:id", authn, postCtrl.findByUser)

router.post("/", authn, multer, postCtrl.createOne)
router.post("/:id/comments/", authn, commentCtrl.createOne)
router.post("/:id/like", authn, likeCtrl.likePost)

router.put("/:id", authn, multer, postCtrl.updateOne)
router.put("/:id/comments/:commentId", authn, commentCtrl.updateOne)

router.delete("/:id", authn, postCtrl.deleteOne)
router.delete("/:id/comments/:commentId", authn, commentCtrl.deleteOne)

module.exports = router
