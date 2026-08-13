const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  rating: { type: Number, default: 4.0 },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  brand: { type: String },
  description: { type: String },
  images: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
