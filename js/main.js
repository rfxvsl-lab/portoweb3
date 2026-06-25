// ==========================================================================
// VISUAL DESIGNER PORTFOLIO - Premium JavaScript Interactions
// ==========================================================================

// 1. MOBILE MENU FUNCTIONALITY
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('[data-mobile-menu-btn]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
        
        // Dynamic burger/close animation
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenuBtn.innerHTML = '☰';
        } else {
            mobileMenuBtn.innerHTML = '✕';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = '☰';
        });
    });

    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = '☰';
        }
    });

    window.addEventListener('scroll', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = '☰';
    }, { passive: true });
}

// 2. SMOOTH SCROLLING WITH OFFSET
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 90;
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

// 3. NAVIGATION STYLE CHANGE ON SCROLL & ACTIVE LINK HIGHLIGHTING
function initNavigationEffects() {
    const nav = document.querySelector('.navigation');
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.menu-items a, [data-mobile-menu] a');

    const handleScrollEffects = () => {
        // Toggle Scrolled Nav Class
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 160;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href').slice(1) === currentSectionId) {
                link.classList.add('active-link');
            }
        });
    };

    window.addEventListener('scroll', handleScrollEffects, { passive: true });
    handleScrollEffects(); // Call on load
}

// 4. INTERACTIVE FORM HANDLING (Anti-Iframe blocks & gorgeous feed)
function initFormHandling() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear any existing alert-box first
            const existingAlert = form.querySelector('.alert-box');
            if (existingAlert) existingAlert.remove();

            const nameInput = form.querySelector('input[type="text"]');
            const emailInput = form.querySelector('input[type="email"]');
            
            const alertContainer = document.createElement('div');
            alertContainer.className = 'alert-box';

            // Custom Inline Form Validation
            if (!nameInput.value.trim() || !emailInput.value.trim()) {
                alertContainer.classList.add('alert-error');
                alertContainer.innerHTML = '✕ Silakan isi semua kolom.';
                form.appendChild(alertContainer);
                return;
            }

            if (!emailInput.value.includes('@')) {
                alertContainer.classList.add('alert-error');
                alertContainer.innerHTML = '✕ Silakan masukkan email yang valid.';
                form.appendChild(alertContainer);
                return;
            }

            // Mock submit success
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Mengirim...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                alertContainer.classList.add('alert-success');
                alertContainer.innerHTML = '✓ Pesan Anda berhasil dikirim!';
                form.appendChild(alertContainer);
                form.reset();

                setTimeout(() => {
                    alertContainer.style.opacity = '0';
                    alertContainer.style.transition = 'opacity 0.4s ease';
                    setTimeout(() => alertContainer.remove(), 400);
                }, 4000);
            }, 1000);
        });
    });
}

// 5. SCROLL REVEAL ANIMATIONS
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.skill-card, .work-card, .testimonial-card, .logo-bar, .contact-left, .contact-form');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(24px)';
            observer.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
}

// 6. PORTFOLIO FILTERING WITH DELIGHTFUL TRANSITIONS
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('[data-filter-btn]');
    const portfolioItems = document.querySelectorAll('[data-category]');

    if (!filterButtons.length || !portfolioItems.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter-btn');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.display = 'flex';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                        item.style.transition = 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                    }, 20);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    item.style.transition = 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// 7. INITIALIZE ALL
function initAll() {
    initMobileMenu();
    initSmoothScroll();
    initNavigationEffects();
    initFormHandling();
    initScrollReveal();
    initPortfolioFilter();
    
    console.log('✓ All premium portfolio interactions initialized successfully');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    initAll();
}
