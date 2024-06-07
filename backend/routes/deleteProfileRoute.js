const express = require('express')
const { deleteProfile } = require('../controllers/deleteProfileController')

const router = express.Router()

router.route('/:id').delete(deleteProfile)

module.exports = router
