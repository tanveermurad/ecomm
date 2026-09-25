const { v4: uuidv4 } = require('uuid');

/**
 * Simple in-memory data store.
 * Replace with a real database (MongoDB/PostgreSQL) in production —
 * the controller layer is already isolated to make that swap easy.
 */

let users = [
  {
    id: uuidv4(),
    name: 'Ali Raza',
    email: 'ali.raza@example.com',
    role: 'customer',
  },
  {
    id: uuidv4(),
    name: 'Sana Khan',
    email: 'sana.khan@example.com',
    role: 'admin',
  },
];

let products = [
  {
    id: uuidv4(),
    name: 'Wireless Mouse',
    price: 1499,
    category: 'Electronics',
    stock: 120,
    description: 'Ergonomic wireless mouse with USB receiver.',
  },
  {
    id: uuidv4(),
    name: 'Cotton T-Shirt',
    price: 899,
    category: 'Apparel',
    stock: 300,
    description: '100% cotton, unisex, available in multiple colors.',
  },
];

module.exports = {
  users,
  products,
};
