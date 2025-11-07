
// // Ensure the DOM is fully loaded before running the script
// document.addEventListener("DOMContentLoaded", () => {
//     // Select all elements with the class 'counter-value'
//     const counterElements = document.querySelectorAll(".counter-value");

//     // Function to animate a single counter
//     const animateCounter = (entry) => {
//         // Get the counter element from the Intersection Observer entry
//         const counter = entry.target;

//         // Retrieve the target value and suffix from data attributes
//         const targetValue = parseInt(counter.dataset.target);
//         const suffix = counter.dataset.suffix || ""; // Default to empty string if no suffix
//         const duration = 2000; // Animation duration in milliseconds
//         let startTime = null; // To store the start time of the animation

//         // The animation loop function
//         const updateCounter = (currentTime) => {
//             if (!startTime) startTime = currentTime; // Set start time on first call
//             const progress = (currentTime - startTime) / duration; // Calculate animation progress

//             // If animation is complete or past duration
//             if (progress >= 1) {
//                 counter.textContent = targetValue + suffix; // Set final value
//                 return; // Stop the animation
//             }

//             // Calculate the current value based on progress
//             const currentValue = Math.min(
//                 targetValue,
//                 Math.ceil(progress * targetValue)
//             );
//             counter.textContent = currentValue + suffix; // Update text content

//             // Request the next animation frame
//             requestAnimationFrame(updateCounter);
//         };

//         // Start the animation
//         requestAnimationFrame(updateCounter);

//         // Disconnect the observer for this counter once it has animated
//         observer.unobserve(counter);
//     };

//     // Create an Intersection Observer instance
//     // This observer will trigger the animation when the counter elements become visible in the viewport
//     const observer = new IntersectionObserver(
//         (entries, observer) => {
//             entries.forEach((entry) => {
//                 // If the counter is intersecting (visible)
//                 if (entry.isIntersecting) {
//                     animateCounter(entry); // Animate it
//                 }
//             });
//         },
//         {
//             threshold: 0.5, // Trigger when 50% of the element is visible
//         }
//     );

//     // Observe each counter element
//     counterElements.forEach((counter) => {
//         observer.observe(counter);
//     });
// });


// document.addEventListener('DOMContentLoaded', () => {
//     const leftColumn = document.getElementById('left-column');
//     const rightColumn = document.getElementById('right-column');
//     const testimonialsContainer = document.querySelector('.testimonials-columns-container');

//     /**
//      * Calculates the required scroll distance for a column to animate its full content.
//      * It sets CSS custom properties on the column for use in CSS keyframes.
//      * @param {HTMLElement} column - The column element to calculate for.
//      */
//     function calculateAndSetScrollDistance(column) {
//         // Get the total scrollable height of the column's content
//         const contentHeight = column.scrollHeight;
//         // Get the visible height of the container that clips the column
//         const containerHeight = testimonialsContainer.clientHeight;

//         // Calculate the distance to scroll.
//         // If content is taller than container, calculate the overflow.
//         // If content is shorter, distance is 0 or a small offset to prevent issues.
//         let scrollDistance = contentHeight - containerHeight;

//         // Ensure scrollDistance is not negative (if content is shorter than container)
//         // We want to scroll only if there's actual overflow.
//         // For 'alternate' direction, the animation will go from 0 to -distance or +distance.
//         // So, if scrollDistance is 0 or negative, it means no actual scroll is needed.
//         // We'll set a minimum positive value to ensure some animation, or 0 if no scroll needed.
//         if (scrollDistance <= 0) {
//             scrollDistance = 0; // No scroll needed if content fits
//             // Optionally, you could set a small fixed scroll for visual effect even if content fits
//             // scrollDistance = 50; // Example: scroll 50px up/down
//         }

//         // Set CSS custom properties for the animation
//         // For scrollUp, 'to' state is negative translateY
//         column.style.setProperty('--scroll-distance-up', `-${scrollDistance}px`);
//         // For scrollDown, 'to' state is positive translateY
//         column.style.setProperty('--scroll-distance-down', `${scrollDistance}px`);

//         // Adjust animation duration based on scroll distance for consistent speed
//         // You can fine-tune the multiplier (e.g., 0.05) to control speed
//         const animationDuration = Math.max(20, scrollDistance * 0.05); // Minimum 20s, adjust speed
//         column.style.setProperty('--animation-duration', `${animationDuration}s`);

//         // If content fits, pause the animation
//         if (contentHeight <= containerHeight) {
//             column.style.animationPlayState = 'paused';
//         } else {
//             column.style.animationPlayState = 'running';
//         }
//     }

//     // Initial calculation and setting of distances
//     calculateAndSetScrollDistance(leftColumn);
//     calculateAndSetScrollDistance(rightColumn);

//     // Recalculate on window resize to ensure responsiveness
//     window.addEventListener('resize', () => {
//         calculateAndSetScrollDistance(leftColumn);
//         calculateAndSetScrollDistance(rightColumn);
//     });
// });


// document.addEventListener('DOMContentLoaded', () => {
//     const leftColumn = document.getElementById('left-column');
//     const rightColumn = document.getElementById('right-column');
//     const testimonialsContainer = document.querySelector('.testimonials-columns-container');

//     /**
//      * Calculates the required scroll distance for a column to animate its full content.
//      * It sets CSS custom properties on the column for use in CSS keyframes.
//      * @param {HTMLElement} column - The column element to calculate for.
//      * @param {string} direction - 'up' or 'down' to determine which scroll distance variable to set.
//      */
//     function calculateAndSetScrollDistance(column, direction) {
//         // Get the visible height of the container that clips the column
//         const containerHeight = testimonialsContainer.clientHeight;

//         // The desired scroll distance is 50% of the container's height
//         let scrollDistance = containerHeight / 2;

//         // Set CSS custom properties for the animation based on direction
//         if (direction === 'up') {
//             column.style.setProperty('--scroll-distance-up', `-${scrollDistance}px`);
//         } else if (direction === 'down') {
//             column.style.setProperty('--scroll-distance-down', `${scrollDistance}px`);
//         }

//         // Adjust animation duration based on the fixed scroll distance for consistent speed
//         // Using a base duration that scales with the container height, or a fixed value.
//         const animationDuration = Math.max(10, (scrollDistance) * 0.05); // Example: 0.05s per pixel of travel, min 10s
//         column.style.setProperty('--animation-duration', `${animationDuration}s`);

//         // Since the scroll distance is now fixed at 50% of container height,
//         // the animation should always run unless the container itself is tiny.
//         if (containerHeight > 0) { // Ensure container has height
//             column.style.animationPlayState = 'running';
//         } else {
//             column.style.animationPlayState = 'paused';
//         }
//     }

//     // Initial calculation and setting of distances for both columns
//     calculateAndSetScrollDistance(leftColumn, 'up');
//     calculateAndSetScrollDistance(rightColumn, 'down');

//     // Recalculate on window resize to ensure responsiveness
//     window.addEventListener('resize', () => {
//         calculateAndSetScrollDistance(leftColumn, 'up');
//         calculateAndSetScrollDistance(rightColumn, 'down');
//     });
// });



// // css preloader
// document.addEventListener('DOMContentLoaded', () => {
//     const preloader = document.getElementById('preloader');
//     const mainContent = document.getElementById('main-content');

//     // Function to hide the preloader and show content
//     function hidePreloader() {
//         // Add the 'hidden' class to preloader to trigger fade out
//         preloader.classList.add('hidden');

//         // After the transition, remove preloader from DOM and show main content
//         preloader.addEventListener('transitionend', () => {
//             preloader.style.display = 'none'; // Completely remove from layout
//             mainContent.classList.add('visible'); // Make main content visible
//             document.body.style.overflow = 'auto'; // Re-enable body scrolling
//         }, { once: true }); // Ensure the event listener runs only once
//     }

//     // Listen for the full page load (including images, stylesheets, etc.)
//     window.addEventListener('load', () => {
//         // Add a small delay (e.g., 500ms) to ensure the animation is seen
//         // and to prevent flickering on very fast loads.
//         setTimeout(hidePreloader, 2000);
//     });

//     // Fallback for cases where 'load' event might not fire as expected
//     // (e.g., very fast local loads, or if resources are cached)
//     // This ensures the preloader doesn't stay forever.
//     // You can adjust this timeout or remove it if 'load' is sufficient.
//     setTimeout(() => {
//         if (!preloader.classList.contains('hidden')) {
//             console.warn("Preloader force-hidden after timeout. 'load' event might not have fired.");
//             hidePreloader();
//         }
//     }, 2000); // Force hide after 5 seconds if not already hidden
// });


// //scroll animation back to top of the screen 
// const backToTopBtn = document.querySelector(".fab-button");

// // show and hide the button if the widow height is above 300;
// window.addEventListener("scroll", () => {
//     if (window.scrollY > window.innerHeight) {
//         backToTopBtn.classList.add("show");
//     } else {
//         backToTopBtn.classList.remove("show");
//     }
// });

// // scrool back to top
// backToTopBtn.addEventListener("click", () => {
//     window.scrollTo({
//         top: 0,
//         behavior: "smooth" //should be in quotes since its a string
//     });
//     console.log(" am clicked");
// });


// // Lazy loading with javascript
// const homeSection = document.getElementById("Home");
// const aboutSection = document.getElementById("About");
// const servicesSection = document.getElementById("Services");
// const processSection = document.getElementById("Process");
// const blogSection = document.getElementById("Blog");
// const teamSection = document.getElementById("Team");
// const contactSection = document.getElementById("Contact");
// const testimonialSection = document.getElementById("Testimonials");
// const footer = document.getElementById("footer");


// function callBackFunction(entries) {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             if (entry.target.id == "Home") {
//                 homeSection.classList.add("showImg");
//                 homeSection.classList.add("showonX");
//                 console.log("Home section!");
//             } else if (entry.target.id == "About") {
                
//                 console.log("About Section!");
//             } else if (entry.target.id == "Services") {
//                 servicesSection.classList.add("servAnimate")
//                 console.log("Services Section!");
//             }
//             else if (entry.target.id == "Blog") {
//                 console.log("Blog Section!");
//             }
//             else if (entry.target.id == "Team") {
//                 console.log("Team Section!");
//             }
//             else if (entry.target.id == "Process") {
//                 console.log("Process Section!");
//             }
//             else if (entry.target.id == "Contact") {
//                 console.log("Contact Section!");
//             }
//             else if (entry.target.id == "Testimonials") {
//                 console.log("Testimonials Section!");
//             }
//             else if (entry.target.id == "footer") {
//                 console.log("footer Section!");
//             }else if (entry.target.id == "activeItem") {
//                 console.log("an Item!");
//                 item.classList.add("animate");
//             }
//         }
//     })
// }

// const options = {
//     threshold: 0.1
// }

// const observer = new IntersectionObserver(callBackFunction, options);

// observer.observe(homeSection);
// observer.observe(aboutSection);
// observer.observe(servicesSection);
// observer.observe(processSection);
// observer.observe(blogSection);
// observer.observe(contactSection);
// observer.observe(testimonialSection);
// observer.observe(teamSection);
// observer.observe(footer);



// // Respnsive navbar for a mobile and other device navigation menu
// const menuBtn = document.getElementById("menuIcon");
// const navMenu = document.querySelector('.nav-menu');
// const navLinks = document.querySelectorAll('.nav-menu a'); // Select all links inside nav-menu

// menuBtn.addEventListener("click", () => {
//   // Animate icon
//   menuIcon.classList.add("animate");

//   // Toggle icon style correctly
//   if (menuIcon.classList.contains("fa-bars")) {
//     menuIcon.classList.remove("fa-bars");
//     menuIcon.classList.add("fa-times");
//     navMenu.style.display = 'flex'; // Show the menu
//   } else {
//     menuIcon.classList.remove("fa-times");
//     menuIcon.classList.add("fa-bars");
//     navMenu.style.display = 'none'; // Hide the menu
//   }

//   // Remove animation class after it finishes
//   setTimeout(() => {
//     menuIcon.classList.remove("animate");
//   }, 500);

//   console.log("I am clicked!");
// });

// // Hide navbar when a nav link is clicked
// navLinks.forEach(link => {
//   link.addEventListener('click', () => {
//     navMenu.style.display = 'none';
//     menuIcon.classList.remove("fa-times");
//     menuIcon.classList.add("fa-bars");
//   });
// });


// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Counter Animation
    const counterElements = document.querySelectorAll(".counter-value");
    if (counterElements.length) {
        const animateCounter = (entry) => {
            const counter = entry.target;
            const targetValue = parseInt(counter.dataset.target);
            const suffix = counter.dataset.suffix || "";
            const duration = 2000;
            let startTime = null;
            const updateCounter = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = (currentTime - startTime) / duration;
                if (progress >= 1) {
                    counter.textContent = targetValue + suffix;
                    return;
                }
                const currentValue = Math.min(targetValue, Math.ceil(progress * targetValue));
                counter.textContent = currentValue + suffix;
                requestAnimationFrame(updateCounter);
            };
            requestAnimationFrame(updateCounter);
            observer.unobserve(counter);
        };
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animateCounter(entry);
                    }
                });
            },
            { threshold: 0.5 }
        );
        counterElements.forEach((counter) => {
            observer.observe(counter);
        });
    }
});

// Testimonials Columns Animation (first version)
document.addEventListener('DOMContentLoaded', () => {
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');
    const testimonialsContainer = document.querySelector('.testimonials-columns-container');
    if (leftColumn && rightColumn && testimonialsContainer) {
        function calculateAndSetScrollDistance(column) {
            const contentHeight = column.scrollHeight;
            const containerHeight = testimonialsContainer.clientHeight;
            let scrollDistance = contentHeight - containerHeight;
            if (scrollDistance <= 0) scrollDistance = 0;
            column.style.setProperty('--scroll-distance-up', `-${scrollDistance}px`);
            column.style.setProperty('--scroll-distance-down', `${scrollDistance}px`);
            const animationDuration = Math.max(20, scrollDistance * 0.05);
            column.style.setProperty('--animation-duration', `${animationDuration}s`);
            column.style.animationPlayState = (contentHeight <= containerHeight) ? 'paused' : 'running';
        }
        calculateAndSetScrollDistance(leftColumn);
        calculateAndSetScrollDistance(rightColumn);
        window.addEventListener('resize', () => {
            calculateAndSetScrollDistance(leftColumn);
            calculateAndSetScrollDistance(rightColumn);
        });
    }
});

// Testimonials Columns Animation (second version)
document.addEventListener('DOMContentLoaded', () => {
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');
    const testimonialsContainer = document.querySelector('.testimonials-columns-container');
    if (leftColumn && rightColumn && testimonialsContainer) {
        function calculateAndSetScrollDistance(column, direction) {
            const containerHeight = testimonialsContainer.clientHeight;
            let scrollDistance = containerHeight / 2;
            if (direction === 'up') {
                column.style.setProperty('--scroll-distance-up', `-${scrollDistance}px`);
            } else if (direction === 'down') {
                column.style.setProperty('--scroll-distance-down', `${scrollDistance}px`);
            }
            const animationDuration = Math.max(10, (scrollDistance) * 0.05);
            column.style.setProperty('--animation-duration', `${animationDuration}s`);
            column.style.animationPlayState = (containerHeight > 0) ? 'running' : 'paused';
        }
        calculateAndSetScrollDistance(leftColumn, 'up');
        calculateAndSetScrollDistance(rightColumn, 'down');
        window.addEventListener('resize', () => {
            calculateAndSetScrollDistance(leftColumn, 'up');
            calculateAndSetScrollDistance(rightColumn, 'down');
        });
    }
});

// CSS Preloader
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    if (preloader && mainContent) {
        function hidePreloader() {
            preloader.classList.add('hidden');
            preloader.addEventListener('transitionend', () => {
                preloader.style.display = 'none';
                mainContent.classList.add('visible');
                document.body.style.overflow = 'auto';
            }, { once: true });
        }
        window.addEventListener('load', () => {
            setTimeout(hidePreloader, 2000);
        });
        setTimeout(() => {
            if (!preloader.classList.contains('hidden')) {
                console.warn("Preloader force-hidden after timeout. 'load' event might not have fired.");
                hidePreloader();
            }
        }, 2000);
    }
});

// Scroll animation back to top of the screen
const backToTopBtn = document.querySelector(".fab-button");
if (backToTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > window.innerHeight) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        console.log(" am clicked");
    });
}

// Lazy loading with javascript
const homeSection = document.getElementById("Home");
const aboutSection = document.getElementById("About");
const servicesSection = document.getElementById("Services");
const processSection = document.getElementById("Process");
const blogSection = document.getElementById("Blog");
const teamSection = document.getElementById("Team");
const contactSection = document.getElementById("Contact");
const testimonialSection = document.getElementById("Testimonials");
const footer = document.getElementById("footer");

function callBackFunction(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target.id == "Home" && homeSection) {
                homeSection.classList.add("showImg", "showonX");
                console.log("Home section!");
            } else if (entry.target.id == "About") {
                console.log("About Section!");
            } else if (entry.target.id == "Services" && servicesSection) {
                servicesSection.classList.add("servAnimate");
                console.log("Services Section!");
            } else if (entry.target.id == "Blog") {
                console.log("Blog Section!");
            } else if (entry.target.id == "Team") {
                console.log("Team Section!");
            } else if (entry.target.id == "Process") {
                console.log("Process Section!");
            } else if (entry.target.id == "Contact") {
                console.log("Contact Section!");
            } else if (entry.target.id == "Testimonials") {
                console.log("Testimonials Section!");
            } else if (entry.target.id == "footer") {
                console.log("footer Section!");
            } else if (entry.target.id == "activeItem") {
                console.log("an Item!");
                if (typeof item !== "undefined") item.classList.add("animate");
            }
        }
    });
}

const options = { threshold: 0.1 };
const observer = new IntersectionObserver(callBackFunction, options);

if (homeSection) observer.observe(homeSection);
if (aboutSection) observer.observe(aboutSection);
if (servicesSection) observer.observe(servicesSection);
if (processSection) observer.observe(processSection);
if (blogSection) observer.observe(blogSection);
if (contactSection) observer.observe(contactSection);
if (testimonialSection) observer.observe(testimonialSection);
if (teamSection) observer.observe(teamSection);
if (footer) observer.observe(footer);


// ========================================
// Mobile Navigation Toggle (Redesigned)
// ========================================
const menuIcon = document.getElementById("menuIcon");
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const closeNav = document.getElementById('closeNav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Open mobile menu
if (menuIcon) {
    menuIcon.addEventListener("click", () => {
        if (mobileNavOverlay) {
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        }
    });
}

// Close mobile menu
if (closeNav) {
    closeNav.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
}

// Close menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside the nav container
if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', (e) => {
        if (e.target === mobileNavOverlay) {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Team carousel initialization: Swipeable carousel for mobile
document.addEventListener('DOMContentLoaded', () => {
    try {
        const track = document.getElementById('teamTrack');
        if (!track) return;

        const container = track.parentElement;
        const cards = Array.from(track.children);
        const isMobile = window.innerWidth <= 991;

        if (isMobile) {
            // Mobile: Swipeable Carousel
            let currentIndex = 0;
            let startX = 0;
            let currentX = 0;
            let isDragging = false;
            let startTime = 0;

            // Create pagination dots
            const paginationContainer = document.createElement('div');
            paginationContainer.className = 'team-pagination';
            cards.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = `team-pagination-dot ${index === 0 ? 'active' : ''}`;
                dot.addEventListener('click', () => goToSlide(index));
                paginationContainer.appendChild(dot);
            });

            // Create swipe hint
            const swipeHint = document.createElement('div');
            swipeHint.className = 'team-swipe-hint';
            swipeHint.innerHTML = '<i class="fas fa-hand-pointer"></i> <span>Swipe to explore team members</span>';

            container.parentElement.appendChild(paginationContainer);
            container.parentElement.appendChild(swipeHint);

            // Hide swipe hint after 3 seconds
            setTimeout(() => {
                swipeHint.style.opacity = '0';
                setTimeout(() => swipeHint.remove(), 300);
            }, 3000);

            const updateDots = () => {
                const dots = paginationContainer.querySelectorAll('.team-pagination-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            };

            const getSlideWidth = () => {
                // Get computed style to get the actual gap value
                const trackStyles = window.getComputedStyle(track);
                const gap = parseInt(trackStyles.gap) || 20;
                
                // Get the actual card width from the first card
                const card = cards[0];
                const cardWidth = card.offsetWidth;
                
                // Return card width + gap for perfect positioning
                return cardWidth + gap;
            };

            const goToSlide = (index) => {
                currentIndex = Math.max(0, Math.min(index, cards.length - 1));
                const slideWidth = getSlideWidth();
                const offset = -currentIndex * slideWidth;
                track.style.transform = `translateX(${offset}px)`;
                updateDots();
            };

            // Touch events
            track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                currentX = startX;
                isDragging = true;
                startTime = Date.now();
                track.style.transition = 'none';
            });

            track.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                currentX = e.touches[0].clientX;
                const diff = currentX - startX;
                const slideWidth = getSlideWidth();
                const currentOffset = -currentIndex * slideWidth;
                track.style.transform = `translateX(${currentOffset + diff}px)`;
            });

            track.addEventListener('touchend', () => {
                if (!isDragging) return;
                isDragging = false;
                track.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

                const diff = currentX - startX;
                const swipeThreshold = 50;
                const timeDiff = Date.now() - startTime;
                const velocity = Math.abs(diff) / timeDiff;

                if (Math.abs(diff) > swipeThreshold || velocity > 0.3) {
                    if (diff > 0 && currentIndex > 0) {
                        goToSlide(currentIndex - 1);
                    } else if (diff < 0 && currentIndex < cards.length - 1) {
                        goToSlide(currentIndex + 1);
                    } else {
                        goToSlide(currentIndex);
                    }
                } else {
                    goToSlide(currentIndex);
                }
            });

            // Mouse events for desktop testing
            track.addEventListener('mousedown', (e) => {
                startX = e.clientX;
                currentX = startX;
                isDragging = true;
                startTime = Date.now();
                track.style.transition = 'none';
                e.preventDefault();
            });

            track.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                currentX = e.clientX;
                const diff = currentX - startX;
                const slideWidth = getSlideWidth();
                const currentOffset = -currentIndex * slideWidth;
                track.style.transform = `translateX(${currentOffset + diff}px)`;
            });

            track.addEventListener('mouseup', () => {
                if (!isDragging) return;
                isDragging = false;
                track.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

                const diff = currentX - startX;
                const swipeThreshold = 50;

                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0 && currentIndex > 0) {
                        goToSlide(currentIndex - 1);
                    } else if (diff < 0 && currentIndex < cards.length - 1) {
                        goToSlide(currentIndex + 1);
                    } else {
                        goToSlide(currentIndex);
                    }
                } else {
                    goToSlide(currentIndex);
                }
            });

            track.addEventListener('mouseleave', () => {
                if (isDragging) {
                    isDragging = false;
                    track.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    goToSlide(currentIndex);
                }
            });

            // Auto-advance every 5 seconds
            let autoAdvanceInterval = setInterval(() => {
                if (currentIndex < cards.length - 1) {
                    goToSlide(currentIndex + 1);
                } else {
                    goToSlide(0);
                }
            }, 5000);

            // Pause auto-advance on interaction
            container.addEventListener('touchstart', () => {
                clearInterval(autoAdvanceInterval);
            });

            container.addEventListener('touchend', () => {
                clearInterval(autoAdvanceInterval);
                autoAdvanceInterval = setInterval(() => {
                    if (currentIndex < cards.length - 1) {
                        goToSlide(currentIndex + 1);
                    } else {
                        goToSlide(0);
                    }
                }, 5000);
            });

        } else {
            // Desktop: Original infinite scroll
            // Remove any mobile-specific styles
            track.style.transform = '';
            track.style.transition = '';
            
            const ensureClones = () => {
                const containerWidth = container.getBoundingClientRect().width || window.innerWidth;
                let total = track.scrollWidth;
                let safety = 0;
                // Clone until we have enough content for seamless scroll
                while (total < containerWidth * 3 && safety < 25) {
                    const currentChildren = Array.from(track.children);
                    currentChildren.forEach(child => {
                        track.appendChild(child.cloneNode(true));
                    });
                    total = track.scrollWidth;
                    safety++;
                }
            };

            // Ensure clones and start animation
            ensureClones();

            // Start animation after a brief delay
            setTimeout(() => {
                const speed = 50; // pixels per second - increased speed for better visibility
                const width = track.scrollWidth / 2; // Half because we duplicate
                const duration = Math.max(width / speed, 15); // Minimum 15 seconds
                
                track.style.setProperty('--team-scroll-duration', duration + 's');
                track.classList.add('scrolling');

                // Pause on hover
                container.addEventListener('mouseenter', () => {
                    track.classList.add('pause');
                });
                
                container.addEventListener('mouseleave', () => {
                    track.classList.remove('pause');
                });

                // Respect reduced motion preferences
                if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    track.classList.remove('scrolling');
                }
            }, 200);
        }
    } catch (e) {
        console.error('Error initializing team carousel', e);
    }
});

// Gallery carousel initialization: Swipeable carousel for mobile
document.addEventListener('DOMContentLoaded', function() {
    try {
        const galleryWrapper = document.querySelector('.gallery-scroll-wrapper');
        const galleryGrid = document.querySelector('.gallery-grid');
        const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
        
        if (!galleryWrapper || !galleryGrid || galleryItems.length === 0) {
            console.log('Gallery elements not found');
            return;
        }

        const isMobile = window.innerWidth <= 991;
        
        if (isMobile) {
            // Mobile: Swipeable carousel
            let currentIndex = 0;
            let startX = 0;
            let currentX = 0;
            let isDragging = false;
            let startTime = 0;

            // Create pagination container
            const paginationContainer = document.createElement('div');
            paginationContainer.className = 'gallery-pagination';
            galleryWrapper.parentElement.insertBefore(paginationContainer, galleryWrapper.nextSibling);

            // Create pagination dots
            galleryItems.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = 'gallery-pagination-dot';
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                paginationContainer.appendChild(dot);
            });

            // Create swipe hint
            const swipeHint = document.createElement('div');
            swipeHint.className = 'gallery-swipe-hint';
            swipeHint.innerHTML = '<i class="fas fa-chevron-left"></i> Swipe to navigate <i class="fas fa-chevron-right"></i>';
            paginationContainer.parentElement.insertBefore(swipeHint, paginationContainer.nextSibling);

            // Auto-hide swipe hint after 3 seconds
            setTimeout(() => {
                swipeHint.style.opacity = '0';
                setTimeout(() => swipeHint.style.display = 'none', 300);
            }, 3000);

            // Get actual slide width including gap
            const getSlideWidth = () => {
                const gridStyles = window.getComputedStyle(galleryGrid);
                const gap = parseInt(gridStyles.gap) || 20;
                const item = galleryItems[0];
                const itemWidth = item.offsetWidth;
                return itemWidth + gap;
            };

            // Navigate to specific slide
            const goToSlide = (index) => {
                currentIndex = Math.max(0, Math.min(index, galleryItems.length - 1));
                const slideWidth = getSlideWidth();
                const offset = -currentIndex * slideWidth;
                galleryGrid.style.transform = `translateX(${offset}px)`;
                updateDots();
            };

            // Update pagination dots
            const updateDots = () => {
                const dots = paginationContainer.querySelectorAll('.gallery-pagination-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            };

            // Touch events
            galleryGrid.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                currentX = startX;
                isDragging = true;
                startTime = Date.now();
                galleryGrid.style.transition = 'none';
            });

            galleryGrid.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                currentX = e.touches[0].clientX;
                const diff = currentX - startX;
                const slideWidth = getSlideWidth();
                const currentOffset = -currentIndex * slideWidth;
                galleryGrid.style.transform = `translateX(${currentOffset + diff}px)`;
            });

            galleryGrid.addEventListener('touchend', () => {
                if (!isDragging) return;
                isDragging = false;
                
                const diff = currentX - startX;
                const timeDiff = Date.now() - startTime;
                const velocity = Math.abs(diff) / timeDiff;

                galleryGrid.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

                if (Math.abs(diff) > 50 || velocity > 0.3) {
                    if (diff > 0 && currentIndex > 0) {
                        goToSlide(currentIndex - 1);
                    } else if (diff < 0 && currentIndex < galleryItems.length - 1) {
                        goToSlide(currentIndex + 1);
                    } else {
                        goToSlide(currentIndex);
                    }
                } else {
                    goToSlide(currentIndex);
                }
            });

            // Mouse events for desktop testing
            galleryGrid.addEventListener('mousedown', (e) => {
                startX = e.clientX;
                currentX = startX;
                isDragging = true;
                startTime = Date.now();
                galleryGrid.style.transition = 'none';
                galleryGrid.style.cursor = 'grabbing';
            });

            galleryGrid.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
                currentX = e.clientX;
                const diff = currentX - startX;
                const slideWidth = getSlideWidth();
                const currentOffset = -currentIndex * slideWidth;
                galleryGrid.style.transform = `translateX(${currentOffset + diff}px)`;
            });

            galleryGrid.addEventListener('mouseup', () => {
                if (!isDragging) return;
                isDragging = false;
                galleryGrid.style.cursor = 'grab';
                
                const diff = currentX - startX;
                const timeDiff = Date.now() - startTime;
                const velocity = Math.abs(diff) / timeDiff;

                galleryGrid.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

                if (Math.abs(diff) > 50 || velocity > 0.3) {
                    if (diff > 0 && currentIndex > 0) {
                        goToSlide(currentIndex - 1);
                    } else if (diff < 0 && currentIndex < galleryItems.length - 1) {
                        goToSlide(currentIndex + 1);
                    } else {
                        goToSlide(currentIndex);
                    }
                } else {
                    goToSlide(currentIndex);
                }
            });

            galleryGrid.addEventListener('mouseleave', () => {
                if (isDragging) {
                    isDragging = false;
                    galleryGrid.style.cursor = 'grab';
                    galleryGrid.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    goToSlide(currentIndex);
                }
            });

            // Initial setup
            galleryGrid.style.cursor = 'grab';
            goToSlide(0);

        } else {
            // Desktop: Keep horizontal scroll behavior
            console.log('Gallery desktop mode - horizontal scroll enabled');
        }
    } catch (e) {
        console.error('Error initializing gallery carousel', e);
    }
});

// Navigation scroll effects
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const progressBar = document.querySelector('.scroll-progress-bar');
    
    // Header glassmorphism
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Scroll progress bar
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
    
    // Active section indicator
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('header nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 75;
            const elementPosition = targetSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
