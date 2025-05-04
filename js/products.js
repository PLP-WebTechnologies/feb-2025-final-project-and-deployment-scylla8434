// Product Filtering and Sorting
document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const productCards = document.querySelectorAll('.product-card');

    // Category Filter
    categoryFilter.addEventListener('change', function() {
        const selectedCategory = this.value;
        filterProducts(selectedCategory, priceFilter.value);
    });

    // Price Filter
    priceFilter.addEventListener('change', function() {
        const selectedPrice = this.value;
        filterProducts(categoryFilter.value, selectedPrice);
    });

    function filterProducts(category, price) {
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardPrice = parseFloat(card.querySelector('.price').textContent.replace('$', ''));

            // Category filter
            const categoryMatch = category === 'all' || cardCategory === category;

            // Price filter
            let priceMatch = true;
            if (price === 'low') {
                priceMatch = cardPrice <= 100;
            } else if (price === 'high') {
                priceMatch = cardPrice > 100;
            }

            // Show/hide based on filters
            if (categoryMatch && priceMatch) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Search functionality
    const searchInput = document.querySelector('.nav-icons .fa-search').parentElement;
    searchInput.addEventListener('click', function() {
        const searchTerm = prompt('Enter search term:');
        if (searchTerm) {
            productCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('.description').textContent.toLowerCase();
                
                if (title.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase())) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }
    });

    // Product card hover effect
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 3px 10px rgba(0,0,0,0.1)';
        });
    });

    // Add to cart animation
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Added to Cart!';
            this.style.backgroundColor = '#27ae60';
            
            // Create and animate cart icon
            const cartIcon = document.createElement('i');
            cartIcon.className = 'fas fa-shopping-cart';
            cartIcon.style.position = 'absolute';
            cartIcon.style.fontSize = '20px';
            cartIcon.style.color = '#27ae60';
            cartIcon.style.opacity = '0';
            
            const buttonRect = this.getBoundingClientRect();
            cartIcon.style.left = `${buttonRect.left + buttonRect.width/2}px`;
            cartIcon.style.top = `${buttonRect.top + buttonRect.height/2}px`;
            
            document.body.appendChild(cartIcon);
            
            // Animate cart icon
            const animation = cartIcon.animate([
                { transform: 'scale(1)', opacity: 1 },
                { transform: 'scale(2)', opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            
            animation.onfinish = () => {
                cartIcon.remove();
            };
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
}); 