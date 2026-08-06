require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/foods', require('./routes/food'));
app.use('/api/categories', require('./routes/category'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/orders', require('./routes/order'));

// Test route
app.get('/', (req, res) => {
  res.send('BringMyBite API is running 🍊');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});