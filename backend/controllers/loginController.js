const bcryptjs = require('bcryptjs')

const User = require('../models/SignupSchema')

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json('User does not exist')
    }
    const validPassword = await bcryptjs.compare(password, user.password)

    if (!validPassword) {
      return res.status(400).json('Incorrect Password!')
    }
    
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = { login }
