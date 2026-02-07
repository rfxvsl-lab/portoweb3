// ===================================
// VISUAL DESIGNER PORTFOLIO - JavaScript
// ===================================

// ===================================
// 1. MOBILE MENU FUNCTIONALITY
// ===================================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('[data-mobile-menu-btn]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    if (!mobileMenuBtn || !mobileMenu) return;

    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Close menu when scrolling
    window.addEventListener('scroll', () => {
        mobileMenu.classList.add('hidden');
    });
}

// ===================================
// 2. SMOOTH SCROLLING WITH OFFSET
// ===================================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// 3. ACTIVE NAV LINK HIGHLIGHTING
// ===================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('[id]');
    const navLinks = document.querySelectorAll('a[href^="#"]');

    const highlightActiveLink = () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active-link');
            }
        });
    };

    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink(); // Call on load
}

// ===================================
// 4. FORM HANDLING
// ===================================
function initFormHandling() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = form.querySelector('input[type="text"]');
            const emailInput = form.querySelector('input[type="email"]');

            // Simple validation
            if (!nameInput.value.trim() || !emailInput.value.trim()) {
                alert('Please fill in all fields');
                return;
            }

            if (!emailInput.value.includes('@')) {
                alert('Please enter a valid email');
                return;
            }

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                background-color: #009379;
                color: white;
                padding: 15px;
                border-radius: 4px;
                margin-top: 10px;
                text-align: center;
            `;
            successMessage.textContent = '✓ Message sent successfully!';
            
            form.appendChild(successMessage);
            form.reset();

            setTimeout(() => {
                successMessage.remove();
            }, 4000);
        });
    });
}

// ===================================
// 5. SCROLL REVEAL ANIMATION
// ===================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.skill-card, .work-card, .testimonial-card');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-reveal');
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(element => {
            element.style.animation = 'fadeInUp 0.6s ease forwards';
        });
    }
}

// ===================================
// 6. PORTFOLIO FILTERING
// ===================================
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('[data-filter-btn]');
    const portfolioItems = document.querySelectorAll('[data-category]');

    if (!filterButtons.length || !portfolioItems.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter-btn');

            // Update active button styling
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            button.classList.add('active');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    // Show item with fade animation
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    // Hide item
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ===================================
// 7. INITIALIZE ALL FUNCTIONS
// ===================================
function initAll() {
    initMobileMenu();
    initSmoothScroll();
    initActiveNavLink();
    initFormHandling();
    initScrollReveal();
    initPortfolioFilter();
    
    console.log('✓ All functions initialized successfully');
}

// ===================================
// 8. RUN ON PAGE LOAD
// ===================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}
