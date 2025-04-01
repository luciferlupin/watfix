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
        
        // Handle WhatsApp button click
        const whatsappBtn = inquiryForm.querySelector('.whatsapp-btn');
        
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function(e) {
                e.preventDefault();
                sendWhatsAppMessage();
            });
            
            // Add touchend event for mobile devices
            whatsappBtn.addEventListener('touchend', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Prevent event bubbling
                sendWhatsAppMessage();
            });
            
            // Function to handle WhatsApp message sending
            function sendWhatsAppMessage() {
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
                    
                    // Format the product name
                    const productName = product === 'Other' ? otherProduct : product;
                    
                    // Create WhatsApp message text with all form fields
                    const messageText = `*New Inquiry from WatFix Chemicals Website*

*Name:* ${name}
*Company:* ${company}
*Email:* ${email}
*Phone:* ${phone}
*Product Interest:* ${productName}
*Quantity:* ${quantity || 'Not specified'}
*Purchase Frequency:* ${frequency || 'Not specified'}

*Additional Requirements:*
${message}`;

                    // Properly encode the message for URL - use shorter segments for mobile compatibility
                    const encodedText = encodeURIComponent(messageText);
                    
                    // Create WhatsApp URL with the phone number and message
                    const whatsappUrl = `https://wa.me/918076419279?text=${encodedText}`;
                    
                    // Log the URL for debugging
                    console.log("WhatsApp URL:", whatsappUrl);
                    
                    // For mobile devices, use a timeout to ensure the redirect works properly
                    setTimeout(function() {
                        window.location.href = whatsappUrl;
                    }, 300);
                } else {
                    // Scroll to the first error
                    const firstError = document.querySelector('.error-message:not(:empty)');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }
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
    }
    
    // Event listener for product links
    const productLinks = document.querySelectorAll('.learn-more[href^="#modal-"]');
    if (productLinks.length > 0) {
        productLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const modalId = this.getAttribute('href').substring(1); // Remove the # from href
                console.log("Link clicked for modal:", modalId);
                openModal(modalId);
            });
            
            // Add touchend event for mobile devices
            link.addEventListener('touchend', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Prevent event bubbling
                const modalId = this.getAttribute('href').substring(1); // Remove the # from href
                console.log("Touch event for modal:", modalId);
                openModal(modalId);
            });
        });
    } else {
        console.error("No product links found with class 'learn-more'");
    }
    
    // Enhanced modal functionality for cross-platform compatibility
    const modalContainer = document.getElementById('modalContainer');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    // Function to open modal with platform-specific optimizations
    function openModal(modalId) {
        console.log("Opening modal:", modalId);
        
        // Platform detection
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        const isAndroid = /Android/.test(navigator.userAgent);
        
        // Store scroll position
        const scrollY = window.scrollY;
        
        // Add active class to container
        modalContainer.classList.add('active');
        
        // Platform-specific body handling
        document.body.style.top = `-${scrollY}px`;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        
        // Additional iOS fixes
        if (isIOS) {
            document.body.style.height = '100%';
            document.body.style.touchAction = 'none';
        }
        
        // Hide all modals first
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        
        // Show the selected modal
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            
            // Focus management for accessibility
            setTimeout(() => {
                const closeButton = modal.querySelector('.modal-close');
                if (closeButton) {
                    closeButton.focus();
                }
            }, 100);
            
            // Prevent background interaction
            modal.setAttribute('aria-hidden', 'false');
            document.querySelectorAll('body > *:not(#modalContainer)').forEach(element => {
                if (element.getAttribute('aria-hidden') !== 'true') {
                    element.setAttribute('aria-hidden', 'true');
                    element.setAttribute('data-modal-hidden', 'true');
                }
            });
        } else {
            console.error("Modal not found:", modalId);
        }
    }
    
    // Function to close all modals with platform-specific cleanup
    function closeModals() {
        // Platform detection
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        // Remove active class from container
        modalContainer.classList.remove('active');
        
        // Restore scroll position
        const scrollY = parseInt(document.body.style.top || '0') * -1;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        
        // Additional iOS cleanup
        if (isIOS) {
            document.body.style.height = '';
            document.body.style.touchAction = '';
        }
        
        // Smooth scroll restoration
        setTimeout(() => {
            window.scrollTo({
                top: scrollY,
                behavior: 'auto'
            });
        }, 0);
        
        // Hide all modals
        modals.forEach(modal => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        });
        
        // Restore accessibility attributes
        document.querySelectorAll('[data-modal-hidden="true"]').forEach(element => {
            element.removeAttribute('aria-hidden');
            element.removeAttribute('data-modal-hidden');
        });
    }
    
    // Event listener for close buttons
    if (closeButtons.length > 0) {
        closeButtons.forEach(button => {
            button.addEventListener('click', closeModals);
        });
    }
    
    // Close modal when clicking on overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModals);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
            closeModals();
        }
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

    // Cross-platform optimizations
    // Fix for iOS hover states
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    // Detect platform for specific optimizations
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);
    const isMobile = isIOS || isAndroid || window.innerWidth < 768;
    
    // Apply platform-specific classes to body
    if (isIOS) document.body.classList.add('ios-device');
    if (isAndroid) document.body.classList.add('android-device');
    if (isMobile) document.body.classList.add('mobile-device');
    
    // Optimize all external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        // Open external links in new tab
        if (!link.getAttribute('href').includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
        
        // Add touch feedback for mobile
        if (isMobile) {
            link.addEventListener('touchstart', function() {
                this.classList.add('active-touch');
            }, {passive: true});
            
            link.addEventListener('touchend', function() {
                this.classList.remove('active-touch');
            }, {passive: true});
        }
    });
    
    // Fix for double-tap issue on iOS
    if (isIOS) {
        const clickableElements = document.querySelectorAll('button, .btn, .learn-more, a');
        clickableElements.forEach(element => {
            element.addEventListener('touchend', function(e) {
                e.preventDefault();
                // Small delay to prevent double actions
                setTimeout(() => {
                    if (element.href) {
                        if (element.getAttribute('target') === '_blank') {
                            window.open(element.href, '_blank');
                        } else {
                            window.location.href = element.href;
                        }
                    } else if (typeof element.click === 'function') {
                        element.click();
                    }
                }, 10);
            }, {passive: false});
        });
    }
    
    // Optimize form elements for mobile
    if (isMobile) {
        const formElements = document.querySelectorAll('input, select, textarea');
        formElements.forEach(element => {
            // Prevent zoom on iOS
            if (isIOS && (element.type === 'text' || element.type === 'email' || element.type === 'tel' || element.tagName === 'TEXTAREA')) {
                element.style.fontSize = '16px';
            }
            
            // Add better focus handling
            element.addEventListener('focus', function() {
                this.parentElement.classList.add('input-focused');
            });
            
            element.addEventListener('blur', function() {
                this.parentElement.classList.remove('input-focused');
            });
        });
    }
    
    // Fix for sticky hover effects on mobile
    if (isMobile) {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
            @media (hover: none) {
                .btn:hover, .learn-more:hover, a:hover {
                    opacity: 1;
                    transform: none;
                }
            }
        `;
        document.head.appendChild(styleElement);
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

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
