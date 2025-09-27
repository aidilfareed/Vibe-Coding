// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking
                if (window.innerWidth <= 768) {
                    nav.style.display = 'none';
                }
            }
        });
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cart = [];
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pizzaName = this.getAttribute('data-name');
            const pizzaPrice = parseFloat(this.getAttribute('data-price'));
            
            // Add to cart array
            cart.push({
                name: pizzaName,
                price: pizzaPrice
            });
            
            // Show confirmation
            const originalText = this.textContent;
            this.textContent = 'Added! 🎉';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
            
            // Update cart count (if we had a cart icon)
            console.log(`Added ${pizzaName} to cart. Total items: ${cart.length}`);
        });
    });
    
    // Form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (cart.length === 0) {
                alert('Please add at least one pizza to your order!');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a confirmation
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            
            alert(`Thank you ${name}! Your order has been placed.\n\nOrder Summary:\n${cart.map(item => `${item.name} - $${item.price}`).join('\n')}\n\nTotal: $${total.toFixed(2)}\n\nWe'll contact you at ${email} to confirm your order.`);
            
            // Reset form and cart
            orderForm.reset();
            cart = [];
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.style.display = 'flex';
        }
    });
});

// Simple animation on scroll (optional enhancement)
document.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.menu-item, .stat-item, .contact-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initialize opacity and transform for animated elements
document.querySelectorAll('.menu-item, .stat-item, .contact-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});