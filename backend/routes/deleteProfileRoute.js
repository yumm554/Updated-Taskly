const express = require('express');
const router = express.Router();
const { deleteProfile } = require('../controllers/deleteProfileController');

router.route('/:email').get(deleteProfile);

module.exports = router;
