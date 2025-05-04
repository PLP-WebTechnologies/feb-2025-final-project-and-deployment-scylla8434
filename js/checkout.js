document.addEventListener('DOMContentLoaded', function() {
    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Update order summary
    updateOrderSummary(cartItems);

    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Form validation
    const checkoutForm = document.querySelector('.checkout-form');
    const completeOrderBtn = document.getElementById('completeOrderBtn');

    completeOrderBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }

        // Show loading state
        this.classList.add('loading');
        this.innerHTML = '<i class="fas fa-spinner"></i> Processing Order...';

        // Simulate order processing
        setTimeout(() => {
            // Clear cart
            localStorage.removeItem('cartItems');
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Order placed successfully! Redirecting to confirmation page...</p>
            `;
            document.querySelector('.checkout-form').insertBefore(successMessage, document.querySelector('.form-section'));

            // Redirect to confirmation page
            setTimeout(() => {
                window.location.href = 'confirmation.html';
            }, 2000);
        }, 2000);
    });

    // Helper function to validate form
    function validateForm() {
        const requiredFields = [
            'fullName',
            'email',
            'address',
            'city',
            'zipCode',
            'country',
            'cardNumber',
            'expiryDate',
            'cvv'
        ];

        let isValid = true;

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                showError(field, 'This field is required');
                isValid = false;
            } else {
                clearError(field);
            }
        });

        // Validate email format
        const email = document.getElementById('email');
        if (email.value && !validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate card number
        const cardNumber = document.getElementById('cardNumber');
        if (cardNumber.value && !validateCardNumber(cardNumber.value)) {
            showError(cardNumber, 'Please enter a valid card number');
            isValid = false;
        }

        // Validate expiry date
        const expiryDate = document.getElementById('expiryDate');
        if (expiryDate.value && !validateExpiryDate(expiryDate.value)) {
            showError(expiryDate, 'Please enter a valid expiry date (MM/YY)');
            isValid = false;
        }

        // Validate CVV
        const cvv = document.getElementById('cvv');
        if (cvv.value && !validateCVV(cvv.value)) {
            showError(cvv, 'Please enter a valid CVV');
            isValid = false;
        }

        return isValid;
    }

    // Helper function to show error message
    function showError(field, message) {
        const formGroup = field.parentElement;
        let errorMessage = formGroup.querySelector('.error-message');
        
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            formGroup.appendChild(errorMessage);
        }
        
        errorMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        field.style.borderColor = '#e74c3c';
    }

    // Helper function to clear error message
    function clearError(field) {
        const formGroup = field.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        if (errorMessage) {
            errorMessage.remove();
        }
        
        field.style.borderColor = '#ddd';
    }

    // Helper function to validate email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Helper function to validate card number
    function validateCardNumber(cardNumber) {
        const re = /^[0-9]{16}$/;
        return re.test(cardNumber.replace(/\s/g, ''));
    }

    // Helper function to validate expiry date
    function validateExpiryDate(expiryDate) {
        const re = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
        if (!re.test(expiryDate)) return false;

        const [month, year] = expiryDate.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        return (
            parseInt(year) > currentYear ||
            (parseInt(year) === currentYear && parseInt(month) >= currentMonth)
        );
    }

    // Helper function to validate CVV
    function validateCVV(cvv) {
        const re = /^[0-9]{3,4}$/;
        return re.test(cvv);
    }

    // Helper function to update order summary
    function updateOrderSummary(items) {
        const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = 5.99;
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + shipping + tax;

        document.querySelector('.subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.shipping').textContent = `$${shipping.toFixed(2)}`;
        document.querySelector('.tax').textContent = `$${tax.toFixed(2)}`;
        document.querySelector('.total-amount').textContent = `$${total.toFixed(2)}`;
    }
}); 