// const DeleteProfile = require('../models/DeleteProfileSchema')

// const deleteProfile = async (req, res) => {
//   try {
//     const { username } = req.body
//     const login = await DeleteProfile.findOneAndDelete({ username })
//     if (!login) {
//       res.json('no account with this username')
//     }
//     res.json('deleted')
//   } catch (err) {
//     console.log(err)
//   }
// }
// module.exports = { deleteProfile }
