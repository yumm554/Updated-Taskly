const express = require('express');
<<<<<<< Updated upstream
const { deleteProfile } = require('../controllers/deleteProfileController');
=======
const router = express.Router();
const { deleteProfile } = require('../controllers/deleteProfileCotroller');
>>>>>>> Stashed changes

const router = express.Router();

router.route('/:id').delete(deleteProfile);

module.exports = router;
