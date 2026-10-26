
/* TASK 3: POPUP CONTACT FORM */

const openContactButton = document.getElementById('open-contact');
const closeContactButton = document.getElementById('close-contact');
const contactPopup = document.getElementById('contact-popup');
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

// Open popup
openContactButton.addEventListener('click', function() {
    contactPopup.hidden = false;
    document.body.style.overflow = 'hidden';
    contactStatus.textContent = '';
    document.getElementById('contact-name').focus();
});

// Close popup
function closePopup() {
    contactPopup.hidden = true;
    document.body.style.overflow = '';
    openContactButton.focus();
}

// Close using X button
closeContactButton.addEventListener('click', closePopup);

// Close when clicking outside the form
contactPopup.addEventListener('click', function(event) {
    if (event.target === contactPopup) {
        closePopup();
    }
});

// Close using Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && !contactPopup.hidden) {
        closePopup();
    }
});

// Handle form submission (demo only)
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    contactStatus.textContent = 'Form submitted successfully! (Demo only)';
    contactStatus.style.color = 'green';

    contactForm.reset();
});
