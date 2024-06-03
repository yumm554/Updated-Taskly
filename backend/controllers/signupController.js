const Signup = require('../models/SignupSchema')

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      return res.status(400).json('All fields are required')
    }

    const duplicate = await Signup.findOne({ email })
    if (duplicate) {
      return res.status(400).json('User already exists')
    }

    const newUser = await Signup.create({ username, email, password })
    const savedUser = await newUser.save()
    console.log({ savedUser })

    return res.status(200).json('Signed up successfully')
  } catch (err) {
    console.log(err)
    return res.status(500).json('An error occurred')
  }
}

module.exports = { signup }
