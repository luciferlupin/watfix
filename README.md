# WatFix Chemicals Website

A modern, responsive website for WatFix Chemicals featuring a bluish gradient design, cool animations, and detailed information about raw water treatment chemicals.

## Features

- Responsive design that works on all devices (mobile, tablet, desktop)
- Animated elements using AOS (Animate On Scroll) library
- Interactive UI with hover effects and smooth transitions
- Bluish gradient color scheme
- Comprehensive product inquiry form with validation
- Detailed raw chemical product information section with categorized listings
- Image gallery with hover effects
- Mobile-friendly navigation
- Form validation and success messaging

## Project Structure

```
watfix-chemicals/
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   └── (placeholder for your images)
├── index.html
└── README.md
```

## Setup Instructions

1. Clone or download this repository to your local machine
2. Add your own images to the `images/` directory:
   - hero-image.png (for the main hero section)
   - about-image.jpg (for the about section)
   - gallery-1.jpg through gallery-4.jpg (for the gallery section)
3. Open `index.html` in your web browser to view the website

## Dependencies

This project uses the following external libraries:

- [Font Awesome](https://fontawesome.com/) - for icons
- [Google Fonts (Poppins)](https://fonts.google.com/specimen/Poppins) - for typography
- [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) - for scroll animations

## Customization

### Colors

The website uses a bluish gradient color scheme. You can modify the colors by changing the CSS variables in the `:root` section of the `style.css` file:

```css
:root {
    --primary-color: #0056b3;
    --secondary-color: #00a0e3;
    --accent-color: #00d4ff;
    --dark-blue: #003366;
    --light-blue: #e6f7ff;
    /* other variables */
}
```

### Content

You can easily update the website content by editing the text in `index.html`. The website is structured into sections:

- Header/Navigation
- Hero Section
- About Section
- Products Section
- CTA (Call to Action) Section
- Gallery Section
- Contact Section with Product Inquiry Form
- Footer

### Adding More Products

To add more products, duplicate the product card structure in the Products section:

```html
<div class="product-card" data-aos="zoom-in" data-aos-duration="800">
    <div class="product-icon">
        <i class="fas fa-icon-name"></i>
    </div>
    <h3>Product Name</h3>
    <p>Product description goes here.</p>
    <ul class="chemical-list">
        <li>Chemical 1</li>
        <li>Chemical 2</li>
        <li>Chemical 3</li>
    </ul>
    <a href="#contact" class="learn-more" data-product="product-name">Request Quote</a>
</div>
```

### Product Inquiry Form

The website includes a comprehensive product inquiry form with validation. The form includes:

- Personal and company information fields
- Product selection dropdown
- Quantity and frequency options
- Additional requirements textarea
- Checkboxes for technical specifications and newsletter subscription

The form validation is handled by JavaScript in `main.js` and includes:
- Required field validation
- Email format validation
- Phone number format validation
- Success message display after submission

## Browser Compatibility

This website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## License

This project is created for WatFix Chemicals. All rights reserved.

---

Website designed and developed for WatFix Chemicals 2024
