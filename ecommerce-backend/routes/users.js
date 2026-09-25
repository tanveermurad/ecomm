const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const apiKeyAuth = require('../middleware/auth');
const { validateUser } = require('../middleware/validate');

// Public routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);

// Protected routes (require ?apiKey=...)
router.post('/', apiKeyAuth, validateUser, createUser);
router.put('/:id', apiKeyAuth, validateUser, updateUser);
router.delete('/:id', apiKeyAuth, deleteUser);

module.exports = router;
