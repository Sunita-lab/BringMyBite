const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { placeOrder, getMyOrders, getOrderById } = require('../controllers/orderController');

router.use(protect);

router.post('/', placeOrder);
router.get('/my-orders', getMyOrders);
router.get('/:id', getOrderById);

module.exports = router;