// Main JavaScript file for WatFix Chemicals website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Make entire product card clickable - FIXED FOR MOBILE
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(function(card) {
        // Find the associated detail link and modal ID
        const detailLink = card.querySelector('.learn-more');
        if (detailLink) {
            const modalId = detailLink.getAttribute('href');
            
            // Click event for desktop
            card.addEventListener('click', function(e) {
                // Don't open modal if clicking on the learn-more button (it has its own handler)
                if (!e.target.closest('.learn-more')) {
                    e.preventDefault();
                    console.log("Card clicked, opening modal:", modalId);
                    openModal(modalId);
                }
            });
            
            // Touch event for mobile - FIXED
            card.addEventListener('touchstart', function(e) {
                // Store the touch position for later comparison
                this.touchStartX = e.touches[0].clientX;
                this.touchStartY = e.touches[0].clientY;
            }, { passive: true });
            
            card.addEventListener('touchend', function(e) {
                // Don't open modal if touching the learn-more button (it has its own handler)
                if (e.target.closest('.learn-more')) {
                    return; // Let the button handle it
                }
                
                // Check if this was a tap (not a scroll)
                if (this.touchStartX && this.touchStartY) {
                    const touchEndX = e.changedTouches[0].clientX;
                    const touchEndY = e.changedTouches[0].clientY;
                    
                    // Calculate distance moved
                    const distX = Math.abs(touchEndX - this.touchStartX);
                    const distY = Math.abs(touchEndY - this.touchStartY);
                    
                    // If it's a tap (minimal movement), open the modal
                    if (distX < 10 && distY < 10) {
                        e.preventDefault();
                        console.log("Card tapped on mobile, opening modal:", modalId);
                        openModal(modalId);
                    }
                }
            });
            
            // Add cursor pointer to indicate clickable
            card.style.cursor = 'pointer';
        }
    });

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
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

    // Event listener for product links - FIXED FOR MOBILE
    const detailLinks = document.querySelectorAll('.learn-more[href^="#modal-"]');
    if (detailLinks.length > 0) {
        detailLinks.forEach(link => {
            const modalId = link.getAttribute('href');
            
            // Click event for desktop
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Prevent triggering parent card's click
                console.log("Detail button clicked, opening modal:", modalId);
                openModal(modalId);
            });
            
            // Touch events for mobile - FIXED
            link.addEventListener('touchstart', function(e) {
                // Store the touch position for later comparison
                this.touchStartX = e.touches[0].clientX;
                this.touchStartY = e.touches[0].clientY;
            }, { passive: true });
            
            link.addEventListener('touchend', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Prevent triggering parent card's click
                
                // Check if this was a tap (not a scroll)
                if (this.touchStartX && this.touchStartY) {
                    const touchEndX = e.changedTouches[0].clientX;
                    const touchEndY = e.changedTouches[0].clientY;
                    
                    // Calculate distance moved
                    const distX = Math.abs(touchEndX - this.touchStartX);
                    const distY = Math.abs(touchEndY - this.touchStartY);
                    
                    // If it's a tap (minimal movement), open the modal
                    if (distX < 10 && distY < 10) {
                        console.log("Detail button tapped on mobile, opening modal:", modalId);
                        openModal(modalId);
                    }
                }
            });
        });
    } else {
        console.error("No product links found with class 'learn-more'");
    }

    // Product Inquiry Form Handling - FIXED VALIDATION AND WHATSAPP SUBMISSION
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
            // Click event for desktop
            whatsappBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log("WhatsApp button clicked");
                sendWhatsAppMessage();
            });

            // Touch events for mobile - FIXED
            whatsappBtn.addEventListener('touchstart', function(e) {
                // Store the touch position for later comparison
                this.touchStartX = e.touches[0].clientX;
                this.touchStartY = e.touches[0].clientY;
            }, { passive: true });
            
            whatsappBtn.addEventListener('touchend', function(e) {
                e.preventDefault();
                
                // Check if this was a tap (not a scroll)
                if (this.touchStartX && this.touchStartY) {
                    const touchEndX = e.changedTouches[0].clientX;
                    const touchEndY = e.changedTouches[0].clientY;
                    
                    // Calculate distance moved
                    const distX = Math.abs(touchEndX - this.touchStartX);
                    const distY = Math.abs(touchEndY - this.touchStartY);
                    
                    // If it's a tap (minimal movement), process the form
                    if (distX < 10 && distY < 10) {
                        console.log("WhatsApp button tapped on mobile");
                        sendWhatsAppMessage();
                    }
                }
            });

            // Function to handle WhatsApp message sending - IMPROVED VALIDATION
            function sendWhatsAppMessage() {
                console.log("Processing WhatsApp form submission");
                
                // Clear previous error messages
                const errorElements = document.querySelectorAll('.error-message');
                errorElements.forEach(element => {
                    element.textContent = '';
                    element.style.display = 'none';
                });
                
                // Reset form field highlighting
                const formFields = inquiryForm.querySelectorAll('input, select, textarea');
                formFields.forEach(field => {
                    field.classList.remove('error-field');
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
                
                // Helper function to show error
                function showError(fieldId, message) {
                    const errorElement = document.getElementById(fieldId + '-error');
                    if (errorElement) {
                        errorElement.textContent = message;
                        errorElement.style.display = 'block';
                    }
                    
                    const field = document.getElementById(fieldId);
                    if (field) {
                        field.classList.add('error-field');
                        field.focus();
                    }
                    
                    isValid = false;
                }

                if (name === '') {
                    showError('name', 'Please enter your name');
                }

                if (company === '') {
                    showError('company', 'Please enter your company name');
                }

                if (email === '') {
                    showError('email', 'Please enter your email');
                } else if (!isValidEmail(email)) {
                    showError('email', 'Please enter a valid email');
                }

                if (phone === '') {
                    showError('phone', 'Please enter your phone number');
                }

                if (product === '') {
                    showError('product', 'Please select a product');
                }

                if (product === 'Other' && otherProduct === '') {
                    showError('otherProduct', 'Please provide product details');
                }

                if (message === '') {
                    showError('message', 'Please enter your message');
                }

                // If form is valid, redirect to WhatsApp
                if (isValid) {
                    console.log("Form is valid, preparing WhatsApp message");
                    
                    // Get additional form values
                    const quantity = document.getElementById('quantity').value;
                    const frequency = document.getElementById('frequency').value;

                    // Format the product name
                    const productName = product === 'Other' ? otherProduct : product;

                    // Create WhatsApp message text with all form fields
                    const messageText = `*New Inquiry from WatFix Chemicals Website*

*Name:* ${name}
*Company:* ${company}
*Email:* ${email}
*Phone:* ${phone}
*Product:* ${productName}
*Quantity:* ${quantity}
*Frequency:* ${frequency}
*Message:* ${message}`;

                    // Properly encode the message for URL - use shorter segments for mobile compatibility
                    const encodedText = encodeURIComponent(messageText);

                    // Create WhatsApp URL with the phone number and message
                    const whatsappUrl = `https://wa.me/918076419279?text=${encodedText}`;

                    // Log the URL for debugging
                    console.log("WhatsApp URL:", whatsappUrl);
                    
                    // Show loading indicator
                    const loadingIndicator = document.createElement('div');
                    loadingIndicator.className = 'loading-indicator';
                    loadingIndicator.innerHTML = '<span>Redirecting to WhatsApp...</span>';
                    document.body.appendChild(loadingIndicator);

                    // For mobile devices, use a timeout to ensure the redirect works properly
                    setTimeout(function() {
                        // Remove loading indicator
                        document.body.removeChild(loadingIndicator);
                        
                        // Redirect to WhatsApp
                        window.location.href = whatsappUrl;
                    }, 500);
                } else {
                    console.log("Form validation failed");
                    
                    // Scroll to the first error
                    const firstError = document.querySelector('.error-field');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }
        }
        
        // Pre-fill product dropdown if coming from a product section
        const detailButtons = document.querySelectorAll('.product-card .learn-more');

        detailButtons.forEach(button => {
            button.addEventListener('click', function(e) {
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
    const learnMoreButtons = document.querySelectorAll('.learn-more[href^="#modal-"]');
    if (learnMoreButtons.length > 0) {
        learnMoreButtons.forEach(link => {
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

        // Find and activate the specific modal
        const targetModal = document.querySelector(modalId);
        if (targetModal) {
            targetModal.classList.add('active');

            // Set focus to the modal for accessibility
            targetModal.setAttribute('tabindex', '-1');
            targetModal.focus();

            // Apply platform-specific fixes
            if (isIOS) {
                // iOS-specific fixes
                targetModal.style.webkitOverflowScrolling = 'touch';
            }

            if (isAndroid) {
                // Android-specific fixes
                targetModal.style.overscrollBehavior = 'contain';
            }
        } else {
            console.error("Modal not found:", modalId);
        }
    }

    // Function to close all modals with platform-specific cleanup
    function closeModals() {
        // Remove active class from container
        modalContainer.classList.remove('active');

        // Remove active class from all modals
        modals.forEach(function(modal) {
            modal.classList.remove('active');
        });

        // Restore body scroll
        const scrollY = parseInt(document.body.style.top || '0', 10) * -1;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
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

    // Open modal when clicking on learn more links
    const learnMoreLinks = document.querySelectorAll('.learn-more');

    learnMoreLinks.forEach(function(link) {
        const modalId = link.getAttribute('href');

        // Click event for desktop
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling
            openModal(modalId);
        });

        // Touch event for mobile
        link.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling
            openModal(modalId);
        });
    });

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

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
