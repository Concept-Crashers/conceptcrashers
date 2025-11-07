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

// ========================================
// Gallery Filter Functionality
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMoreBtn = document.querySelector('.load-more-btn');

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    // Show item with staggered animation
                    setTimeout(() => {
                        item.classList.remove('hide');
                        item.style.animation = 'fadeInUp 0.5s ease forwards';
                    }, index * 50);
                } else {
                    // Hide item
                    item.classList.add('hide');
                }
            });
        });
    });

    // Load more functionality (placeholder - can be enhanced with actual pagination)
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Add your load more logic here
            const isMobile = window.innerWidth <= 768;
            Swal.fire({
                title: 'Coming Soon!',
                text: 'More gallery items will be loaded here.',
                icon: 'info',
                confirmButtonColor: '#9062f0',
                width: isMobile ? '90%' : '400px',
                padding: isMobile ? '1.5em' : '2em',
                background: '#1a1a2e',
                color: '#fff',
                confirmButtonText: 'Got it!',
                customClass: {
                    popup: 'mobile-friendly-popup',
                    title: 'mobile-friendly-title',
                    confirmButton: 'mobile-friendly-button'
                }
            });
        });
    }

    // View button functionality
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const galleryItem = btn.closest('.gallery-item');
            const img = galleryItem.querySelector('img');
            const title = galleryItem.querySelector('.gallery-info h3').textContent;
            const description = galleryItem.querySelector('.gallery-info p').textContent;

            // Detect if mobile device
            const isMobile = window.innerWidth <= 768;

            // Show image in modal using SweetAlert with responsive settings
            Swal.fire({
                title: title,
                text: description,
                imageUrl: img.src,
                imageAlt: title,
                confirmButtonColor: '#9062f0',
                width: isMobile ? '95%' : '800px',
                padding: isMobile ? '1em' : '2em',
                background: '#1a1a2e',
                color: '#fff',
                confirmButtonText: 'Close',
                customClass: {
                    popup: 'mobile-friendly-popup',
                    image: 'mobile-friendly-image',
                    title: 'mobile-friendly-title',
                    htmlContainer: 'mobile-friendly-text',
                    confirmButton: 'mobile-friendly-button'
                },
                imageWidth: isMobile ? '100%' : 600,
                imageHeight: isMobile ? 'auto' : 400
            });
        });
    });
});

// Add fade in up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
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

// ========================================
// Mobile Bottom Navigation Active State
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  const mobileBottomNav = document.getElementById('mobileBottomNav');
  if (!mobileBottomNav) return;

  const navItems = mobileBottomNav.querySelectorAll('.mobile-bottom-nav-item');
  const sections = document.querySelectorAll('section[id]');

  // Handle click on nav items
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      // Remove active class from all items
      navItems.forEach(navItem => navItem.classList.remove('active'));
      // Add active class to clicked item
      this.classList.add('active');
    });
  });

  // Update active state on scroll
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-20% 0px -70% 0px'
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        
        // Remove active class from all nav items
        navItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to corresponding nav item
        const activeNavItem = mobileBottomNav.querySelector(`a[href="#${sectionId}"]`);
        if (activeNavItem) {
          activeNavItem.classList.add('active');
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  // Observe all sections
  sections.forEach(section => observer.observe(section));
});