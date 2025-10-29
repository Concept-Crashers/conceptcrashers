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