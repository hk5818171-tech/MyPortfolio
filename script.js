// Mobile menu toggle
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let themeToggle = document.querySelector('#theme-toggle');
let themeIcon = themeToggle.querySelector('i');
let contactForm = document.querySelector('#contact-form');
let formStatus = document.querySelector('#form-status');

const applyTheme = (theme) => {
    const isLight = theme === 'light';

    document.body.classList.toggle('light-mode', isLight);
    themeIcon.className = isLight ? 'bx bx-moon' : 'bx bx-sun';
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
};

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme);

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

themeToggle.onclick = () => {
    const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';

    localStorage.setItem('portfolio-theme', nextTheme);
    applyTheme(nextTheme);
};

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const phone = formData.get('phone').trim() || 'Not provided';
    const subject = formData.get('subject').trim() || 'Portfolio contact message';
    const message = formData.get('message').trim();
    const mailBody = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Subject: ${subject}`,
        '',
        message
    ].join('\n');

    const mailLink = `mailto:hk5818171@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
    window.location.href = mailLink;
    formStatus.textContent = 'Email app open ho raha hai. Message send karne ke liye email app me Send dabaye.';
});

// Close menu when clicking on a link
let navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Active link on scroll
window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('.navbar a');
    
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if(top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if(link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});
