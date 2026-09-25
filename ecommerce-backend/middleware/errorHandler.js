/**
 * 404 handler for unmatched routes.
 */
function notFound(req, res, next) {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
}

/**
 * Centralized error handler. Any `next(err)` call in the app
 * (or a thrown error inside an async route wrapped in try/catch)
 * ends up here.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const statusCode = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;

  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
}

module.exports = { notFound, errorHandler };
