const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number,
    default: null
  },
  images: [{
    type: String
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  ingredients: [String],
  nutrition: {
    protein: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    calories: { type: Number, default: 0 }
  },
  allergens: [String],
  isVeg: {
    type: Boolean,
    default: false
  },
  subcategory: {
  type: String,
  default: ''
},
offers: [{
  title: String,
  discount: Number,
  validTill: Date
}],
recommendedWith: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Food'
}],
  isHealthy: {
    type: Boolean,
    default: false
  },
  spiceLevel: {
    type: String,
    enum: ['none', 'mild', 'medium', 'hot', 'extra-hot'],
    default: 'none'
  },
  preparationTime: {
    type: Number,
    default: 20
  },
  available: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);