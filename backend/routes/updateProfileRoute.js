const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/updateProfileController');

router.route('/').post(updateProfile);

router.route('/:email').patch(updateProfile);

module.exports = router;
