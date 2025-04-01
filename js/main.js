// Main JavaScript file for WatFix Chemicals website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Product Inquiry Form Handling
    const productInquiryForm = document.getElementById('productInquiryForm');
    
    if (productInquiryForm) {
        // Show/hide the "other product" field based on selection
        const productSelect = document.getElementById('product');
        const otherProductGroup = document.getElementById('otherProductGroup');
        
        if (productSelect && otherProductGroup) {
            productSelect.addEventListener('change', function() {
                if (this.value === 'Other') {
                    otherProductGroup.style.display = 'block';
                } else {
                    otherProductGroup.style.display = 'none';
                }
            });
        }
        
        // Pre-fill product dropdown if coming from a product section
        const productLinks = document.querySelectorAll('.product-card .learn-more');
        
        productLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const productName = this.getAttribute('data-product');
                if (productName) {
                    const productSelect = document.getElementById('product');
                    if (productSelect) {
                        // Set the select value to the product name
                        for (let i = 0; i < productSelect.options.length; i++) {
                            if (productSelect.options[i].value === productName) {
                                productSelect.selectedIndex = i;
                                // Trigger the change event to show/hide the "other product" field
                                const event = new Event('change');
                                productSelect.dispatchEvent(event);
                                break;
                            }
                        }
                    }
                }
            });
        });

        // Form validation and submission
        productInquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const product = document.getElementById('product');
            
            let isValid = true;
            
            // Reset previous error states
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('error');
            });
            
            // Name validation
            if (!name.value.trim()) {
                isValid = false;
                name.closest('.form-group').classList.add('error');
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                isValid = false;
                email.closest('.form-group').classList.add('error');
            }
            
            // Phone validation (optional but must be valid if provided)
            if (phone.value.trim() && !/^[0-9+\-\s()]{7,20}$/.test(phone.value.trim())) {
                isValid = false;
                phone.closest('.form-group').classList.add('error');
            }
            
            // Product validation
            if (product.value === "") {
                isValid = false;
                product.closest('.form-group').classList.add('error');
            }
            
            if (isValid) {
                // In a real-world scenario, you would send this data to a server
                // For demo purposes, we'll just show a success message
                
                // Hide the form
                productInquiryForm.style.display = 'none';
                
                // Create and show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank You!</h3>
                    <p>Your inquiry has been submitted successfully. Our team will contact you shortly.</p>
                    <button class="btn" id="newInquiryBtn">Submit Another Inquiry</button>
                `;
                
                productInquiryForm.parentNode.appendChild(successMessage);
                
                // Add event listener to the "Submit Another Inquiry" button
                document.getElementById('newInquiryBtn').addEventListener('click', function() {
                    // Remove success message
                    successMessage.remove();
                    
                    // Reset and show the form
                    productInquiryForm.reset();
                    productInquiryForm.style.display = 'block';
                });
            }
        });
    }

    // Add error class styling
    const style = document.createElement('style');
    style.textContent = `
        .form-group.error input,
        .form-group.error select,
        .form-group.error textarea {
            border-color: #dc3545;
        }
        
        .form-group.error::after {
            content: "This field is required or invalid";
            color: #dc3545;
            font-size: 0.8rem;
            display: block;
            margin-top: 5px;
        }
    `;
    document.head.appendChild(style);
});
