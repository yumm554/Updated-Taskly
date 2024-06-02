const express = require('express');
const router = express.Router();
const {
  createlogin,
  getlogin,
  updatelogin,
  deletelogin,
} = require('../controllers/loginControllers');

router.route('/').post(createlogin);

router
  .route('/:username')
  .post(getlogin)
  .patch(updatelogin)
  .delete(deletelogin);

module.exports = router;
