const { v4: uuidv4 } = require('uuid');
const { users } = require('../data/store');

// GET /api/users
function getAllUsers(req, res) {
  res.status(200).json({
    status: 'success',
    count: users.length,
    data: users,
  });
}

// GET /api/users/:id
function getUserById(req, res) {
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ status: 'error', message: 'User not found' });
  }

  res.status(200).json({ status: 'success', data: user });
}

// POST /api/users
function createUser(req, res) {
  const { name, email, role } = req.body;

  const emailTaken = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  if (emailTaken) {
    return res.status(400).json({ status: 'error', message: 'A user with this email already exists' });
  }

  const newUser = {
    id: uuidv4(),
    name: name.trim(),
    email: email.trim(),
    role: role || 'customer',
  };

  users.push(newUser);

  res.status(201).json({ status: 'success', message: 'User created', data: newUser });
}

// PUT /api/users/:id
function updateUser(req, res) {
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({ status: 'error', message: 'User not found' });
  }

  const { name, email, role } = req.body;

  user.name = name.trim();
  user.email = email.trim();
  if (role) user.role = role;

  res.status(200).json({ status: 'success', message: 'User updated', data: user });
}

// DELETE /api/users/:id
function deleteUser(req, res) {
  const index = users.findIndex((u) => u.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ status: 'error', message: 'User not found' });
  }

  const deleted = users.splice(index, 1)[0];

  res.status(200).json({ status: 'success', message: 'User deleted', data: deleted });
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
