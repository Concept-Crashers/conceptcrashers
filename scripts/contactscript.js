// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('#main-nav');
    const navLinks = document.querySelectorAll('nav a');
    
    // Toggle navigation on button click
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        
        // Update aria-expanded for accessibility
        const isExpanded = nav.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
        
        // Change icon
        const icon = navToggle.querySelector('i');
        if (isExpanded) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close navigation when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Close navigation when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
            nav.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            nav.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Smooth scrolling for anchor links (if any are added later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form enhancement
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Basic validation
            const requiredFields = ['firstName', 'lastName', 'email', 'message'];
            const emptyFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
            
            if (emptyFields.length > 0) {
                alert('Please fill in all required fields: ' + emptyFields.join(', '));
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // If validation passes, you can handle form submission here
            console.log('Form data:', data);
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            form.reset();
        });
    }
});