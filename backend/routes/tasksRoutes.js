const express = require('express');
const {
  getAllTask,
  createTask,
  updateTask,
  deleteTask,
  getTask,
} = require('../controllers/tasksControllers');
const router = express.Router();

router.route('/').post(createTask);
router.route('/:username').get(getAllTask);

router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
