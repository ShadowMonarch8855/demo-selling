const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  items: [{ type: mongoose.Schema.Types.Mixed }],
  address: mongoose.Schema.Types.Mixed,
  payment: { type: String, default: 'cod' },
  subtotal: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  date: { type: String, default: '' },
  trackingNumber: { type: String, default: '' },
  deliveryDate: { type: String, default: '' },
  razorpayOrderId: { type: String },
  paymentStatus: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
