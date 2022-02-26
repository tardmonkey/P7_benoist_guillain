const { User, Post, Comment, Like } = require("../config/database")
const fs = require("fs")
const dotEnv = require("dotenv").config({ path: "./config/.env" })

exports.findAll = async function (req, res, next) {
  try {

    const posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        { model: User },
        { model: Comment, include: [{ model: User }] },
        { model: Like },
      ],
    })
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


exports.findOne = async function (req, res, next) {
  try {

    let id = req.params.id

    const post = await Post.findByPk(id, {
      include: [{ model: Like }],
    })
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


exports.findByUser = async function (req, res, next) {

  try {
    const posts = await Post.findAll({
      where: { UserId: req.params.id },
      order: [["createdAt", "DESC"]],
      include: [
        { model: User },
        { model: Comment, include: [{ model: User }] },
        { model: Like },
      ],
    })
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}



exports.createOne = async function (req, res, next) {

  let postObject = req.body

  if (req.file) {
    postObject = JSON.parse(req.body.post)
    postObject.imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`
  }

  try {
    let post = await Post.create({
      ...postObject,
      userId: req.user.id,
    })

    post = await Post.findOne({
      where: { id: post.id },
      include: [{ model: User }],
    })

    res.status(201).json({ post })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// [=>] UPDATE Post
// -
exports.updateOne = async function (req, res, next) {
  console.log("=> UPDATE POST Function")

  try {
    const post = await Post.findByPk(req.params.id)
    post.content = req.body.content
    post.imageUrl = req.body.imageUrl
    await post.save()

    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// exports.updateOne = async function (req, res, next) {
//   console.log("=> UPDATE POST Function")

//   const postObject = req.file
//     ? {
//         ...JSON.parse(req.body.post),
//         imageUrl: `${req.protocol}://${req.get("host")}/images/${
//           req.file.filename
//         }`,
//       }
//     : { ...req.body }

//   const post = await Post.findOne({
//     where: { id: req.params.id, userId: req.user.id },
//     include: [{ model: User }],
//   })
//   if (!post) {
//     res.status(400).json({ error: "Vous n'avez pas l'autorisation" })
//   } else {
//     post.update(postObject).then((post) => res.status(200).json({ post }))
//   }
// }

// -
exports.deleteOne = async function (req, res, next) {

  try {
    const post = await Post.findByPk(req.params.id)
    post.destroy()
    res.status(200).end()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }

  // contrôle d'accès, vérifier userID || admin isAdmin

}
