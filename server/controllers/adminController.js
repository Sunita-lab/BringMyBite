const Food = require('../models/Food');
const Category = require('../models/Category');
const User = require('../models/User');
const Order = require('../models/Order');

// ─── CATEGORY ───────────────────────────────

const createCategory = async (req, res) => {
  try {
    const { name, emoji, image } = req.body;
    const category = await Category.create({ name, emoji, image });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── FOOD ───────────────────────────────────

const createFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);
    const populated = await food.populate('category', 'name emoji');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('category', 'name emoji');
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: 'Food deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── USERS ──────────────────────────────────

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE order status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory, updateCategory, deleteCategory,
  createFood, updateFood, deleteFood,
  getAllUsers, getAllOrders, updateOrderStatus
};