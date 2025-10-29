
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


// Responsive navbar for a mobile and other device navigation menu
const menuIcon = document.getElementById("menuIcon");
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (menuIcon && navMenu) {
    menuIcon.addEventListener("click", () => {
        menuIcon.classList.add("animate");
        if (menuIcon.classList.contains("fa-bars")) {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-times");
            navMenu.style.display = 'flex';
        } else {
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");
            navMenu.style.display = 'none';
        }
        setTimeout(() => {
            menuIcon.classList.remove("animate");
        }, 500);
        console.log("I am clicked!");
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");
        });
    });
}

// Team carousel initialization: duplicate items and start infinite scroll
document.addEventListener('DOMContentLoaded', () => {
    try {
        const track = document.getElementById('teamTrack');
        if (!track) return;

        const container = track.parentElement;

        // Duplicate children until the track is at least twice the container width
        const ensureClones = () => {
            const containerWidth = container.getBoundingClientRect().width || window.innerWidth;
            let total = track.scrollWidth;
            let safety = 0;
            while (total < containerWidth * 2 && safety < 12) {
                Array.from(track.children).forEach(child => track.appendChild(child.cloneNode(true)));
                total = track.scrollWidth;
                safety++;
            }
        };

        // Start after a short delay to allow images/layout to settle
        setTimeout(() => {
            ensureClones();

            const speed = 3500; // px per second
            const width = track.scrollWidth;
            const duration = Math.max(12, Math.round(width / speed));
            track.style.setProperty('--team-scroll-duration', duration + 's');
            track.classList.add('scrolling');

            // Pause on hover for accessibility/UX
            container.addEventListener('mouseenter', () => track.classList.add('pause'));
            container.addEventListener('mouseleave', () => track.classList.remove('pause'));

            // Respect reduced motion preference
            if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                track.classList.remove('scrolling');
            }
        }, 300);
    } catch (e) {
        console.error('Error initializing team carousel', e);
    }
});
