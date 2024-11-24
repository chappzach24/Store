const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },

  }, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);