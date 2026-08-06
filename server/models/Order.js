const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    default: null
  },
  deliveryPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  items: [{
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
      required: true
    },
    name: String,
    price: Number,
    image: String,
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  status: {
    type: String,
    enum: ['placed', 'preparing', 'ready', 'picked', 'on-the-way', 'delivered', 'cancelled'],
    default: 'placed'
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'online'],
    default: 'cod'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  address: {
    house: String,
    street: String,
    city: String,
    landmark: String,
    pin: String
  },
  tracking: {
    currentLocation: {
      lat: Number,
      lng: Number
    },
    lastUpdated: Date
  },
  subtotal: Number,
  deliveryFee: {
    type: Number,
    default: 40
  },
  tax: Number,
  total: Number,
  estimatedTime: {
    type: Number,
    default: 30
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);