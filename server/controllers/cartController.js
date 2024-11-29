const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const cartController = {
  // Get user's cart
  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.params.userId })
        .populate('items.product');
      
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add item to cart
  addToCart: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      let cart = await Cart.findOne({ user: req.params.userId });

      // Check if product exists and has enough stock
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      if (product.quantity < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      
      if (!cart) {
        cart = await Cart.create({
          user: req.params.userId,
          items: [{ product: productId, quantity }],
          total: product.price * quantity
        });
      } else {
        const existingItem = cart.items.find(item => 
          item.product.toString() === productId
        );
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.items.push({ product: productId, quantity });
        }

        // Recalculate total
        cart.total = await calculateTotal(cart.items);
      }
      
      await cart.save();
      
      const populatedCart = await Cart.findById(cart._id)
        .populate('items.product');
        
      res.status(200).json(populatedCart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update cart item quantity
  updateCartItem: async (req, res) => {
    try {
      const { quantity } = req.body;
      const cart = await Cart.findOne({ user: req.params.userId });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      const item = cart.items.find(item => 
        item.product.toString() === req.params.productId
      );

      if (!item) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }

      item.quantity = quantity;
      cart.total = await calculateTotal(cart.items);
      
      await cart.save();
      
      const populatedCart = await Cart.findById(cart._id)
        .populate('items.product');

      res.status(200).json(populatedCart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Remove item from cart
  removeFromCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.params.userId });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      cart.items = cart.items.filter(item => 
        item.product.toString() !== req.params.productId
      );
      
      cart.total = await calculateTotal(cart.items);
      
      await cart.save();
      
      const populatedCart = await Cart.findById(cart._id)
        .populate('items.product');

      res.status(200).json(populatedCart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Clear cart
  clearCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.params.userId });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      cart.items = [];
      cart.total = 0;
      await cart.save();

      res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// Helper function to calculate total
async function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  return total;
}

module.exports = cartController;