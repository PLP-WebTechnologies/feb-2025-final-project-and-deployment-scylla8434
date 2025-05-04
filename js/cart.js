document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage or create empty cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay();

    // Function to update cart display
    function updateCartDisplay() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartCount = document.querySelector('.cart-count');
        const subtotalElement = document.querySelector('.subtotal');
        const totalElement = document.querySelector('.total-amount');
        
        // Update cart count in navigation
        cartCount.textContent = cart.length;

        // Clear existing items
        cartItemsContainer.innerHTML = '';

        // Calculate total
        let subtotal = 0;
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            subtotalElement.textContent = '$0.00';
            totalElement.textContent = '$0.00';
            return;
        }

        // Add each item to the cart display
        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(itemElement);
            
            subtotal += item.price * item.quantity;
        });

        // Update totals
        const shipping = subtotal > 0 ? 5.99 : 0; // Example shipping cost
        const total = subtotal + shipping;

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.shipping').textContent = `$${shipping.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;

        // Add event listeners to new elements
        addCartEventListeners();
    }

    // Function to add event listeners to cart elements
    function addCartEventListeners() {
        // Quantity controls
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const isPlus = this.classList.contains('plus');
                
                if (isPlus) {
                    cart[index].quantity++;
                } else {
                    if (cart[index].quantity > 1) {
                        cart[index].quantity--;
                    }
                }
                
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            });
        });

        // Remove item buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            });
        });
    }

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            // Redirect to checkout page
            window.location.href = 'checkout.html'; 
            console.log('Proceeding to checkout with items:', cart);
            alert('Proceeding to checkout...');
        });
    }
}); 