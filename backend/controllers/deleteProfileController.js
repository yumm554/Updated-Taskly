// const DeleteProfile = require('../models/DeleteProfileSchema')
const User = require('../models/SignupSchema');
const Task = require('../models/TaskSchema');

const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
      return res.json({ success: false, message: 'No account with this Id' });
    }

    await Task.deleteMany({ _id: id });
    return res.json({ success: true, message: 'Profile deleted' });
  } catch (err) {
    console.log(err);
  }
};
module.exports = { deleteProfile };
