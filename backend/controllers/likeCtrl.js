const { User, Post, Comment, Like } = require("../config/database")
const dotEnv = require("dotenv").config({ path: "./config/.env" })


exports.likePost = async function (req, res, next) {
  

  try {
    const like = await Like.findOne({
      where: { UserId: req.user.id, PostId: req.params.id },
    })

    if (like !== null) {
      

      like.destroy()
      res.status(200).end()
      return
    } else {
      

      const like = await Like.create({
        UserId: req.user.id,
        PostId: req.params.id,
      })
      res.status(201).json(like)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
