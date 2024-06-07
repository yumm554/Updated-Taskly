const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/updateProfileController');

router.route('/').post(updateProfile);

router.route('/:id').patch(updateProfile);

module.exports = router;
