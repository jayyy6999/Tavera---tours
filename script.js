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
    const pickup = document.getElementById('pickup').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const vehicleType = document.getElementById('vehicle-type').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const members = document.getElementById('members').value;
    const message = document.getElementById('message').value.trim();

    // Validate required fields
    if (!name || !email || !phone || !pickup || !destination || !vehicleType || !date || !time || !members) {
        alert('❌ Please fill in all required fields');
        return;
    }

    // Build WhatsApp message
    const whatsappMessage =
`🌟 *NEW BOOKING REQUEST - TAVERA MOBILITY* 🌟

👤 *Customer Details*
• Name: ${name}
• Email: ${email}
• Phone: ${phone}

📍 *Trip Details*
• Pickup: ${pickup}
• Destination: ${destination}
• Vehicle: ${vehicleType}
• Preferred Date: ${date}
• Preferred Time: ${time}
• No. of Members: ${members}

📝 *Additional Message*
${message || '-'}
`;

    const whatsappNumber = '919611053999'; // confirmed by you
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');

    // Reset form after submission
    bookingForm.reset();

    // Inform user
    alert('✅ Booking request sent! Opening WhatsApp to connect with our team.');
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
document.querySelectorAll('.tour-card, .vehicle-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});
