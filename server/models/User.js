const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['customer', 'restaurant', 'delivery', 'admin'],
    default: 'customer'
  },
  wallet: {
    type: Number,
    default: 0
  },
  biteCoins: {
    type: Number,
    default: 0
  },
  addresses: [],
  favoriteRestaurants: [],
  favoriteFoods: [],
  dietPreference: {
    type: String,
    enum: ['veg', 'vegan', 'egg', 'non-veg'],
    default: 'non-veg'
  },
  healthGoal: {
    type: String,
    enum: ['weight-loss', 'protein', 'muscle', 'diabetes'],
    default: 'protein'
  },
  calorieTarget: {
    type: Number,
    default: 2000
  },
  allergies: []
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);