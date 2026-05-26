const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
    },
    originalPrice: {
      type: Number,
    },
    images: [String],
    category: {
      type: String,
      required: [true, 'Product category is required'],
    },
    tags: [String],
    rating: {
      type: Number,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    sizes: [String],
    colors: [
      {
        name: String,
        hex: String,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    newArrival: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for common query patterns
productSchema.index({ category: 1 });
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);
