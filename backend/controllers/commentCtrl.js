const { User, Post, Comment } = require("../config/database")

const dotEnv = require("dotenv").config({ path: "./config/.env" })


exports.createOne = async function (req, res, next) {
  

  try {
    const comment = await Comment.create({
      content: req.body.content,
      UserId: req.user.id,
      PostId: req.params.id,
    })
    res.status(201).json(comment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


exports.updateOne = async function (req, res, next) {
  

  try {
    const comment = await Comment.findByPk(req.params.id)
    comment.content = req.body.content
    await comment.save()

    res.status(200).json(comment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


exports.deleteOne = async function (req, res, next) {
 

  // contrôle d'accès, vérifier userID || admin req.comment.UserId req.User.isAdmin

  try {
    //Chercher par Primary Key
    const comment = await Comment.findByPk(req.params.commentId)
    comment.destroy()
    res.status(200).end()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
