const DeleteProfile = require('../models/DeleteProfileSchema');

const deleteProfile = async (req) => {
  try {
    const { email } = req.body;
    const login = await DeleteProfile.findOneAndDelete({ email });
    if (!login) {
      res.json('no account with this username');
    }
    res.json('Profile deleted');
  } catch (err) {
    console.log(err);
  }
};
module.exports = { deleteProfile };
