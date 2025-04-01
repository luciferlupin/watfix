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
    const inquiryForm = document.getElementById('productInquiryForm');
    
    if (inquiryForm) {
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
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(element => {
                element.textContent = '';
            });
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const company = document.getElementById('company').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const product = document.getElementById('product').value;
            const message = document.getElementById('message').value.trim();
            let otherProduct = '';
            
            if (product === 'Other') {
                otherProduct = document.getElementById('otherProduct').value.trim();
            }
            
            // Validate form
            let isValid = true;
            
            if (name === '') {
                document.getElementById('name-error').textContent = 'Please enter your name';
                isValid = false;
            }
            
            if (company === '') {
                document.getElementById('company-error').textContent = 'Please enter your company name';
                isValid = false;
            }
            
            if (email === '') {
                document.getElementById('email-error').textContent = 'Please enter your email';
                isValid = false;
            } else if (!isValidEmail(email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email';
                isValid = false;
            }
            
            if (phone === '') {
                document.getElementById('phone-error').textContent = 'Please enter your phone number';
                isValid = false;
            }
            
            if (product === '') {
                document.getElementById('product-error').textContent = 'Please select a product';
                isValid = false;
            }
            
            if (product === 'Other' && otherProduct === '') {
                document.getElementById('otherProduct-error').textContent = 'Please provide product details';
                isValid = false;
            }
            
            if (message === '') {
                document.getElementById('message-error').textContent = 'Please enter your message';
                isValid = false;
            }
            
            // If form is valid, redirect to WhatsApp
            if (isValid) {
                // Get additional form values
                const quantity = document.getElementById('quantity').value.trim();
                const frequency = document.getElementById('frequency').value;
                const technical = document.getElementById('technical').checked ? 'Yes' : 'No';
                const newsletter = document.getElementById('newsletter').checked ? 'Yes' : 'No';
                
                // Format the product name
                const productName = product === 'Other' ? otherProduct : product;
                
                // Create WhatsApp message text with all form fields - using encodeURIComponent for proper URL encoding
                const messageText = `*New Inquiry from WatFix Chemicals Website*

*Name:* ${name}
*Company:* ${company}
*Email:* ${email}
*Phone:* ${phone}
*Product Interest:* ${productName}
*Quantity:* ${quantity || 'Not specified'}
*Purchase Frequency:* ${frequency || 'Not specified'}
*Technical Specs Requested:* ${technical}
*Newsletter Subscription:* ${newsletter}

*Additional Requirements:*
${message}`;

                // Properly encode the message for URL
                const encodedText = encodeURIComponent(messageText);
                
                // Create WhatsApp URL with the phone number and message
                const whatsappUrl = `https://wa.me/918076419279?text=${encodedText}`;
                
                // Log the URL for debugging
                console.log("WhatsApp URL:", whatsappUrl);
                
                // Redirect to WhatsApp immediately
                window.location.href = whatsappUrl;
                
                // Prevent form from submitting normally
                return false;
            }
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Modal functionality
    const modalContainer = document.getElementById('modalContainer');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const productLinks = document.querySelectorAll('.learn-more[href^="#modal-"]');
    
    // Function to open modal
    function openModal(modalId) {
        modalContainer.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Hide all modals first
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        
        // Show the selected modal
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
        }
    }
    
    // Function to close all modals
    function closeModals() {
        modalContainer.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
    }
    
    // Event listener for product links
    productLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('href').substring(1); // Remove the # from href
            openModal(modalId);
        });
    });
    
    // Event listener for close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModals);
    });
    
    // Close modal when clicking on overlay
    modalOverlay.addEventListener('click', closeModals);
    
    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModals();
        }
    });
    
    // Prevent closing when clicking inside modal content
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Handle "Request Quote" button in modals
    const modalCtaButtons = document.querySelectorAll('.modal-cta');
    modalCtaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the product name from the modal title
            const modalTitle = this.closest('.modal').querySelector('.modal-header h2').textContent;
            
            // Close the modal
            closeModals();
            
            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            contactSection.scrollIntoView({ behavior: 'smooth' });
            
            // Set the product dropdown to the selected product
            setTimeout(() => {
                const productDropdown = document.getElementById('product');
                
                // Find the option that matches the modal title
                for (let i = 0; i < productDropdown.options.length; i++) {
                    if (productDropdown.options[i].text === modalTitle) {
                        productDropdown.selectedIndex = i;
                        
                        // Trigger change event to handle any dependent fields
                        const event = new Event('change');
                        productDropdown.dispatchEvent(event);
                        break;
                    }
                }
                
                // Focus on the name field
                document.getElementById('name').focus();
            }, 800);
        });
    });

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
