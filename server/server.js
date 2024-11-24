const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,  
  api_key: process.env.CLOUDINARY_API_KEY,  
  api_secret: process.env.CLOUDINARY_API_SECRET,  
});

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'product-images',
    allowed_formats: ['jpg', 'png'], 
  },
});

const upload = multer({ storage });
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error('❌ MongoDB Error:', err.message));

// Routes
const userRouter = require('./routes/user.routes');
const productRouter = require('./routes/product.routes');
const cartRouter = require('./routes/cart.routes');

// Image upload route
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (req.file && req.file.path) {
    res.json({ imageUrl: req.file.path });
  } else {
    res.status(400).json({ message: 'Image upload failed' });
  }
});

// API routes
app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Start server
app.listen(port, () => {
  console.log(`\n🚀 Server running at:`);
  console.log(`➜ http://localhost:${port}`);
  console.log(`\n📍 API endpoints:`);
  console.log(`➜ Users:     http://localhost:${port}/api/users`);
  console.log(`➜ Products:  http://localhost:${port}/api/products`);
  console.log(`➜ Cart:      http://localhost:${port}/api/cart`);
  console.log(`➜ Upload:    http://localhost:${port}/api/upload`);
});