const { v4: uuidv4 } = require('uuid');
const { products } = require('../data/store');

// GET /api/products
function getAllProducts(req, res) {
  const { category } = req.query;

  let result = products;
  if (category) {
    result = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  res.status(200).json({
    status: 'success',
    count: result.length,
    data: result,
  });
}

// GET /api/products/:id
function getProductById(req, res) {
  const product = products.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ status: 'error', message: 'Product not found' });
  }

  res.status(200).json({ status: 'success', data: product });
}

// POST /api/products
function createProduct(req, res) {
  const { name, price, category, stock, description } = req.body;

  const newProduct = {
    id: uuidv4(),
    name: name.trim(),
    price,
    category: category.trim(),
    stock: stock !== undefined ? stock : 0,
    description: description || '',
  };

  products.push(newProduct);

  res.status(201).json({ status: 'success', message: 'Product created', data: newProduct });
}

// PUT /api/products/:id
function updateProduct(req, res) {
  const product = products.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ status: 'error', message: 'Product not found' });
  }

  const { name, price, category, stock, description } = req.body;

  product.name = name.trim();
  product.price = price;
  product.category = category.trim();
  if (stock !== undefined) product.stock = stock;
  if (description !== undefined) product.description = description;

  res.status(200).json({ status: 'success', message: 'Product updated', data: product });
}

// DELETE /api/products/:id
function deleteProduct(req, res) {
  const index = products.findIndex((p) => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ status: 'error', message: 'Product not found' });
  }

  const deleted = products.splice(index, 1)[0];

  res.status(200).json({ status: 'success', message: 'Product deleted', data: deleted });
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
