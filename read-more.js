const readMoreBtn = document.getElementById('readMoreBtn');
const spicyMoreText = document.getElementById('spicyMoreText');

readMoreBtn.addEventListener('click', function() {
    const isExpanded = spicyMoreText.classList.toggle('show');

    if (isExpanded) {
        readMoreBtn.textContent = 'Read Less';
        readMoreBtn.setAttribute('aria-expanded', 'true');
    } else {
        readMoreBtn.textContent = "Read More";
        readMoreBtn.setAttribute("aria-expanded", "false");
    }
});