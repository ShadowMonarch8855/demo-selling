(function() {
  'use strict';

  const TOUR_KEY = 'hasSeenShoppingTour';
  const DRIVER_CDNS = [
    'https://cdn.jsdelivr.net/npm/driver.js@0.9.8/dist/driver.min.js',
    'https://unpkg.com/driver.js@0.9.8/dist/driver.min.js'
  ];
  const DRIVER_CSS_CDNS = [
    'https://cdn.jsdelivr.net/npm/driver.js@0.9.8/dist/driver.min.css',
    'https://unpkg.com/driver.js@0.9.8/dist/driver.min.css'
  ];
  let driverLoadPromise = null;

  function injectCSS() {
    return new Promise((resolve) => {
      const existing = document.querySelector('link[href*="driver.css"]');
      if (existing) return resolve();
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = DRIVER_CSS_CDNS[0];
      link.onload = resolve;
      link.onerror = () => {
        if (DRIVER_CSS_CDNS[1]) {
          link.href = DRIVER_CSS_CDNS[1];
          link.onload = resolve;
          link.onerror = () => resolve();
        } else {
          resolve();
        }
      };
      document.head.appendChild(link);
    });
  }

  function loadDriverScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function ensureDriverLoaded() {
    if (typeof Driver !== 'undefined') {
      return Promise.resolve();
    }
    if (driverLoadPromise) {
      return driverLoadPromise;
    }
    driverLoadPromise = (async () => {
      await injectCSS();
      for (const src of DRIVER_CDNS) {
        try {
          await loadDriverScript(src);
          if (typeof Driver !== 'undefined') {
            return;
          }
        } catch (e) {
          continue;
        }
      }
      console.warn('Driver.js failed to load from all CDNs');
    })();
    return driverLoadPromise;
  }
  let driver = null;
  let tourActive = false;
  let boundClickListener = null;

  function isTourActive() {
    return tourActive && driver !== null;
  }

  function markTourSeen() {
    try {
      localStorage.setItem(TOUR_KEY, 'true');
    } catch (e) {}
  }

  function showToast(message, type) {
    if (typeof app !== 'undefined' && app.showToast) {
      app.showToast(message, type || 'error');
    }
  }

  function setupEventListener() {
    if (boundClickListener) return;

    boundClickListener = function(e) {
      if (!isTourActive()) return;
      const idx = driver.getActiveIndex();

      if (idx === 0 && e.target.closest('#product-grid .product-card')) {
        const modal = document.getElementById('product-modal');
        if (modal) {
          setTimeout(() => {
            if (modal.classList.contains('active')) driver.moveNext();
          }, 600);
        }
      }

      if (idx === 1 && e.target.closest('#product-modal-body .color-btn')) {
        setTimeout(() => driver.moveNext(), 200);
      }

      if (idx === 2 && e.target.closest('#product-modal-body .size-btn')) {
        setTimeout(() => driver.moveNext(), 200);
      }

      if (idx === 3 && e.target.closest('#product-modal-body .btn-primary')) {
        setTimeout(() => {
          const modal = document.getElementById('product-modal');
          if (modal && !modal.classList.contains('active')) driver.moveNext();
        }, 800);
      }

      if (idx === 4 && e.target.closest('.cart-btn-main')) {
        setTimeout(() => driver.moveNext(), 500);
      }

      if (idx === 5 && e.target.closest('#page-cart .checkout-btn')) {
        setTimeout(() => driver.moveNext(), 500);
      }

      if (idx === 6) {
        if (e.target.closest('#address-book .address-card')) {
          setTimeout(() => driver.moveNext(), 400);
        } else if (e.target.closest('#new-address-form .save-btn')) {
          setTimeout(() => driver.moveNext(), 600);
        }
      }

      if (idx === 7 && e.target.closest('input[name="payment"][value="razorpay"]')) {
        setTimeout(() => driver.moveNext(), 200);
      }

      if (idx === 8 && e.target.closest('#page-checkout .checkout-btn')) {
        setTimeout(() => driver.moveNext(), 500);
      }
    };

    document.addEventListener('click', boundClickListener);
  }

  function cleanup() {
    tourActive = false;
    if (boundClickListener) {
      document.removeEventListener('click', boundClickListener);
      boundClickListener = null;
    }
    const skipBtn = document.getElementById('tour-skip-btn');
    if (skipBtn) skipBtn.remove();
  }

  function skipTour() {
    if (driver && isTourActive()) {
      driver.reset();
    }
  }

  function addSkipButton() {
    const btn = document.createElement('button');
    btn.id = 'tour-skip-btn';
    btn.textContent = 'Skip Tour';
    btn.addEventListener('click', skipTour);
    document.body.appendChild(btn);
  }

  async function startTour() {
    await ensureDriverLoaded();
    if (typeof Driver === 'undefined') {
      console.warn('Driver.js is not loaded');
      return;
    }
    if (tourActive) return;
    if (!document.querySelector('#product-grid .product-card')) {
      setTimeout(startTour, 1000);
      return;
    }

    setupEventListener();
    tourActive = true;
    addSkipButton();

    const steps = [
      {
        element: '#product-grid .product-card:first-child',
        popover: {
          title: 'Browse Products',
          description: 'Tap on a product to view details.'
        },
        onNext: () => {
          const modal = document.getElementById('product-modal');
          if (!modal || !modal.classList.contains('active')) {
            showToast('Please click on a product to continue');
            driver.movePrev();
            return false;
          }
        }
      },
      {
        element: '#product-modal-body .color-btn:first-child',
        popover: {
          title: 'Select Color',
          description: 'Select your preferred color.'
        },
        onNext: () => {
          const selected = document.querySelector('#product-modal-body .color-btn.selected');
          if (!selected) {
            showToast('Please select a color first');
            driver.movePrev();
            return false;
          }
        }
      },
      {
        element: '#product-modal-body .size-btn:first-child',
        popover: {
          title: 'Choose Size',
          description: 'Choose your size (S, M, L, XL).'
        },
        onNext: () => {
          const selected = document.querySelector('#product-modal-body .size-btn.selected');
          if (!selected) {
            showToast('Please select a size first');
            driver.movePrev();
            return false;
          }
        }
      },
      {
        element: '#product-modal-body .btn-primary',
        popover: {
          title: 'Add to Cart',
          description: 'Click here to add the item to your shopping bag.'
        },
        onNext: () => {
          const modal = document.getElementById('product-modal');
          if (modal && modal.classList.contains('active')) {
            showToast('Please click Add to Cart first');
            driver.movePrev();
            return false;
          }
        }
      },
      {
        element: '.cart-btn-main',
        popover: {
          title: 'Go to Cart',
          description: 'Proceed to checkout.'
        },
        onNext: () => {
          if (app.currentPage !== 'cart') {
            showToast('Please click the cart button');
            driver.movePrev();
            return false;
          }
        }
      },
      {
        element: '#page-cart .checkout-btn',
        popover: {
          title: 'Checkout',
          description: 'Proceed to checkout.'
        },
        onNext: () => {
          if (app.currentPage !== 'checkout') {
            showToast('Please click Proceed to Checkout');
            driver.movePrev();
            return false;
          }
        }
      },
      {
        element: '#new-address-form',
        popover: {
          title: 'Shipping Address',
          description: 'Add your shipping address here.'
        },
        onHighlighted: () => {
          const form = document.getElementById('new-address-form');
          if (form && form.style.display === 'none') {
            form.style.display = 'block';
          }
        },
        onNext: () => {
          const hasAddress = !!document.querySelector('#address-book .address-card.selected');
          const hasNewAddress = document.getElementById('addr-name')?.value?.trim();
          if (!hasAddress && !hasNewAddress) {
            showToast('Please add your shipping address');
            driver.movePrev();
            return false;
          }
        }
      },
      {
        element: 'input[name="payment"][value="razorpay"]',
        popover: {
          title: 'Payment Method',
          description: 'Select Razorpay as your secure payment method.'
        },
        onNext: () => {
          const checked = document.querySelector('input[name="payment"]:checked');
          if (!checked || checked.value !== 'razorpay') {
            showToast('Please select Razorpay');
            driver.movePrev();
            return false;
          }
        }
      },
      {
        element: '#page-checkout .checkout-btn',
        popover: {
          title: 'Place Order',
          description: 'Click to complete your purchase.'
        }
      }
    ];

    driver = new Driver({
      showProgress: true,
      nextBtnText: 'Next',
      prevBtnText: 'Back',
      doneBtnText: 'Done',
      allowClose: true,
      onReset: () => {
        cleanup();
        markTourSeen();
      }
    });

    driver.defineSteps(steps);
    driver.start();
  }

  const style = document.createElement('style');
  style.textContent = `
    #tour-skip-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      padding: 12px 24px;
      background: #2874f0;
      color: #fff;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      transition: background 0.2s;
    }
    #tour-skip-btn:hover {
      background: #1a5fb4;
    }
  `;
  document.head.appendChild(style);

  function init() {
    if (localStorage.getItem(TOUR_KEY)) return;

    const checkApp = setInterval(() => {
      if (typeof app !== 'undefined' && app.isLoggedIn && app.isLoggedIn()) {
        clearInterval(checkApp);
        const checkProducts = setInterval(() => {
          if (document.querySelector('#product-grid .product-card')) {
            clearInterval(checkProducts);
            setTimeout(startTour, 1200);
          }
        }, 200);
      }
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.startShoppingTour = startTour;
})();
