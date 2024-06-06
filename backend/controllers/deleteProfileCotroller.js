const DeleteProfile = require('../models/SignupSchema');

const deleteProfile = async (req, res) => {
  try {
    const { email } = req.params;
    const login = await DeleteProfile.findOneAndDelete({ email });
    if (!login) {
      res.status(400).json("There's a problem, please try later");
    }
    res.status(200).json('Profile deleted');
  } catch (err) {
    console.log(err);
  }
};
module.exports = { deleteProfile };
