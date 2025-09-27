// Cart and Application State
let cart = [];
let totalAmount = 0;
let donationAmount = 0;

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const customDonationInput = document.getElementById('custom-donation');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all functionality
function initializeApp() {
    setupMobileNavigation();
    setupScrollAnimations();
    setupSmoothScrolling();
    updateCartDisplay();
    
    // Add scroll effect to header
    window.addEventListener('scroll', handleHeaderScroll);
    
    console.log('Lions Club Pizza Charity Event - Ready!');
}

// Mobile Navigation Toggle
function setupMobileNavigation() {
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.about-card, .flavor-card, .event-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Cart Functions
function addToCart(flavor, price) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.flavor === flavor);
    
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
    } else {
        cart.push({
            flavor: flavor,
            price: price,
            quantity: 1,
            totalPrice: price,
            id: generateId()
        });
    }
    
    updateCartDisplay();
    showAddToCartAnimation(flavor);
    
    // Analytics tracking (if needed)
    console.log(`Added ${flavor} pizza to cart - $${price.toFixed(2)}`);
}

function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex > -1) {
        const removedItem = cart[itemIndex];
        cart.splice(itemIndex, 1);
        updateCartDisplay();
        
        console.log(`Removed ${removedItem.flavor} from cart`);
    }
}

function updateCartDisplay() {
    if (!cartItems || !cartTotal) return;
    
    // Calculate totals
    totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const grandTotal = totalAmount + donationAmount;
    
    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty. Add some delicious pizza!</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${formatFlavorName(item.flavor)} Pizza</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity} = $${item.totalPrice.toFixed(2)}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Remove item">
                    ×
                </button>
            </div>
        `).join('');
    }
    
    // Update total display
    cartTotal.textContent = grandTotal.toFixed(2);
    
    // Enable/disable checkout button
    if (checkoutBtn) {
        checkoutBtn.disabled = grandTotal === 0;
        checkoutBtn.textContent = grandTotal === 0 ? 'Add Items to Cart' : `Checkout - $${grandTotal.toFixed(2)}`;
    }
}

// Donation Functions
function addDonation(amount) {
    donationAmount += amount;
    updateCartDisplay();
    showDonationConfirmation(amount);
    
    console.log(`Added $${amount.toFixed(2)} donation`);
}

function addCustomDonation() {
    const amount = parseFloat(customDonationInput.value);
    
    if (isNaN(amount) || amount <= 0) {
        showAlert('Please enter a valid donation amount', 'error');
        return;
    }
    
    if (amount > 10000) {
        showAlert('Maximum donation amount is $10,000', 'error');
        return;
    }
    
    addDonation(amount);
    customDonationInput.value = '';
}

// Checkout Function
function checkout() {
    if (cart.length === 0 && donationAmount === 0) {
        showAlert('Please add items to your cart or make a donation', 'warning');
        return;
    }
    
    const grandTotal = totalAmount + donationAmount;
    
    // Create order summary
    const orderSummary = {
        items: cart,
        donation: donationAmount,
        total: grandTotal,
        timestamp: new Date().toISOString(),
        orderNumber: generateOrderNumber()
    };
    
    // Display checkout confirmation
    showCheckoutModal(orderSummary);
    
    console.log('Checkout initiated:', orderSummary);
}

// Utility Functions
function generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function generateOrderNumber() {
    return 'LC' + Date.now().toString().slice(-8);
}

function formatFlavorName(flavor) {
    return flavor.charAt(0).toUpperCase() + flavor.slice(1);
}

function showAddToCartAnimation(flavor) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            ${formatFlavorName(flavor)} added to cart!
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #27AE60, #229954);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after animation
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

function showDonationConfirmation(amount) {
    const notification = document.createElement('div');
    notification.className = 'donation-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-heart"></i>
            Thank you for your $${amount.toFixed(2)} donation!
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #E67E22, #FF8C42);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 3000);
}

function showAlert(message, type = 'info') {
    const alertColors = {
        success: '#27AE60',
        error: '#E67E22',
        warning: '#FFA726',
        info: '#42A5F5'
    };
    
    const alert = document.createElement('div');
    alert.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: ${alertColors[type]};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            font-weight: 600;
            text-align: center;
            animation: slideInDown 0.3s ease, slideOutUp 0.3s ease 2.7s;
        ">
            ${message}
        </div>
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
        }
    }, 3000);
}

function showCheckoutModal(orderSummary) {
    const modal = document.createElement('div');
    modal.className = 'checkout-modal';
    
    const itemsList = orderSummary.items.map(item => 
        `<li>${formatFlavorName(item.flavor)} x${item.quantity} - $${item.totalPrice.toFixed(2)}</li>`
    ).join('');
    
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeCheckoutModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2>Order Confirmation</h2>
                    <span class="modal-close" onclick="closeCheckoutModal()">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="order-number">Order #${orderSummary.orderNumber}</div>
                    <div class="order-details">
                        <h3>Pizza Orders:</h3>
                        <ul class="order-items">${itemsList}</ul>
                        ${orderSummary.donation > 0 ? `<div class="donation-line">Additional Donation: $${orderSummary.donation.toFixed(2)}</div>` : ''}
                        <div class="order-total">Total: $${orderSummary.total.toFixed(2)}</div>
                    </div>
                    <div class="pickup-info">
                        <h3>Pickup Information:</h3>
                        <p><strong>Location:</strong> Lions Club Community Center<br>
                        <strong>Date:</strong> Saturday, October 14th, 2024<br>
                        <strong>Time:</strong> 10:00 AM - 6:00 PM</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeCheckoutModal()">Continue Shopping</button>
                    <button class="btn btn-primary" onclick="finalizeOrder('${orderSummary.orderNumber}')">Confirm Order</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 20000;
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    const modal = document.querySelector('.checkout-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function finalizeOrder(orderNumber) {
    // Here you would typically integrate with a payment processor
    // For this demo, we'll just show a success message
    
    closeCheckoutModal();
    
    // Clear cart and reset
    cart = [];
    donationAmount = 0;
    updateCartDisplay();
    
    // Show success message
    const successModal = document.createElement('div');
    successModal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 25000;
        ">
            <div style="
                background: white;
                padding: 3rem;
                border-radius: 20px;
                text-align: center;
                max-width: 500px;
                margin: 2rem;
            ">
                <div style="font-size: 4rem; color: #27AE60; margin-bottom: 1rem;">✓</div>
                <h2 style="color: #333; margin-bottom: 1rem;">Order Confirmed!</h2>
                <p style="color: #666; margin-bottom: 2rem;">
                    Thank you for supporting Lions Club! Your order #${orderNumber} has been confirmed.
                    Please bring this confirmation to pickup your pizza at our event.
                </p>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove(); document.body.style.overflow = '';">
                    Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    console.log(`Order ${orderNumber} finalized successfully!`);
}

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes slideInDown {
        from { transform: translate(-50%, -100%); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
    
    @keyframes slideOutUp {
        from { transform: translate(-50%, 0); opacity: 1; }
        to { transform: translate(-50%, -100%); opacity: 0; }
    }
    
    .modal-overlay {
        background: rgba(0, 0, 0, 0.8);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    }
    
    .modal-content {
        background: white;
        border-radius: 20px;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        animation: modalSlideIn 0.3s ease;
    }
    
    .modal-header {
        padding: 2rem 2rem 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
    }
    
    .modal-close {
        font-size: 2rem;
        cursor: pointer;
        color: #999;
        line-height: 1;
    }
    
    .modal-body {
        padding: 2rem;
    }
    
    .modal-footer {
        padding: 1rem 2rem 2rem;
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    }
    
    .order-number {
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 10px;
        font-weight: 600;
        margin-bottom: 1.5rem;
        text-align: center;
        color: #E67E22;
    }
    
    .order-items {
        list-style: none;
        padding: 0;
        margin: 1rem 0;
    }
    
    .order-items li {
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
    }
    
    .donation-line {
        padding: 0.5rem 0;
        font-weight: 600;
        color: #27AE60;
    }
    
    .order-total {
        font-size: 1.3rem;
        font-weight: 700;
        color: #E67E22;
        padding: 1rem 0;
        border-top: 2px solid #E67E22;
        margin-top: 1rem;
    }
    
    .pickup-info {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 10px;
        margin-top: 1.5rem;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes modalSlideIn {
        from { transform: scale(0.7); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
    
    @media (max-width: 768px) {
        .modal-footer {
            flex-direction: column;
        }
        
        .modal-content {
            margin: 1rem;
        }
        
        .modal-header, .modal-body, .modal-footer {
            padding: 1rem;
        }
    }
`;

document.head.appendChild(style);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Service worker registration (for offline functionality, if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // You can implement service worker later for offline functionality
        console.log('Service Worker support detected');
    });
}