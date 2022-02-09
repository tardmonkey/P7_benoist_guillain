const { User } = require("../config/database")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const dotEnv = require("dotenv").config({ path: "./config/.env" })

exports.findAll = async function (req, res, next) {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.findOne = async function (req, res, next) {
  try {

    let id = req.params.id

    const user = await User.findByPk(id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.signup = async function (req, res, next) {

  let profilepicDefault = "../../frontend/images/profilepicturedefault.png"
  
  try {
    const hash = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      picture: profilepicDefault,
      bio: "",
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


exports.login = async function (req, res, next) {

  let email = req.body.email

  //En secondes
  const maxAgeToken = 1 * 24 * 60 * 60

  try {
    const user = await User.findOne({ where: { email: email } })

    if (user == null) {
      return res.status(401).json({ message: "User introuvable !" })
    }

    const valid = await bcrypt.compare(req.body.password, user.password)

    if (!valid) {
      return res.status(401).json({ message: "Password incorrect !" })
    }

    let token = await jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: maxAgeToken,
    })

    const userId = user.id

    const username = user.username

    const admin = user.isAdmin

    res.status(200).json({ token, userId, username, admin })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.logout = (req, res, next) => {

  
  res.end()
}


exports.updateOne = async function (req, res, next) {

  try {
    const user = await User.findByPk(req.params.id)
    user.username = req.body.username
    user.email = req.body.email
    user.picture = req.body.picture
    user.bio = req.body.bio
    await user.save()

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


exports.deleteOne = async function (req, res, next) {

  try {
    const user = await User.findByPk(req.params.id)
    user.destroy()
    res.status(200).end()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
