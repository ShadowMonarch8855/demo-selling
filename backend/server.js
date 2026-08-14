require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const path = require('path');
const fs = require('fs');

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

// Data directory and files
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILES = {
  products: path.join(DATA_DIR, 'products.json'),
  orders: path.join(DATA_DIR, 'orders.json'),
  users: path.join(DATA_DIR, 'users.json'),
  payments: path.join(DATA_DIR, 'payments.json'),
  settings: path.join(DATA_DIR, 'settings.json'),
  trackingCounter: path.join(DATA_DIR, 'trackingCounter.json')
};

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper: read JSON file, return default if missing or corrupt
function readData(key, defaultValue) {
  try {
    if (!fs.existsSync(DATA_FILES[key])) {
      fs.writeFileSync(DATA_FILES[key], JSON.stringify(defaultValue, null, 2));
      return defaultValue;
    }
    const raw = fs.readFileSync(DATA_FILES[key], 'utf8');
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error(`Error reading ${key}:`, err);
    return defaultValue;
  }
}

// Helper: write data to JSON file
function writeData(key, data) {
  try {
    fs.writeFileSync(DATA_FILES[key], JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Error writing ${key}:`, err);
    throw err;
  }
}

// Seed default data if files are empty
function seedDefaults() {
  const products = readData('products', []);
  if (products.length === 0) {
    const defaultProducts = [
      {
        id: 1,
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
        id: 2,
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
    ];
    writeData('products', defaultProducts);
    console.log('Default products seeded');
  }

  const users = readData('users', []);
  if (users.length === 0) {
    const defaultUsers = [
      { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', password: 'rahul123', joined: '2025-01-15', totalOrders: 3 },
      { id: 2, name: 'Priya Patel', email: 'priya@example.com', phone: '9876543211', password: 'priya123', joined: '2025-02-20', totalOrders: 5 },
      { id: 3, name: 'Amit Kumar', email: 'amit@example.com', phone: '9876543212', password: 'amit123', joined: '2025-03-10', totalOrders: 2 }
    ];
    writeData('users', defaultUsers);
    console.log('Default users seeded');
  }
}

// Initialize data
seedDefaults();

// ==================== PRODUCTS API ====================

app.get('/api/products', (req, res) => {
  try {
    const products = readData('products', []);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const products = readData('products', []);
    const product = products.find(p => p.id == req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/api/products', (req, res) => {
  try {
    const products = readData('products', []);
    const newProduct = { ...req.body };
    if (!newProduct.id) {
      const maxId = products.reduce((max, p) => Math.max(max, p.id || 0), 0);
      newProduct.id = maxId + 1;
    }
    products.unshift(newProduct);
    writeData('products', products);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', (req, res) => {
  try {
    const products = readData('products', []);
    const idx = products.findIndex(p => p.id == req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Product not found' });
    products[idx] = { ...products[idx], ...req.body };
    writeData('products', products);
    res.json(products[idx]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const products = readData('products', []);
    const filtered = products.filter(p => p.id != req.params.id);
    writeData('products', filtered);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ==================== ORDERS API ====================

app.get('/api/orders', (req, res) => {
  try {
    const orders = readData('orders', []);
    const { userId } = req.query;
    let filtered = userId ? orders.filter(o => o.userId === userId) : orders;
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.get('/api/orders/:id', (req, res) => {
  try {
    const orders = readData('orders', []);
    const order = orders.find(o => o.id == req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

app.post('/api/orders', (req, res) => {
  try {
    const orders = readData('orders', []);
    const newOrder = {
      ...req.body,
      id: req.body.id || 'ORD' + Date.now().toString().slice(-8),
      date: new Date().toISOString()
    };
    if (!newOrder.userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    orders.unshift(newOrder);
    writeData('orders', orders);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.put('/api/orders/:id', (req, res) => {
  try {
    const orders = readData('orders', []);
    const idx = orders.findIndex(o => o.id == req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Order not found' });

    if (req.body.status === 'cancelled') {
      const nonCancellable = ['shipped', 'delivered', 'cancelled'];
      if (nonCancellable.includes(orders[idx].status)) {
        return res.status(400).json({ error: 'Order cannot be cancelled' });
      }
    }

    orders[idx] = { ...orders[idx], ...req.body };
    writeData('orders', orders);
    res.json(orders[idx]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

app.delete('/api/orders/:id', (req, res) => {
  try {
    const orders = readData('orders', []);
    const order = orders.find(o => o.id == req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const nonCancellable = ['shipped', 'delivered', 'cancelled'];
    if (nonCancellable.includes(order.status)) {
      return res.status(400).json({ error: 'Order cannot be cancelled' });
    }

    order.status = 'cancelled';
    writeData('orders', orders);
    res.json({ success: true, message: 'Order cancelled successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to cancel order' });
  }
});

// ==================== USERS API ====================

app.get('/api/users', (req, res) => {
  try {
    const users = readData('users', []);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', (req, res) => {
  try {
    const users = readData('users', []);
    const newUser = {
      ...req.body,
      joined: new Date().toISOString().split('T')[0]
    };
    if (!newUser.id) {
      const maxId = users.reduce((max, u) => Math.max(max, u.id || 0), 0);
      newUser.id = maxId + 1;
    }
    users.push(newUser);
    writeData('users', users);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.put('/api/users/:id', (req, res) => {
  try {
    const users = readData('users', []);
    const idx = users.findIndex(u => u.id == req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'User not found' });
    users[idx] = { ...users[idx], ...req.body };
    writeData('users', users);
    res.json(users[idx]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', (req, res) => {
  try {
    const users = readData('users', []);
    const filtered = users.filter(u => u.id != req.params.id);
    writeData('users', filtered);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// ==================== PAYMENTS API ====================

app.get('/api/payments', (req, res) => {
  try {
    const payments = readData('payments', []);
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

app.post('/api/payments', (req, res) => {
  try {
    const payments = readData('payments', []);
    const newPayment = { ...req.body };
    if (!newPayment.id) {
      newPayment.id = 'TXN' + Date.now();
    }
    payments.unshift(newPayment);
    writeData('payments', payments);
    res.status(201).json(newPayment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

app.put('/api/payments/:id', (req, res) => {
  try {
    const payments = readData('payments', []);
    const idx = payments.findIndex(p => p.id == req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Payment not found' });
    payments[idx] = { ...payments[idx], ...req.body };
    writeData('payments', payments);
    res.json(payments[idx]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment' });
  }
});

// ==================== RAZORPAY INTEGRATION ====================

app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    const options = {
      amount: amount * 100,
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

app.post('/api/payment/verify', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const crypto = require('crypto');
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      res.json({ status: 'OK', message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ status: 'FAILED', message: 'Invalid signature' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

app.get('/api/payment/key', (req, res) => {
  res.json({
    key: process.env.RAZORPAY_KEY_ID || 'rzp_live_TK3o6a0sosjosj',
    currency: 'INR'
  });
});

// ==================== SETTINGS API ====================

app.get('/api/settings', (req, res) => {
  const settings = readData('settings', { storeName: 'VastraKart', email: 'support@vastrakart.com', currency: '₹' });
  res.json(settings);
});

app.put('/api/settings', (req, res) => {
  try {
    writeData('settings', req.body);
    res.json(req.body);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save settings' });
  }
});

// ==================== TRACKING NUMBER API ====================

app.get('/api/tracking/next', (req, res) => {
  try {
    const counter = readData('trackingCounter', { lastNumber: 100000 });
    counter.lastNumber += 1;
    writeData('trackingCounter', counter);
    const trackingNum = String(counter.lastNumber).padStart(6, '0');
    res.json({ trackingNumber: trackingNum });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate tracking number' });
  }
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'VastraKart API is running' });
});

// Serve admin panel explicitly
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin', 'admin.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'admin', 'admin.html'));
});

// Fallback: serve admin for /admin/* paths, index.html for everything else
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  if (req.path.startsWith('/admin')) {
    return res.sendFile(path.join(__dirname, '..', 'admin', 'admin.html'));
  }
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`VastraKart backend running on port ${PORT}`);
  console.log(`Data directory: ${DATA_DIR}`);
  console.log(`Razorpay: ${process.env.RAZORPAY_KEY_ID ? 'Configured' : 'Using defaults'}`);
});
