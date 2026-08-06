const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');

const { 
  createCategory, updateCategory, deleteCategory,
  createFood, updateFood, deleteFood,
  getAllUsers, getAllOrders, updateOrderStatus
} = require('../controllers/adminController');

// Sab routes protected + admin only
router.use(protect, adminOnly);

// Categories
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

// Foods
router.post('/foods', createFood);
router.put('/foods/:id', updateFood);
router.delete('/foods/:id', deleteFood);

// Users
router.get('/users', getAllUsers);

// Orders
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

module.exports = router;