const express = require('express')
const router = express.Router()
const { updateProfile } = require('../controllers/updateProfileController')

router.route('/').post(updateProfile)

router.route('/:username').patch(updateProfile)

module.exports = router
