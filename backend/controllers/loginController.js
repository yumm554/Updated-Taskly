const Login = require('../models/SignupSchema')

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const find = await Login.findOne({ email })

    if (!find) {
      return res.status(400).json('No account exists with this username')
    }
    const login = await Login.findOne({ email, password })
    if (!login) {
      return res.status(400).json('Username or password does not match')
    }
    return res.status(200).json(login)
  } catch (err) {
    console.log(err)
  }
}

module.exports = { login }
