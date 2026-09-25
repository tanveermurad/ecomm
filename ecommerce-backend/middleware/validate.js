/**
 * Lightweight request-body validators.
 * Each returns 400 with a clear message on the first failing rule.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateUser(req, res, next) {
  const { name, email, role } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('name is required and must be at least 2 characters.');
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    errors.push('a valid email is required.');
  }

  if (role && !['customer', 'admin'].includes(role)) {
    errors.push('role must be either "customer" or "admin".');
  }

  if (errors.length > 0) {
    return res.status(400).json({ status: 'error', message: 'Validation failed', errors });
  }

  next();
}

function validateProduct(req, res, next) {
  const { name, price, category, stock } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('name is required and must be at least 2 characters.');
  }

  if (price === undefined || typeof price !== 'number' || price <= 0) {
    errors.push('price is required and must be a positive number.');
  }

  if (!category || typeof category !== 'string') {
    errors.push('category is required and must be a string.');
  }

  if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
    errors.push('stock must be a non-negative number.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ status: 'error', message: 'Validation failed', errors });
  }

  next();
}

module.exports = { validateUser, validateProduct };
