const express = require('express');
const { getAllTask } = require('../controllers/tasksControllers');
const router = express.Router();

router.route('/:email').get(getAllTask);

module.exports = router;
