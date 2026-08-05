const Category = require('../models/Category');

// GET all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ available: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCategories };