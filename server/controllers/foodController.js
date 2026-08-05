const Food = require('../models/Food');

// GET all foods (with optional category filter)
const getFoods = async (req, res) => {
  try {
    const { category, search, isHealthy, isVeg } = req.query;
    
    let query = { available: true };
    
    if (category) query.category = category;
    if (isHealthy) query.isHealthy = true;
    if (isVeg) query.isVeg = true;
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const foods = await Food.find(query)
      .populate('category', 'name emoji')
      .sort({ rating: -1 });

    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single food
const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id)
      .populate('category', 'name emoji');
    
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET trending foods (highest rating)
const getTrendingFoods = async (req, res) => {
  try {
    const foods = await Food.find({ available: true })
      .populate('category', 'name emoji')
      .sort({ rating: -1 })
      .limit(10);
    
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET healthy foods
const getHealthyFoods = async (req, res) => {
  try {
    const foods = await Food.find({ available: true, isHealthy: true })
      .populate('category', 'name emoji')
      .sort({ rating: -1 })
      .limit(10);
    
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFoods, getFoodById, getTrendingFoods, getHealthyFoods };