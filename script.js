// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Booking Form Handler - WhatsApp Redirect
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get all form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const destination = document.getElementById('destination').value;
    const tourType = document.getElementById('tour-type').value;
    const vehicle = document.getElementById('vehicle').value;
    const date = document.getElementById('date').value;
    const members = document.getElementById('members').value;
    const message = document.getElementById('message').value.trim();

    // Validate all fields are filled
    if (!name || !email || !phone || !destination || !tourType || !vehicle || !date || !members) {
        alert('❌ Please fill in all required fields');
        return;
    }

    // Format destination and tour type nicely
    const formatText = (text) => text.charAt(0).toUpperCase() + text.slice(1).replace('-', ' ');

    // Format the message for WhatsApp
    const whatsappMessage = `🌟 *NEW TOUR BOOKING REQUEST* 🌟\n\n👤 *CUSTOMER DETAILS:*\n• Name: ${name}\n• Email: ${email}\n• Phone: ${phone}\n\n🎫 *TOUR DETAILS:*\n• Destination: ${formatText(destination)}\n• Tour Type: ${formatText(tourType)}\n• Vehicle: ${formatText(vehicle)}\n• Preferred Date: ${date}\n• Number of Passengers: ${members}\n\n💬 *ADDITIONAL INFO:*\n${message || 'No additional message'}\n\n---\n*Please reply with pricing & confirmation*`;

    // WhatsApp Business API
    const whatsappNumber = '919611053999'; // Your WhatsApp number
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');

    // Reset form after submission
    bookingForm.reset();

    // Show success message
    alert('✅ Booking request sent!\n\nOpening WhatsApp to connect with our team.\nYou will receive pricing details based on your vehicle choice.');
});

// Smooth Scrolling for navigation links
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

// Scroll Animation - Elements fade in as they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to all card elements
document.querySelectorAll('.tour-card, .vehicle-card, .gallery-item, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});