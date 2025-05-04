# ShopEase - Modern E-commerce Website

![ShopEase Logo](assets/logo.png)

ShopEase is a modern, responsive e-commerce website built with HTML5, CSS3, and JavaScript. It provides a seamless shopping experience with a clean, user-friendly interface and robust functionality.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean and intuitive user interface
- **Interactive Elements**: 
  - Product filtering and sorting
  - Add to cart functionality
  - Search functionality
  - Newsletter subscription
  - Contact form with validation
- **User Authentication**:
  - Login and registration system
  - User profile management
  - Order history
- **Shopping Cart**:
  - Add/remove items
  - Quantity adjustment
  - Cart persistence using localStorage
- **Checkout Process**:
  - Secure payment integration
  - Order summary
  - Shipping information
  - Order confirmation

## 📱 Pages

1. **Home Page**
   - Hero section with call-to-action
   - Featured products
   - Newsletter subscription
   - Quick links

2. **Products Page**
   - Product grid layout
   - Category filtering
   - Price sorting
   - Product details
   - Add to cart functionality

3. **About Page**
   - Company information
   - Team members
   - Mission and values
   - Customer testimonials

4. **Contact Page**
   - Contact form
   - Location map (Nairobi, Kenya)
   - Business hours
   - Contact information

5. **Account Page**
   - Login/Registration forms
   - Profile management
   - Order history
   - Account settings

6. **Cart Page**
   - Cart items display
   - Quantity controls
   - Price summary
   - Checkout button

7. **Checkout Page**
   - Shipping information
   - Payment methods
   - Order summary
   - Order confirmation

## 🛠️ Technologies Used

- **Frontend**:
  - HTML5
  - CSS3 (Flexbox, Grid, Variables)
  - JavaScript (ES6+)
  - Font Awesome Icons
  - Google Maps API

- **Development Tools**:
  - Visual Studio Code
  - Git for version control
  - Chrome DevTools

## 🚀 Deployment

### GitHub Pages
1. Create a new repository on GitHub
2. Push your code to the repository
3. Go to repository settings
4. Navigate to Pages section
5. Select main branch as source
6. Save changes

### Netlify
1. Create a Netlify account
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build` (if applicable)
   - Publish directory: `/` (root directory)
4. Deploy site

### Vercel
1. Create a Vercel account
2. Import your GitHub repository
3. Configure project settings
4. Deploy

## 💻 Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/PLP-WebTechnologies/feb-2025-final-project-and-deployment-scylla8434
   ```

2. Navigate to the project directory:
   ```bash
   cd feb-2025-final-project-and-deployment-scylla8434
   ```

3. Open the project in your code editor

4. Start a local server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve
   ```

5. Open your browser and visit:
   ```
   http://localhost:8000
   ```

## 📁 Project Structure

```
shopease/
├── assets/
│   ├── logo.png
│   ├── product1.jpg
│   ├── product2.jpg
│   └── ...
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── products.js
│   ├── cart.js
│   ├── account.js
│   └── checkout.js
├── index.html
├── products.html
├── about.html
├── contact.html
├── account.html
├── cart.html
├── checkout.html
└── README.md
```

## 🔧 Customization

### Colors
The website uses CSS variables for easy color customization. Edit the following in `css/style.css`:
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --text-color: #333;
    --light-bg: #f5f5f5;
    --white: #ffffff;
}
```

### Images
- Logo: `assets/logo.png`
- Product images: `assets/product1.jpg`, `assets/product2.jpg`, etc.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 📞 Contact

- **Email**: teddyanangwe@gmail.com
- **Phone**: +254 700 123 456
- **Address**: Westlands, Nairobi, Kenya
- **Website**: [www.shopease.co.ke](https://www.shopease.co.ke)

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Maps for location integration
