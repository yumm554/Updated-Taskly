const Task = require('../models/TaskSchema')
const UpdateProfile = require('../models/UpdateProfileSchema')

const updateProfile = async (req, res) => {
  try {
    const { username: name } = req.params
    console.log(name)
    const { username, password } = req.body
    const login = await UpdateProfile.findOneAndUpdate(
      { username: name },
      { username, password },
      { new: true }
    )

    if (!login) res.status(400).json('not found')
    res.status(200).json(login)
    const task = await Task.updateMany(
      { username: name },
      { $set: { username } }
    )
    console.log(task)
  } catch (err) {
    console.log(err)
  }
}

module.exports = { updateProfile }
