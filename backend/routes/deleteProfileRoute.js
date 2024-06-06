<<<<<<< Updated upstream
const express = require('express')
const { deleteProfile } = require('../controllers/deleteProfileController')
=======
const express = require('express');
const router = express.Router();
const { deleteProfile } = require('../controllers/deleteProfileCotroller');
>>>>>>> Stashed changes

const router = express.Router()

router.route('/:id').delete(deleteProfile)

module.exports = router
