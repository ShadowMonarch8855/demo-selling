// --- DATA STORE ---
const API_BASE = (typeof window !== 'undefined' && window.APP_API_BASE) || 'https://demo-selling.onrender.com';
const defaultProducts = [{
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
        description: "Premium cotton t-shirt with a comfortable fit. Perfect for casual wear, this t-shirt is made from high-quality fabric that ensures breathability and durability.",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
            "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500&q=80",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80",
            "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&q=80",
            "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&q=80"
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
        description: "Elegant floral print kurti made from premium rayon fabric. Features intricate embroidery and a comfortable regular fit suitable for daily wear and special occasions.",
        images: [
            "https://images.unsplash.com/photo-1610037301346-3cfc1366cf67?w=500&q=80",
            "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&q=80",
            "https://images.unsplash.com/photo-1596755090518-f4915ea5d9a6?w=500&q=80",
            "https://images.unsplash.com/photo-1614252369475-531eba835eb2?w=500&q=80"
        ]
    },
    {
        id: 3,
        name: "Men's Slim Fit Formal Shirt",
        category: "Formal",
        price: 799,
        mrp: 1999,
        discount: 60,
        rating: 4.2,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["White", "Light Blue", "Pink"],
        brand: "Peter England",
        description: "Slim fit formal shirt crafted from premium cotton. Features a structured collar, full sleeves, and a modern fit ideal for office wear and formal occasions.",
        images: [
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80",
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80",
            "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=500&q=80",
            "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500&q=80"
        ]
    },
    {
        id: 4,
        name: "Women's Ethnic Anarkali Suit",
        category: "Ethnic",
        price: 1499,
        mrp: 3999,
        discount: 63,
        rating: 4.6,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Red", "Maroon", "Orange"],
        brand: "Libas",
        description: "Stunning Anarkali suit with intricate zari work and georgette fabric. The floor-length design creates a regal look perfect for weddings and festivals.",
        images: [
            "https://images.unsplash.com/photo-1610030302048-dbe1a5c5e4e4?w=500&q=80",
            "https://images.unsplash.com/photo-1594761051554-e4d37a99f256?w=500&q=80",
            "https://images.unsplash.com/photo-1610189012906-478603e82560?w=500&q=80",
            "https://images.unsplash.com/photo-1614252369475-531eba835eb2?w=500&q=80"
        ]
    },
    {
        id: 5,
        name: "Men's Casual Denim Jacket",
        category: "Casual",
        price: 1299,
        mrp: 3499,
        discount: 63,
        rating: 4.4,
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["Blue", "Black"],
        brand: "Levis",
        description: "Classic denim jacket with a modern fit. Made from premium cotton denim with button closure and multiple pockets. A timeless wardrobe essential.",
        images: [
            "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
            "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=500&q=80"
        ]
    },
    {
        id: 6,
        name: "Women's Winter Woolen Sweater",
        category: "Winter",
        price: 999,
        mrp: 2999,
        discount: 67,
        rating: 4.5,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Cream", "Grey", "Pink"],
        brand: "Roadster",
        description: "Cozy woolen sweater perfect for winter. Features a crew neck design and ribbed cuffs for a comfortable fit. Keeps you warm while looking stylish.",
        images: [
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
            "https://images.unsplash.com/photo-1620799140408-ed5341c243ca?w=500&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80"
        ]
    },
    {
        id: 7,
        name: "Kids' Printed Cotton T-Shirt",
        category: "Kids",
        price: 349,
        mrp: 899,
        discount: 61,
        rating: 4.1,
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
        colors: ["Yellow", "Blue", "Red"],
        brand: "H&M Kids",
        description: "Fun printed t-shirt for kids made from soft cotton. Features vibrant cartoon prints and a comfortable fit for active children.",
        images: [
            "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&q=80",
            "https://images.unsplash.com/photo-1622290291468-a28f7a319dc4?w=500&q=80",
            "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=500&q=80"
        ]
    },
    {
        id: 8,
        name: "Men's Sportswear Track Pants",
        category: "Sportswear",
        price: 699,
        mrp: 1899,
        discount: 63,
        rating: 4.3,
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["Black", "Grey", "Navy"],
        brand: "Puma",
        description: "Comfortable track pants for sports and casual wear. Made from stretchable polyester fabric with elastic waistband and side pockets.",
        images: [
            "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500&q=80",
            "https://images.unsplash.com/photo-1551854838-212c50b4c184?w=500&q=80",
            "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80"
        ]
    },
    {
        id: 9,
        name: "Women's Casual Jeggings",
        category: "Casual",
        price: 599,
        mrp: 1599,
        discount: 63,
        rating: 4.2,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Navy", "Dark Grey"],
        brand: "Zara",
        description: "Stretchable jeggings with a perfect fit. Made from premium denim-like fabric that offers both comfort and style. Ideal for casual and semi-formal occasions.",
        images: [
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80",
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80",
            "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=500&q=80"
        ]
    },
    {
        id: 10,
        name: "Men's Casual Linen Shirt",
        category: "Casual",
        price: 899,
        mrp: 2299,
        discount: 61,
        rating: 4.4,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["White", "Beige", "Light Green"],
        brand: "H&M",
        description: "Relaxed fit linen shirt perfect for summer. Made from 100% linen fabric that is breathable and lightweight. Features a chest pocket and button-down collar.",
        images: [
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80",
            "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500&q=80"
        ]
    },
    {
        id: 11,
        name: "Women's Formal Blazer",
        category: "Formal",
        price: 1899,
        mrp: 4999,
        discount: 62,
        rating: 4.5,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Navy", "Grey"],
        brand: "Zara",
        description: "Sophisticated blazer with a tailored fit. Made from premium polyester blend with satin lining. Perfect for office wear and formal meetings.",
        images: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80",
            "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80"
        ]
    },
    {
        id: 12,
        name: "Men's Winter Hooded Jacket",
        category: "Winter",
        price: 1599,
        mrp: 3999,
        discount: 60,
        rating: 4.6,
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["Black", "Olive", "Navy"],
        brand: "North Face",
        description: "Warm hooded jacket with insulated padding. Features a full zip closure, adjustable hood, and multiple pockets. Perfect for cold winter days.",
        images: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
            "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=500&q=80",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80"
        ]
    }
];

// Initialize data from localStorage or defaults
function initData() {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
}

// API helper
async function apiCall(url, options = {}) {
    try {
        const { headers: optionsHeaders, ...restOptions } = options;
        const response = await fetch(`${API_BASE}${url}`, {
            headers: {
                'Content-Type': 'application/json',
                ...optionsHeaders
            },
            ...restOptions
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Request failed' }));
            throw new Error(error.error || `HTTP ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        console.error('API Error:', err);
        throw err;
    }
}

// --- APP OBJECT ---
const app = {
        currentPage: 'home',
        cart: [],
        wishlist: [],
        orders: [],
        addresses: [],
        user: null,
        currentFilter: 'all',
        currentCategory: null,
        viewMode: 'grid',
        orderFilter: 'all',
        currentSlide: 0,
        slideInterval: null,
        productsCache: null,

        async init() {
            initData();
            this.loadData();
            await this.loadProducts();

            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                this.user = JSON.parse(savedUser);
            }

            this.updateAuthUI();

            // If not logged in, show login page
            if (!this.user) {
                this.navigate('login');
            } else {
                this.renderProducts();
                this.updateBadges();
                this.startHeroSlider();
            }

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeModal();
                }
            });
        },

        async loadProducts() {
            if (API_BASE) {
                try {
                    this.productsCache = await apiCall('/api/products');
                } catch (err) {
                    console.warn('API fetch failed, using localStorage:', err);
                    this.productsCache = JSON.parse(localStorage.getItem('products')) || defaultProducts;
                }
            } else {
                this.productsCache = JSON.parse(localStorage.getItem('products')) || defaultProducts;
            }
        },

        loadData() {
            this.cart = JSON.parse(localStorage.getItem('cart')) || [];
            this.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            this.addresses = JSON.parse(localStorage.getItem('addresses')) || [];
            this.user = JSON.parse(localStorage.getItem('currentUser')) || null;

            if (API_BASE) {
                apiCall('/api/orders').then(orders => {
                    this.orders = orders;
                    if (this.currentPage === 'orders') {
                        this.renderOrders();
                    }
                }).catch(() => {
                    this.orders = JSON.parse(localStorage.getItem('orders')) || [];
                });
            } else {
                this.orders = JSON.parse(localStorage.getItem('orders')) || [];
            }
        },

        saveData() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
            localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
            localStorage.setItem('orders', JSON.stringify(this.orders));
            localStorage.setItem('addresses', JSON.stringify(this.addresses));
        },

        navigate(page) {
            this.currentPage = page;

            const protectedPages = ['cart', 'wishlist', 'orders', 'checkout', 'profile', 'tracking'];
            if (protectedPages.includes(page) && !this.user) {
                this.showToast('Please login first', 'error');
                page = 'login';
            }

            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            const target = document.getElementById(`page-${page}`);
            if (target) {
                target.classList.add('active');
            }

            this.closeModal();

            switch (page) {
                case 'home':
                    this.renderProducts();
                    break;
                case 'cart':
                    this.renderCart();
                    break;
                case 'wishlist':
                    this.renderWishlist();
                    break;
                case 'orders':
                    this.renderOrders();
                    break;
                case 'checkout':
                    this.renderCheckout();
                    break;
                case 'profile':
                    this.renderProfile();
                    break;
            }

            window.scrollTo(0, 0);
        },

        getProducts() {
            return this.productsCache || JSON.parse(localStorage.getItem('products')) || defaultProducts;
        },

        renderProducts() {
            const grid = document.getElementById('product-grid');
            if (!grid) return;

            let products = this.getProducts();

            // Apply search
            const searchQuery = document.getElementById('search-input')?.value.toLowerCase();
            if (searchQuery) {
                products = products.filter(p =>
                    p.name.toLowerCase().includes(searchQuery) ||
                    p.category.toLowerCase().includes(searchQuery) ||
                    p.brand.toLowerCase().includes(searchQuery)
                );
            }

            // Apply category filter from nav/dropdown (single source of truth)
            if (this.currentCategory) {
                products = products.filter(p => p.category === this.currentCategory);
            }

            // Apply other filters
            const sizeFilter = document.getElementById('filter-size')?.value;
            const colorFilter = document.getElementById('filter-color')?.value;
            const priceFilter = document.getElementById('filter-price')?.value;
            const sortFilter = document.getElementById('filter-sort')?.value;

            if (sizeFilter && sizeFilter !== 'all') {
                products = products.filter(p => p.sizes && p.sizes.includes(sizeFilter));
            }

            if (colorFilter && colorFilter !== 'all') {
                products = products.filter(p => p.colors && p.colors.includes(colorFilter));
            }

            if (priceFilter && priceFilter !== 'all') {
                products = products.filter(p => {
                    if (priceFilter === '2000+') return p.price >= 2000;
                    const [min, max] = priceFilter.split('-').map(Number);
                    return p.price >= min && p.price <= max;
                });
            }

            // Sort
            switch (sortFilter) {
                case 'price-low':
                    products.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    products.sort((a, b) => b.price - a.price);
                    break;
                case 'rating':
                    products.sort((a, b) => b.rating - a.rating);
                    break;
                case 'newest':
                    products.sort((a, b) => b.id - a.id);
                    break;
            }

            grid.innerHTML = '';

            if (products.length === 0) {
                grid.innerHTML = '<div class="empty-state"><div class="empty-icon">👕</div><h3>No products found</h3><p>Try adjusting your filters</p></div>';
                return;
            }

            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.onclick = (e) => {
                    if (!e.target.closest('.wishlist-icon') && !e.target.closest('.add-cart-btn')) {
                        this.showProductModal(product.id);
                    }
                };

                const inWishlist = this.wishlist.includes(product.id);

                card.innerHTML = `
        <div class="wishlist-icon ${inWishlist ? 'in-wishlist' : ''}" onclick="app.toggleWishlist('${product.id}')">
          ${inWishlist ? '❤️' : '🤍'}
        </div>
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <div class="product-title">${product.name}</div>
          <div class="product-price-row">
            <span class="product-price">₹${product.price}</span>
            <span class="product-mrp">₹${product.mrp}</span>
            <span class="product-discount">${product.discount}% OFF</span>
          </div>
          <div class="product-rating">
            <span class="rating-badge">${product.rating}</span>
            <span>★</span>
          </div>
          <button class="add-cart-btn" onclick="event.stopPropagation(); app.addToCart('${product.id}')">ADD TO CART</button>
        </div>
      `;
                grid.appendChild(card);
            });
        },

        showProductModal(productId) {
            const products = this.getProducts();
            const product = products.find(p => p.id == productId);
            if (!product) return;

            const modalBody = document.getElementById('product-modal-body');
            const inWishlist = this.wishlist.includes(product.id);

            modalBody.innerHTML = `
      <div class="product-gallery">
        <img src="${product.images[0]}" alt="${product.name}" class="product-main-image" id="modal-main-image">
        <div class="product-thumbnails">
          ${product.images.map((img, idx) => `
            <img src="${img}" alt="View ${idx + 1}" class="product-thumbnail ${idx === 0 ? 'active' : ''}" onclick="app.setMainImage(this, '${img}')">
          `).join('')}
        </div>
      </div>
      <div class="product-details-info">
        <h2>${product.name}</h2>
        <div class="product-brand">Brand: ${product.brand || 'Generic'}</div>
        <div class="product-desc">${product.description}</div>
        <div class="price-detail">
          <span class="current-price">₹${product.price}</span>
          <span class="original-price">₹${product.mrp}</span>
          <span class="discount-percent">${product.discount}% OFF</span>
        </div>
        <div class="rating-detail">
          <span class="stars">★★★★★</span>
          <span class="rating-text">${product.rating} | 1,234 ratings</span>
        </div>
        <div class="option-group">
          <label>Size:</label>
          <div class="size-options">
            ${product.sizes.map(size => `
              <button class="size-btn" onclick="app.selectSize(this)">${size}</button>
            `).join('')}
          </div>
        </div>
        <div class="option-group">
          <label>Color:</label>
          <div class="color-options">
            ${product.colors.map(color => `
              <div class="color-btn" style="background:${this.getColorCode(color)}" title="${color}" onclick="app.selectColor(this)"></div>
            `).join('')}
          </div>
        </div>
        <div class="detail-actions">
          <button class="btn-primary" onclick="app.addToCart('${product.id}'); app.closeModal();">ADD TO CART</button>
          <button class="btn-secondary" onclick="app.toggleWishlist('${product.id}')">
            ${inWishlist ? '❤️ WISHLISTED' : '🤍 ADD TO WISHLIST'}
          </button>
        </div>
      </div>
    `;
    
    document.getElementById('product-modal').classList.add('active');
  },

  setMainImage(thumbnail, src) {
    document.getElementById('modal-main-image').src = src;
    document.querySelectorAll('.product-thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
  },

  selectSize(btn) {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  },

  selectColor(btn) {
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  },

  getColorCode(colorName) {
    const colors = {
      'Red': '#e53935',
      'Blue': '#1e88e5',
      'Black': '#212121',
      'White': '#f5f5f5',
      'Green': '#43a047',
      'Yellow': '#fdd835',
      'Navy Blue': '#1a237e',
      'Pink': '#e91e63',
      'Grey': '#757575',
      'Cream': '#fff8e1',
      'Olive': '#556b2f',
      'Beige': '#f5f5dc',
      'Light Blue': '#81d4fa',
      'Light Green': '#aed581',
      'Maroon': '#880e4f',
      'Orange': '#fb8c00',
      'Dark Grey': '#424242'
    };
    return colors[colorName] || '#ccc';
  },

  closeModal() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
  },

  // --- CART ---
  addToCart(productId) {
    const products = this.getProducts();
    const product = products.find(p => p.id == productId);
    if (!product) return;
    
    const existingItem = this.cart.find(item => item.id == productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    
    this.saveData();
    this.updateBadges();
    this.showToast('Added to cart!', 'success');
    
    if (this.currentPage === 'cart') {
      this.renderCart();
    }
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id != productId);
    this.saveData();
    this.updateBadges();
    this.renderCart();
  },

  updateCartQuantity(productId, delta) {
    const item = this.cart.find(item => item.id == productId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
        return;
      }
    }
    this.saveData();
    this.updateBadges();
    this.renderCart();
  },

  renderCart() {
    const list = document.getElementById('cart-items-list');
    const summary = document.getElementById('cart-summary');
    if (!list) return;
    
    if (this.cart.length === 0) {
      list.innerHTML = '<div class="empty-state"><div class="empty-icon">🛒</div><h3>Your cart is empty</h3><p>Add items to get started</p></div>';
      summary.innerHTML = '';
      return;
    }
    
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = this.cart.reduce((sum, item) => sum + ((item.mrp - item.price) * item.quantity), 0);
    const delivery = subtotal > 999 ? 0 : 99;
    const total = subtotal + delivery;
    
    list.innerHTML = this.cart.map(item => `
      <div class="cart-item-row">
        <img src="${item.images[0]}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">₹${item.price}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="app.updateCartQuantity('${item.id}', -1)">-</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn" onclick="app.updateCartQuantity('${item.id}', 1)">+</button>
          </div>
          <button class="cart-item-remove" onclick="app.removeFromCart('${item.id}')">REMOVE</button>
        </div>
      </div>
    `).join('');
    
    summary.innerHTML = `
      <h3>PRICE DETAILS</h3>
      <div class="summary-row">
        <span>Price (${this.cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
        <span>₹${subtotal + discount}</span>
      </div>
      <div class="summary-row">
        <span>Discount</span>
        <span style="color:#388e3c">-₹${discount}</span>
      </div>
      <div class="summary-row">
        <span>Delivery Charges</span>
        <span>${delivery === 0 ? 'FREE' : '₹' + delivery}</span>
      </div>
      <div class="summary-row total">
        <span>Total Amount</span>
        <span>₹${total}</span>
      </div>
      <button class="checkout-btn" onclick="app.navigate('checkout')">PROCEED TO CHECKOUT</button>
    `;
  },

  // --- WISHLIST ---
  toggleWishlist(productId) {
    const index = this.wishlist.findIndex(id => id == productId);
    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.showToast('Removed from wishlist', 'success');
    } else {
      this.wishlist.push(productId);
      this.showToast('Added to wishlist!', 'success');
    }
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    this.updateBadges();
    
    if (this.currentPage === 'wishlist') {
      this.renderWishlist();
    }
    
    if (this.currentPage === 'home') {
      this.renderProducts();
    }
  },

  renderWishlist() {
    const grid = document.getElementById('wishlist-grid');
    if (!grid) return;
    
    const products = this.getProducts().filter(p => this.wishlist.some(id => id == p.id));
    
    if (products.length === 0) {
      grid.innerHTML = '<div class="empty-state"><div class="empty-icon">❤️</div><h3>Your wishlist is empty</h3><p>Save items you like for later</p></div>';
      return;
    }
    
    grid.innerHTML = products.map(product => `
      <div class="product-card" onclick="app.showProductModal('${product.id}')">
        <div class="wishlist-icon in-wishlist" onclick="event.stopPropagation(); app.toggleWishlist('${product.id}')">❤️</div>
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <div class="product-title">${product.name}</div>
          <div class="product-price-row">
            <span class="product-price">₹${product.price}</span>
            <span class="product-mrp">₹${product.mrp}</span>
            <span class="product-discount">${product.discount}% OFF</span>
          </div>
          <div class="product-rating">
            <span class="rating-badge">${product.rating}</span>
            <span>★</span>
          </div>
          <button class="add-cart-btn" onclick="event.stopPropagation(); app.addToCart('${product.id}')">ADD TO CART</button>
        </div>
      </div>
    `).join('');
  },

  // --- ORDERS ---
  async placeOrder() {
    if (this.cart.length === 0) {
      this.showToast('Your cart is empty!', 'error');
      return;
    }
    
    const selectedAddress = this.addresses.find(a => a.selected);
    if (!selectedAddress && this.addresses.length > 0) {
      this.addresses[0].selected = true;
    }
    
    if (this.addresses.length === 0) {
      this.showToast('Please add a delivery address', 'error');
      this.navigate('checkout');
      return;
    }
    
    const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'cod';
    
    const order = {
      items: [...this.cart],
      address: selectedAddress || this.addresses[0],
      payment: paymentMethod,
      subtotal: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'pending',
      date: new Date().toISOString(),
      trackingNumber: '',
      deliveryDate: ''
    };
    
    try {
      if (API_BASE) {
        const created = await apiCall('/api/orders', {
          method: 'POST',
          body: JSON.stringify(order)
        });
        order.id = created.id;
        
        // If Razorpay payment, initiate payment
        if (paymentMethod === 'razorpay') {
          await this.initiateRazorpayPayment(order);
          return;
        }
      } else {
        order.id = 'ORD' + Date.now().toString().slice(-8);
        this.orders.unshift(order);
      }
      
      this.cart = [];
      this.saveData();
      this.updateBadges();
      this.showToast('Order placed successfully!', 'success');
      this.navigate('orders');
    } catch (err) {
      console.error('Place order error:', err);
      this.showToast('Failed to place order. Please try again.', 'error');
    }
  },

  async initiateRazorpayPayment(order) {
    try {
      // Create Razorpay order
      const razorpayOrder = await apiCall('/api/payment/create-order', {
        method: 'POST',
        body: JSON.stringify({
          amount: order.subtotal,
          currency: 'INR',
          receipt: order.id
        })
      });
      
      // Get Razorpay key
      const { key } = await apiCall('/api/payment/key');
      
      const options = {
        key: key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'VastraKart',
        description: `Payment for Order ${order.id}`,
        order_id: razorpayOrder.id,
        handler: async (response) => {
          try {
            // Verify payment on backend
            await apiCall('/api/payment/verify', {
              method: 'POST',
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: order.id
              })
            });
            
            // Update order status
            await apiCall(`/api/orders/${order.id}`, {
              method: 'PUT',
              body: JSON.stringify({
                paymentStatus: 'paid',
                payment: 'razorpay',
                status: 'approved'
              })
            });
            
            this.cart = [];
            this.saveData();
            this.updateBadges();
            this.showToast('Payment successful! Order confirmed.', 'success');
            this.navigate('orders');
          } catch (err) {
            console.error('Payment verification error:', err);
            this.showToast('Payment verification failed. Please contact support.', 'error');
          }
        },
        prefill: {
          name: order.address?.name || 'Customer',
          email: 'customer@vastrakart.com',
          contact: order.address?.phone || '9876543210'
        },
        theme: {
          color: '#2874f0'
        }
      };
      
      const rzp = new Razorpay(options);
      rzp.open();
      
    } catch (err) {
      console.error('Razorpay initiation error:', err);
      this.showToast('Failed to initiate payment. Please try again.', 'error');
    }
  },

  renderOrders() {
    const list = document.getElementById('orders-list');
    if (!list) return;
    
    let orders = [...this.orders];
    
    if (this.orderFilter !== 'all') {
      orders = orders.filter(o => o.status === this.orderFilter);
    }
    
    if (orders.length === 0) {
      list.innerHTML = '<div class="empty-state"><div class="empty-icon">📦</div><h3>No orders yet</h3><p>Start shopping to see your orders here</p></div>';
      return;
    }
    
    list.innerHTML = orders.map(order => `
      <div class="order-card">
        <div class="order-header">
          <span class="order-id">${order.id}</span>
          <span class="order-status ${order.status}">${order.status}</span>
        </div>
        <div class="order-items">
          ${order.items.map(item => `
            <img src="${item.images[0]}" alt="${item.name}" class="order-item-thumb" title="${item.name}">
          `).join('')}
        </div>
        <div class="order-footer">
          <span class="order-amount">₹${order.subtotal}</span>
          <button class="order-track-btn" onclick="app.showTracking('${order.id}')">Track Order</button>
        </div>
      </div>
    `).join('');
  },

  showTracking(orderId) {
    const order = this.orders.find(o => o.id == orderId);
    if (!order) return;
    
    const statuses = ['pending', 'approved', 'shipped', 'delivered'];
    const currentIndex = statuses.indexOf(order.status);
    
    const trackingCard = document.getElementById('tracking-card');
    trackingCard.innerHTML = `
      <div class="order-header">
        <span class="order-id">Order ${order.id}</span>
        <span class="order-status ${order.status}">${order.status}</span>
      </div>
      <div class="tracking-timeline">
        ${statuses.map((status, idx) => `
          <div class="tracking-step ${idx < currentIndex ? 'completed' : ''} ${idx === currentIndex ? 'active' : ''}">
            <div class="tracking-dot">${idx < currentIndex ? '✓' : idx + 1}</div>
            <div class="tracking-info">
              <h4>${status.charAt(0).toUpperCase() + status.slice(1)}</h4>
              <p>${this.getTrackingDate(status, order.date)}</p>
            </div>
          </div>
        `).join('')}
      </div>
      ${order.trackingNumber ? `<p style="margin-top:20px;"><strong>Tracking Number:</strong> ${order.trackingNumber}</p>` : ''}
      ${order.deliveryDate ? `<p><strong>Expected Delivery:</strong> ${new Date(order.deliveryDate).toLocaleDateString()}</p>` : ''}
    `;
    
    this.navigate('tracking');
  },

  getTrackingDate(status, orderDate) {
    const orderDateObj = new Date(orderDate);
    switch(status) {
      case 'pending':
        return 'Order placed - ' + orderDateObj.toLocaleDateString();
      case 'approved':
        return 'Order confirmed - ' + new Date(orderDateObj.getTime() + 86400000).toLocaleDateString();
      case 'shipped':
        return 'Shipped - ' + new Date(orderDateObj.getTime() + 172800000).toLocaleDateString();
      case 'delivered':
        return 'Delivered - ' + new Date(orderDateObj.getTime() + 432000000).toLocaleDateString();
      default:
        return '';
    }
  },

  setOrderTab(tab) {
    this.orderFilter = tab;
    document.querySelectorAll('.order-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    this.renderOrders();
  },

  // --- CHECKOUT ---
  renderCheckout() {
    this.renderAddressBook();
    this.renderCheckoutSummary();
  },

  renderAddressBook() {
    const book = document.getElementById('address-book');
    if (!book) return;
    
    if (this.addresses.length === 0) {
      book.innerHTML = '<p style="color:#878787; padding:10px 0;">No addresses saved. Add one below.</p>';
      return;
    }
    
    book.innerHTML = this.addresses.map((addr, idx) => `
      <div class="address-card ${addr.selected ? 'selected' : ''}" onclick="app.selectAddress(${idx})">
        <div class="addr-name">${addr.name} | ${addr.phone}</div>
        <div class="addr-details">${addr.details}, ${addr.city}, ${addr.state} - ${addr.pincode}</div>
      </div>
    `).join('');
  },

  showAddressForm() {
    document.getElementById('new-address-form').style.display = 'block';
  },

  saveAddress() {
    const name = document.getElementById('addr-name').value;
    const phone = document.getElementById('addr-phone').value;
    const pincode = document.getElementById('addr-pincode').value;
    const state = document.getElementById('addr-state').value;
    const city = document.getElementById('addr-city').value;
    const details = document.getElementById('addr-details').value;
    
    if (!name || !phone || !pincode || !city || !details) {
      this.showToast('Please fill all address fields', 'error');
      return;
    }
    
    // Deselect all others
    this.addresses.forEach(a => a.selected = false);
    
    this.addresses.push({
      name,
      phone,
      pincode,
      state,
      city,
      details,
      selected: true
    });
    
    this.saveData();
    this.renderAddressBook();
    this.showAddressForm();
    this.showToast('Address saved!', 'success');
    
    // Clear form
    document.getElementById('addr-name').value = '';
    document.getElementById('addr-phone').value = '';
    document.getElementById('addr-pincode').value = '';
    document.getElementById('addr-state').value = '';
    document.getElementById('addr-city').value = '';
    document.getElementById('addr-details').value = '';
    document.getElementById('new-address-form').style.display = 'none';
  },

  selectAddress(index) {
    this.addresses.forEach((a, idx) => a.selected = idx === index);
    this.saveData();
    this.renderAddressBook();
  },

  renderCheckoutSummary() {
    const summary = document.getElementById('checkout-summary');
    if (!summary) return;
    
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = this.cart.reduce((sum, item) => sum + ((item.mrp - item.price) * item.quantity), 0);
    const delivery = subtotal > 999 ? 0 : 99;
    const total = subtotal + delivery;
    
    summary.innerHTML = `
      <h3>PRICE DETAILS</h3>
      <div class="summary-row">
        <span>Price (${this.cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
        <span>₹${subtotal + discount}</span>
      </div>
      <div class="summary-row">
        <span>Discount</span>
        <span style="color:#388e3c">-₹${discount}</span>
      </div>
      <div class="summary-row">
        <span>Delivery Charges</span>
        <span>${delivery === 0 ? 'FREE' : '₹' + delivery}</span>
      </div>
      <div class="summary-row total">
        <span>Total Amount</span>
        <span>₹${total}</span>
      </div>
      <button class="checkout-btn" onclick="app.placeOrder()">PLACE ORDER</button>
    `;
  },

  // --- PROFILE ---
  renderProfile() {
    this.updateProfileUI();
    this.renderProfileAddresses();
  },

  updateProfileUI() {
    if (!this.user) {
      document.getElementById('profile-name').textContent = 'Guest User';
      document.getElementById('profile-email').textContent = 'guest@example.com';
      return;
    }
    
    document.getElementById('profile-name').textContent = this.user.name || 'User';
    document.getElementById('profile-email').textContent = this.user.email || '';
    document.getElementById('profile-fullname').value = this.user.name || '';
    document.getElementById('profile-email-input').value = this.user.email || '';
    document.getElementById('profile-phone').value = this.user.phone || '';
  },

  renderProfileAddresses() {
    const list = document.getElementById('profile-addresses-list');
    if (!list) return;
    
    if (this.addresses.length === 0) {
      list.innerHTML = '<p style="color:#878787">No addresses saved</p>';
      return;
    }
    
    list.innerHTML = this.addresses.map((addr, idx) => `
      <div class="address-card ${addr.selected ? 'selected' : ''}" style="margin-bottom:10px;">
        <div class="addr-name">${addr.name} | ${addr.phone}</div>
        <div class="addr-details">${addr.details}, ${addr.city}, ${addr.state} - ${addr.pincode}</div>
      </div>
    `).join('');
  },

  setProfileTab(tab) {
    document.querySelectorAll('.profile-menu-item').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`profile-tab-${tab}`).classList.add('active');
  },

  updateProfile() {
    const name = document.getElementById('profile-fullname').value;
    const email = document.getElementById('profile-email-input').value;
    const phone = document.getElementById('profile-phone').value;
    
    this.user = { name, email, phone };
    localStorage.setItem('currentUser', JSON.stringify(this.user));
    this.updateProfileUI();
    this.showToast('Profile updated!', 'success');
  },

  logout() {
    localStorage.removeItem('currentUser');
    this.user = null;
    this.showToast('Logged out successfully', 'success');
    this.navigate('home');
  },

  // --- SEARCH & FILTER ---
  search() {
    this.navigate('home');
    this.renderProducts();
  },

  filterCategory(category) {
    this.currentCategory = category;
    this.navigate('home');
    
    const select = document.getElementById('filter-category');
    if (select) {
      select.value = category === 'all' ? 'all' : category;
    }
    
    this.renderProducts();
  },

  applyFilters() {
    const select = document.getElementById('filter-category');
    if (select) {
      this.currentCategory = select.value === 'all' ? null : select.value;
    }
    this.renderProducts();
  },

  setView(mode) {
    this.viewMode = mode;
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    
    const grid = document.getElementById('product-grid');
    if (mode === 'list') {
      grid.classList.add('list-view');
    } else {
      grid.classList.remove('list-view');
    }
  },

  // --- HERO SLIDER ---
  startHeroSlider() {
    this.slideInterval = setInterval(() => {
      this.setSlide((this.currentSlide + 1) % 3);
    }, 4000);
  },

  setSlide(index) {
    this.currentSlide = index;
    document.querySelectorAll('.hero-slide').forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });
    document.querySelectorAll('.hero-dots .dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
  },

  // --- UTILITIES ---
  updateBadges() {
    const cartCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const wishlistCount = this.wishlist.length;
    
    const cartEl = document.getElementById('cart-count');
    const wishlistEl = document.getElementById('wishlist-count');
    
    if (cartEl) cartEl.textContent = cartCount;
    if (wishlistEl) wishlistEl.textContent = wishlistCount;
  },

  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  },

  // --- AUTHENTICATION ---
  setLoginTab(btn, tab) {
    document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.login-tab-content').forEach(t => t.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(`login-tab-${tab}`).classList.add('active');
  },

  async register(event) {
    event.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const password = document.getElementById('reg-password').value;
    
    if (!name || !email || !phone || !password) {
      this.showToast('Please fill all fields', 'error');
      return;
    }
    
    const user = { name, email, phone, joined: new Date().toISOString().split('T')[0] };
    
    // Save to localStorage registered users (fallback in case API/DB is reset)
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const existing = registeredUsers.find(u => u.email === email);
    if (existing) {
      this.showToast('Email already registered', 'error');
      return;
    }
    registeredUsers.push({ ...user, password });
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    
    if (API_BASE) {
      try {
        await apiCall('/api/users', {
          method: 'POST',
          body: JSON.stringify({ ...user, password })
        });
      } catch (err) {
        console.warn('Failed to register on server:', err);
      }
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.user = user;
    this.updateAuthUI();
    this.showToast('Registration successful!', 'success');
    this.navigate('home');
  },

  async login(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
      this.showToast('Please enter email and password', 'error');
      return;
    }
    
    let user = null;
    let userSource = null;
    
    // First check localStorage registered users
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const localUser = registeredUsers.find(u => u.email === email && u.password === password);
    if (localUser) {
      user = { name: localUser.name, email: localUser.email, phone: localUser.phone, joined: localUser.joined };
      userSource = 'local';
    }
    
    // If not found locally, try API
    if (!user && API_BASE) {
      try {
        const users = await apiCall('/api/users');
        user = users.find(u => u.email === email);
        if (user) {
          userSource = 'api';
        }
      } catch (err) {
        console.warn('Failed to fetch users from server:', err);
      }
    }
    
    if (!user) {
      this.showToast('Invalid email or password', 'error');
      return;
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.user = user;
    this.updateAuthUI();
    this.showToast('Login successful!', 'success');
    this.navigate('home');
  },

  logout() {
    localStorage.removeItem('currentUser');
    this.user = null;
    this.updateAuthUI();
    this.showToast('Logged out successfully', 'success');
    this.navigate('login');
  },

  handleAuthClick() {
    if (this.user) {
      this.navigate('profile');
    } else {
      this.navigate('login');
    }
  },

  updateAuthUI() {
    const authLabel = document.getElementById('header-auth-label');
    const authBtn = document.getElementById('header-auth-btn');
    
    if (this.user) {
      if (authLabel) authLabel.textContent = 'Logout';
      if (authBtn) {
        authBtn.onclick = () => this.logout();
      }
    } else {
      if (authLabel) authLabel.textContent = 'Login';
      if (authBtn) {
        authBtn.onclick = () => this.navigate('login');
      }
    }
  },

  isLoggedIn() {
    return !!this.user;
  }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', async () => {
  await app.init();
});