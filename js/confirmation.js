document.addEventListener('DOMContentLoaded', function() {
    // Generate a random order number
    const orderNumber = '#' + Math.floor(10000 + Math.random() * 90000);
    document.getElementById('orderNumber').textContent = orderNumber;

    // Get current date
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    document.getElementById('orderDate').textContent = formattedDate;

    // Get order total from localStorage
    const orderTotal = localStorage.getItem('lastOrderTotal') || '0.00';
    document.getElementById('orderTotal').textContent = `$${orderTotal}`;

    // Clear cart count
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = '0';
    }

    // Add animation to confirmation icon
    const confirmationIcon = document.querySelector('.confirmation-icon');
    if (confirmationIcon) {
        confirmationIcon.style.animation = 'scaleIn 0.5s ease-out';
    }

    // Add animation to action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add keyframe animation for the confirmation icon
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scaleIn {
            0% {
                transform: scale(0);
                opacity: 0;
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Store order details in localStorage for order history
    const orderDetails = {
        orderNumber,
        date: formattedDate,
        total: orderTotal,
        timestamp: currentDate.getTime()
    };

    // Get existing orders or initialize empty array
    const orders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    orders.push(orderDetails);
    localStorage.setItem('orderHistory', JSON.stringify(orders));

    // Clear last order total from localStorage
    localStorage.removeItem('lastOrderTotal');
}); 