document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    // Update user name in navigation if logged in
    updateNavUserDisplay(currentUser);

    // If logged in, show user info instead of login form
    if (isLoggedIn) {
        showUserInfo(currentUser);
        return;
    }

    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Form validation and submission
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;

            // Get registered users from localStorage
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const user = registeredUsers.find(u => u.email === email && u.password === password);

            if (user) {
                // Store login state
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', email);
                }

                // Update navigation with user name
                updateNavUserDisplay(user);
                
                // Redirect to home page
                window.location.href = 'index.html';
            } else {
                showMessage('Invalid email or password!', 'error');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;

            // Validate email format
            if (!validateEmail(email)) {
                showMessage('Please enter a valid email address!', 'error');
                return;
            }

            // Validate password strength
            if (!validatePassword(password)) {
                showMessage('Password must be at least 8 characters long and contain at least one number and one special character!', 'error');
                return;
            }

            // Validate passwords match
            if (password !== confirmPassword) {
                showMessage('Passwords do not match!', 'error');
                return;
            }

            // Check if email already registered
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            if (registeredUsers.some(user => user.email === email)) {
                showMessage('Email already registered!', 'error');
                return;
            }

            // Add new user
            const newUser = { name, email, password };
            registeredUsers.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

            // Store login state
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            // Update navigation with user name
            updateNavUserDisplay(newUser);
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }

    // Helper function to show messages
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <p>${message}</p>
        `;
        
        const container = document.querySelector('.account-container');
        container.insertBefore(messageDiv, container.firstChild);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // Helper function to validate email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Helper function to validate password
    function validatePassword(password) {
        const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        return re.test(password);
    }

    // Function to show user info and logout button
    function showUserInfo(user) {
        const accountContainer = document.querySelector('.account-container');
        accountContainer.innerHTML = `
            <div class="user-info">
                <h2>Welcome, ${user.name}!</h2>
                <div class="user-details">
                    <p><strong>Email:</strong> ${user.email}</p>
                </div>
                <button class="logout-btn">
                    <i class="fas fa-sign-out-alt"></i>
                    Logout
                </button>
            </div>
        `;

        // Add logout functionality
        const logoutBtn = document.querySelector('.logout-btn');
        logoutBtn.addEventListener('click', function() {
            // Add loading state
            this.classList.add('loading');
            this.innerHTML = '<i class="fas fa-spinner"></i> Logging out...';
            
            // Simulate logout process
            setTimeout(() => {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('currentUser');
                // Update navigation to remove user name
                updateNavUserDisplay({});
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Successfully logged out!</p>
                `;
                accountContainer.insertBefore(successMessage, accountContainer.firstChild);
                
                // Redirect to home page after a delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }, 1000);
        });
    }

    // Function to update user name in navigation
    function updateNavUserDisplay(user) {
        const userIcon = document.querySelector('.nav-icons a[href="account.html"]');
        if (user && user.name) {
            userIcon.innerHTML = `<i class="fas fa-user"></i><span class="user-name">${user.name}</span>`;
        } else {
            userIcon.innerHTML = '<i class="fas fa-user"></i>';
        }
    }
}); 