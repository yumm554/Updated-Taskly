const bcryptjs = require('bcryptjs')

// const UpdateProfile = require('../models/UpdateProfileSchema')
const User = require('../models/SignupSchema')

const updateProfile = async (req, res) => {
  try {
    const { email: email } = req.params
    const { username, password } = req.body
    console.log({ email: email, username: username, password: password })

    // Find the existing profile
    // const profile = await UpdateProfile.findOne({ username: name })
    // if (!profile) {
    //   return res.status(404).json({ message: 'Profile not found.' })
    // }

    // Prepare the update object
    const updateData = {}
    if (username) {
      updateData.username = username
    }
    if (password) {
      const salt = await bcryptjs.genSalt(10)
      updateData.password = await bcryptjs.hash(password, salt)
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ message: 'No valid fields provided for update.' })
    }

    // Update the profile
    const updatedProfile = await User.findOneAndUpdate(
      { email: email },
      updateData,
      { new: true }
    )

    // If the username was updated, update it in the Task collection as well
    // if (username) {
    //   await Task.updateMany({ username: username }, { $set: { username } });
    // }

    // Send back the updated profile
    console.log({ updatedProfile })
    res.status(200).json(updatedProfile)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error occurred.' })
  }
}

module.exports = { updateProfile }
