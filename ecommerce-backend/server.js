require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

// Global middleware
app.use(express.json());
app.use(morgan('dev'));

// Health check / root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'E-Commerce Backend API is running',
    endpoints: {
      users: '/api/users',
      products: '/api/products',
    },
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// 404 + centralized error handling (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
