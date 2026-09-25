
function apiKeyAuth(req, res, next) {
  const providedKey = req.query.apiKey;
  const validKey = process.env.API_KEY;

  if (!providedKey) {
    return res.status(401).json({
      status: 'error',
      message: 'API key is missing. Provide it as a query parameter: ?apiKey=YOUR_KEY',
    });
  }

  if (providedKey !== validKey) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid API key.',
    });
  }

  next();
}

module.exports = apiKeyAuth;
