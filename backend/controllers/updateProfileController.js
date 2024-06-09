const bcryptjs = require('bcryptjs');

const User = require('../models/SignupSchema');

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    // Prepare the update object
    const updateData = {};
    if (username) {
      updateData.username = username;
    }
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      updateData.password = await bcryptjs.hash(password, salt);
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json('No valid fields provided for update.');
    }

    // Update the profile
    const updatedProfile = await User.findOneAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );

    // Send back the updated profile
    console.log({
      _id: updatedProfile._id,
      username: updatedProfile.username,
      email: updatedProfile.email,
    });
    res.status(200).json({
      _id: updatedProfile._id,
      username: updatedProfile.username,
      email: updatedProfile.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error occurred.');
  }
};

module.exports = { updateProfile };
