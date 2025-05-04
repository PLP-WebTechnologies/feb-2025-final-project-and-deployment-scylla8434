document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Shop Now Button Animation and Redirection
    const shopNowBtn = document.getElementById('shopNowBtn');
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', function() {
            // Add click animation
            this.classList.add('clicked');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            // Redirect to products page after a short delay
            setTimeout(() => {
                window.location.href = 'products.html';
            }, 300);
        });
    }

    // Search Functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input[type="search"]').value.trim();
            if (searchTerm) {
                // Here you would typically make an API call to search products
                console.log('Searching for:', searchTerm);
                // For demo purposes, we'll just show a message
                alert(`Searching for: ${searchTerm}`);
            }
        });
    }

    // Add to Cart Animation
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));
            const productImage = productCard.querySelector('img').src;

            // Get existing cart or create new one
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }

            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            cartCount.textContent = cart.length;

            // Show success animation
            this.textContent = 'Added to Cart!';
            this.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                this.textContent = 'Add to Cart';
                this.style.backgroundColor = '';
            }, 2000);
        });
    });

    // Newsletter Form Validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                // Show success message
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Thank you for subscribing!';
                successMessage.style.color = '#27ae60';
                successMessage.style.marginTop = '1rem';
                this.appendChild(successMessage);
                
                // Clear input
                emailInput.value = '';
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            } else {
                // Show error message
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Please enter a valid email address';
                errorMessage.style.color = '#e74c3c';
                errorMessage.style.marginTop = '1rem';
                this.appendChild(errorMessage);
                
                // Remove error message after 3 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            }
        });
    }

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Product Card Hover Effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Scroll Animation
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.product-card, .newsletter, .footer-section');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.product-card, .newsletter, .footer-section').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);

    // Initial animation check
    animateOnScroll();
}); 