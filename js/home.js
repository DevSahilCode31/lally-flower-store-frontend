// Home Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialCards.length > 0) {
        let currentIndex = 0;
        
        // Function to show a specific testimonial
        function showTestimonial(index) {
            // Hide all testimonials
            testimonialCards.forEach(card => {
                card.classList.remove('active');
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show the selected testimonial and activate its dot
            testimonialCards[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentIndex = index;
        }
        
        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                let nextIndex = currentIndex + 1;
                if (nextIndex >= testimonialCards.length) {
                    nextIndex = 0;
                }
                showTestimonial(nextIndex);
            });
        }
        
        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                let prevIndex = currentIndex - 1;
                if (prevIndex < 0) {
                    prevIndex = testimonialCards.length - 1;
                }
                showTestimonial(prevIndex);
            });
        }
        
        // Dot clicks
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showTestimonial(index);
            });
        });
        
        // Auto-rotate testimonials every 5 seconds
        let testimonialInterval = setInterval(function() {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= testimonialCards.length) {
                nextIndex = 0;
            }
            showTestimonial(nextIndex);
        }, 5000);
        
        // Stop auto-rotation when user interacts with slider
        const sliderControls = document.querySelector('.slider-controls');
        if (sliderControls) {
            sliderControls.addEventListener('mouseenter', function() {
                clearInterval(testimonialInterval);
            });
            
            sliderControls.addEventListener('mouseleave', function() {
                testimonialInterval = setInterval(function() {
                    let nextIndex = currentIndex + 1;
                    if (nextIndex >= testimonialCards.length) {
                        nextIndex = 0;
                    }
                    showTestimonial(nextIndex);
                }, 5000);
            });
        }
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('.categories, .products, .testimonials, .newsletter');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // If section is in viewport
            if (sectionTop < windowHeight * 0.75 && sectionBottom > 0) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    const sections = document.querySelectorAll('.categories, .products, .testimonials, .newsletter');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Debounce function to limit the rate at which a function can fire
    function debounce(func, delay = 250) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', debounce(animateOnScroll));
    
    // Product hover effect
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = 'var(--hover-shadow)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});
