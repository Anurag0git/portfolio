// Modern Professional Portfolio JavaScript
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupNavigation();
        this.setupScrollProgress();
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
        this.setupTypingEffect();
        this.setupHoverEffects();
        this.setupScrollAnimations();
    }

    // Smooth scrolling for navigation links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Navigation active state with smooth transitions
    setupNavigation() {
        const sections = document.querySelectorAll('.section, .hero');
        const navLinks = document.querySelectorAll('.nav-links a');
        const nav = document.querySelector('nav');
        
        const updateActiveNav = () => {
            let current = '';
            const scrollPosition = window.scrollY + 100;
            
            // Add scrolled class to nav
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', this.throttle(updateActiveNav, 100));
        updateActiveNav(); // Initial call
    }

    // Enhanced scroll progress indicator
    setupScrollProgress() {
        const scrollProgress = document.querySelector('.scroll-progress');
        
        const updateScrollProgress = () => {
            const scrollTop = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.min((scrollTop / documentHeight) * 100, 100);
            
            scrollProgress.style.width = `${scrollPercent}%`;
        };

        window.addEventListener('scroll', this.throttle(updateScrollProgress, 16));
    }

    // Advanced intersection observer for animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    
                    // Stagger child animations
                    const children = entry.target.querySelectorAll('.stat-card, .experience-item, .project-card, .certificate-card, .skill-category');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '0';
                            child.style.transform = 'translateY(30px)';
                            child.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                            
                            requestAnimationFrame(() => {
                                child.style.opacity = '1';
                                child.style.transform = 'translateY(0)';
                            });
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }

    // Subtle parallax effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero, .certificates-section');
        
        const handleParallax = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };

        window.addEventListener('scroll', this.throttle(handleParallax, 16));
    }

    // Typing effect for hero title
    setupTypingEffect() {
        const heroTitle = document.querySelector('.hero-content h1');
        if (!heroTitle) return;

        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        // Start typing effect after initial animation
        setTimeout(typeWriter, 1000);
    }

    // Enhanced hover effects
    setupHoverEffects() {
        // Card hover effects with depth
        const cards = document.querySelectorAll('.stat-card, .project-card, .certificate-card, .skill-category');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                card.style.transform = 'translateY(-8px)';
                card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
            });

            card.addEventListener('mouseleave', (e) => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.cta-button, .resume-button, .contact-link');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                button.style.transform = 'translateY(-3px)';
            });

            button.addEventListener('mouseleave', (e) => {
                button.style.transform = 'translateY(0)';
            });
        });
    }

    // Scroll-triggered animations
    setupScrollAnimations() {
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.fade-in');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('animate');
                }
            });
        };

        window.addEventListener('scroll', this.throttle(animateOnScroll, 16));
        animateOnScroll(); // Initial call
    }

    // Utility function for throttling
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Debounce utility
    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}

// Enhanced loading animations
class LoadingAnimations {
    constructor() {
        this.setupPageLoad();
    }

    setupPageLoad() {
        // Hide loading screen when page is ready
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Animate hero elements sequentially
            const heroElements = document.querySelectorAll('.hero-content > *');
            heroElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 200);
            });
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
    new LoadingAnimations();
    
    // Add CSS for loading states
    const style = document.createElement('style');
    style.textContent = `
        .hero-content > * {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        body.loaded .hero-content > * {
            opacity: 1;
            transform: translateY(0);
        }
        
        .animate {
            animation: slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization: Use requestAnimationFrame for smooth animations
const smoothScroll = (target, duration = 1000) => {
    const targetPosition = target.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}; 