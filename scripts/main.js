//Scroll Animation on different elements 
const mainObserver = new IntersectionObserver((entries) =>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("present");
            mainObserver.unobserve(entry.target)
        }
        else{
            entry.target.classList.remove("present");
        }
    })
});

const section = document.querySelectorAll('.section');
const Section = document.querySelectorAll('#section');
Section.forEach((el) => mainObserver.observe(el));
section.forEach((el) => mainObserver.observe(el));
//Scroll animations end here considering the classes and ids .

// Hamburger Menu Toggle
// const hamburger = document.querySelector('.hamburger');
// const navMenu = document.querySelector('.nav-menu');

// hamburger.addEventListener('click', () => {
//   const isVisible = navMenu.style.display === 'flex';
//   navMenu.style.display = isVisible ? 'none' : 'flex';
// })

// form 
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault(); // Prevent default form submission

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: result.message || 'Message sent successfully!'
                    });
                    form.reset();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: result.error || 'Failed to send message.'
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred. Please try again.'
                });
            }
        });
    }
});

// Scroll-triggered animations for Why Choose Us cards
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('card-visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all blog cards
document.addEventListener('DOMContentLoaded', () => {
    const blogCards = document.querySelectorAll('.blogCard');
    blogCards.forEach(card => {
        cardObserver.observe(card);
    });
});

// Animated Counter for Statistics
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// Observer for statistics counters
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('counted')) {
                statNumber.classList.add('counted');
                animateCounter(statNumber);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

// Observe stat boxes
document.addEventListener('DOMContentLoaded', () => {
    const statBoxes = document.querySelectorAll('.stat-box');
    statBoxes.forEach(box => {
        statsObserver.observe(box);
    });
});

// Progress bars animation on card flip
document.addEventListener('DOMContentLoaded', () => {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const progressFills = card.querySelectorAll('.progress-fill');
            progressFills.forEach(fill => {
                const width = fill.getAttribute('data-width');
                fill.style.setProperty('--width', width + '%');
                setTimeout(() => {
                    fill.style.width = width + '%';
                }, 100);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const progressFills = card.querySelectorAll('.progress-fill');
            progressFills.forEach(fill => {
                fill.style.width = '0';
            });
        });
    });
});

// Mobile Touch/Swipe Interactions for Cards
document.addEventListener('DOMContentLoaded', () => {
    // Horizontal scroll removed - cards now stack vertically on mobile
    /*
    const cardsContainer = document.querySelector('.BlogCards');
    if (!cardsContainer) return;
    
    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;
    
    // Touch events for mobile swipe
    cardsContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - cardsContainer.offsetLeft;
        scrollLeft = cardsContainer.scrollLeft;
    }, { passive: true });
    
    cardsContainer.addEventListener('touchmove', (e) => {
        if (!startX) return;
        const x = e.touches[0].pageX - cardsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        cardsContainer.scrollLeft = scrollLeft - walk;
    }, { passive: true });
    
    cardsContainer.addEventListener('touchend', () => {
        startX = 0;
    });
    
    // Mouse events for desktop drag (optional)
    cardsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        cardsContainer.style.cursor = 'grabbing';
        startX = e.pageX - cardsContainer.offsetLeft;
        scrollLeft = cardsContainer.scrollLeft;
    });
    
    cardsContainer.addEventListener('mouseleave', () => {
        isDown = false;
        cardsContainer.style.cursor = 'grab';
    });
    
    cardsContainer.addEventListener('mouseup', () => {
        isDown = false;
        cardsContainer.style.cursor = 'grab';
    });
    
    cardsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - cardsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        cardsContainer.scrollLeft = scrollLeft - walk;
    });
    */
});

// Mobile: Tap to flip cards
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 768) {
        const flipCards = document.querySelectorAll('.flip-card');
        
        flipCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Toggle flipped class for mobile tap
                this.classList.toggle('mobile-flipped');
                
                // Trigger progress bar animation if flipped
                if (this.classList.contains('mobile-flipped')) {
                    const progressFills = this.querySelectorAll('.progress-fill');
                    progressFills.forEach(fill => {
                        const width = fill.getAttribute('data-width');
                        setTimeout(() => {
                            fill.style.width = width + '%';
                        }, 300);
                    });
                } else {
                    const progressFills = this.querySelectorAll('.progress-fill');
                    progressFills.forEach(fill => {
                        fill.style.width = '0';
                    });
                }
            });
        });
    }
});