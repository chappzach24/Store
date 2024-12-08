// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err.message));

// Routes
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');

// Use Routes
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Store API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log('\n📍 API endpoints:');
  console.log(`➜ Users:     http://localhost:${PORT}/api/users`);
  console.log(`➜ Products:  http://localhost:${PORT}/api/products`);
  console.log(`➜ Cart:      http://localhost:${PORT}/api/cart`);
});

