// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100,
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

    // Active Navigation Links
    const sections = document.querySelectorAll('section');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Form Submission
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const formElements = quoteForm.elements;
            let isValid = true;
            
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value) {
                    isValid = false;
                    formElements[i].style.borderColor = 'red';
                } else {
                    formElements[i].style.borderColor = '';
                }
            }
            
            if (isValid) {
                // Show success message
                const formContainer = quoteForm.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your request has been submitted successfully! We will contact you soon.';
                
                // Replace form with success message
                formContainer.innerHTML = '';
                formContainer.appendChild(successMessage);
                
                // In a real application, you would send the form data to a server here
                console.log('Form submitted successfully');
            }
        });
    }

    // Add water ripple effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', function(e) {
            const x = e.clientX;
            const y = e.clientY;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            hero.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 2000);
        });
    }

    // Add CSS for the ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: ripple 2s linear infinite;
            pointer-events: none;
        }
        
        @keyframes ripple {
            0% {
                width: 0;
                height: 0;
                opacity: 0.5;
            }
            100% {
                width: 500px;
                height: 500px;
                opacity: 0;
            }
        }
        
        .success-message {
            text-align: center;
            color: #28a745;
            padding: 20px;
            font-size: 1.2rem;
            animation: fadeIn 0.5s ease;
        }
        
        .success-message i {
            font-size: 3rem;
            display: block;
            margin-bottom: 10px;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Add parallax effect to sections
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Parallax for hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.backgroundPosition = `50% ${scrollPosition * 0.4}px`;
        }
        
        // Parallax for product icons
        const productIcons = document.querySelectorAll('.product-icon');
        productIcons.forEach(icon => {
            const rect = icon.getBoundingClientRect();
            const centerY = rect.top + rect.height / 2;
            const viewportHeight = window.innerHeight;
            const distanceFromCenter = centerY - viewportHeight / 2;
            
            icon.style.transform = `translateY(${distanceFromCenter * -0.03}px)`;
        });
    });

    // Add hover effect for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add typing effect to hero heading
    const heroHeading = document.querySelector('.hero-content h1');
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start the typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});
