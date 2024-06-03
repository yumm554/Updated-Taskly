const Login = require('../models/LoginSchema')
const Task = require('../models/TaskSchema')

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    console.log({ username, password })
    const find = await Login.findOne({ username })
    console.log({ find })
    if (!find) {
      res.status(400).json('No account exists with this username')
    }
    const login = await Login.findOne({ username, password })
    if (!login) {
      res.status(400).json('Username or password does not match')
    }
    return res.status(200).json(login)
  } catch (err) {
    console.log(err)
  }
}

module.exports = { login }
