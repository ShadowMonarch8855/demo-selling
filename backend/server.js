require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, '..')));
app.use('/admin', express.static(path.join(__dirname, '..', 'admin')));

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_TK3o6a0sosjosj',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'Cdn0Nvy0yHx0kXgbyMXN6LPO'
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://pikkisolomon05_db_user:SfjYYXq02uFa8eFh@cluster0.oswyheq.mongodb.net/vastrakart?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Models
const Product = require('./models/Product');
const Order = require('./models/Order');
const User = require('./models/User');
const Payment = require('./models/Payment');

// Seed default products if empty
async function seedDefaults() {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      {
        name: "Men's Casual Cotton T-Shirt",
        category: "Casual",
        price: 499,
        mrp: 1299,
        discount: 62,
        rating: 4.3,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "White", "Navy Blue"],
        brand: "Allen Solly",
        description: "Premium cotton t-shirt with a comfortable fit. Perfect for casual wear.",
        images: [
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
          "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500&q=80",
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80"
        ]
      },
      {
        name: "Women's Floral Print Kurti",
        category: "Ethnic",
        price: 899,
        mrp: 2499,
        discount: 64,
        rating: 4.5,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Pink", "Blue", "Green"],
        brand: "Biba",
        description: "Elegant floral print kurti made from premium rayon fabric.",
        images: [
          "https://images.unsplash.com/photo-1610037301346-3cfc1366cf67?w=500&q=80",
          "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&q=80",
          "https://images.unsplash.com/photo-1596755090518-f4915ea5d9a6?w=500&q=80"
        ]
      }
    ]);
    console.log('Default products seeded');
  }

  const userCount = await User.countDocuments();
  if (userCount === 0) {
    await User.insertMany([
      { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', joined: '2025-01-15', totalOrders: 3 },
      { id: 2, name: 'Priya Patel', email: 'priya@example.com', phone: '9876543211', joined: '2025-02-20', totalOrders: 5 },
      { id: 3, name: 'Amit Kumar', email: 'amit@example.com', phone: '9876543212', joined: '2025-03-10', totalOrders: 2 }
    ]);
    console.log('Default users seeded');
  }
}

seedDefaults().catch(console.error);

// ==================== PRODUCTS API ====================

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    const safe = products.map(p => ({ ...p.toJSON(), id: p._id?.toString?.() || p.id }));
    res.json(safe);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ ...product, id: product._id?.toString?.() || product.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    const json = saved.toJSON();
    res.status(201).json({ ...json, id: saved._id?.toString?.() || json.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    const json = updated.toJSON();
    res.json({ ...json, id: updated._id?.toString?.() || json.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: 'Product id is required' });
    }

    let deleted = null;
    try {
      deleted = await Product.findByIdAndDelete(id);
    } catch (err) {
      console.error('Delete product DB error:', err);
      return res.status(400).json({ error: 'Invalid product id' });
    }

    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ==================== ORDERS API ====================

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findOne({ id: req.params.id });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      id: 'ORD' + Date.now().toString().slice(-8),
      date: new Date().toISOString()
    };
    const order = new Order(orderData);
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.put('/api/orders/:id', async (req, res) => {
  try {
    const updated = await Order.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Order not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// ==================== USERS API ====================

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const userData = {
      ...req.body,
      joined: new Date().toISOString().split('T')[0]
    };
    const user = new User(userData);
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// ==================== PAYMENTS API ====================

app.get('/api/payments', async (req, res) => {
  try {
    const payments = await Payment.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

app.post('/api/payments', async (req, res) => {
  try {
    const paymentData = req.body || {};
    if (paymentData.status !== 'approved') {
      return res.status(400).json({ error: 'Only approved payments can be stored' });
    }
    const payment = new Payment(paymentData);
    const saved = await payment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

app.put('/api/payments/:id', async (req, res) => {
  try {
    const updateData = req.body || {};
    if (updateData.status && updateData.status !== 'approved') {
      return res.status(400).json({ error: 'Only approved status is allowed' });
    }
    const updated = await Payment.findOneAndUpdate({ id: req.params.id }, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: 'Payment not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment' });
  }
});

// ==================== RAZORPAY INTEGRATION ====================

// Create Razorpay order
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: receipt || 'receipt_' + Date.now()
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error('Razorpay order creation error:', err);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// Verify Razorpay payment signature
app.post('/api/payment/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
    
    const crypto = require('crypto');
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      // Update order payment status
      await Order.findOneAndUpdate({ id: orderId }, { 
        paymentStatus: 'paid',
        status: 'approved'
      });
      
      // Create payment record
      const order = await Order.findOne({ id: orderId });
      if (order) {
        await Payment.create({
          id: 'TXN' + Date.now(),
          orderId: order.id,
          customer: order.address?.name || 'Guest',
          amount: order.subtotal,
          method: 'RAZORPAY',
          status: 'approved',
          date: new Date().toISOString(),
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature
        });
      }
      
      res.json({ status: 'OK', message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ status: 'FAILED', message: 'Invalid signature' });
    }
  } catch (err) {
    console.error('Payment verification error:', err);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

// Get Razorpay key
app.get('/api/payment/key', (req, res) => {
  res.json({ 
    key: process.env.RAZORPAY_KEY_ID || 'rzp_live_TK3o6a0sosjosj',
    currency: 'INR'
  });
});

// ==================== SETTINGS API ====================

app.get('/api/settings', (req, res) => {
  res.json({ 
    storeName: 'VastraKart', 
    email: 'support@vastrakart.com', 
    currency: '₹',
    razorpayKey: process.env.RAZORPAY_KEY_ID || 'rzp_live_TK3o6a0sosjosj'
  });
});

app.put('/api/settings', (req, res) => {
  res.json(req.body);
});

// ==================== TRACKING NUMBER API ====================

app.get('/api/tracking/next', async (req, res) => {
  try {
    const lastOrder = await Order.findOne().sort({ createdAt: -1 });
    let nextNumber = 100001;
    
    if (lastOrder && lastOrder.trackingNumber) {
      const lastNumber = parseInt(lastOrder.trackingNumber, 10) || 100000;
      nextNumber = lastNumber + 1;
    }
    
    const trackingNum = nextNumber.toString().padStart(6, '0');
    res.json({ trackingNumber: trackingNum });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate tracking number' });
  }
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'VastraKart API is running' });
});

// Serve admin panel
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin', 'admin.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin', 'admin.html'));
});

// Fallback to admin panel
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, '..', 'admin', 'admin.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`VastraKart backend running on port ${PORT}`);
  console.log(`MongoDB: ${MONGODB_URI ? 'Connected' : 'Not configured'}`);
  console.log(`Razorpay: ${process.env.RAZORPAY_KEY_ID ? 'Configured' : 'Using defaults'}`);
});
