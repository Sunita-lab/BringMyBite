const express = require('express');
const router = express.Router();
const { getFoods, getFoodById, getTrendingFoods, getHealthyFoods } = require('../controllers/foodController');

router.get('/', getFoods);
router.get('/trending', getTrendingFoods);
router.get('/healthy', getHealthyFoods);
router.get('/:id', getFoodById);

module.exports = router;