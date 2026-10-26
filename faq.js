
/* TASK 2: FAQ ACCORDION */

document.querySelectorAll('.medasym-faq-question').forEach(function(button) {

    button.addEventListener('click', function() {

        const answerId = button.getAttribute('aria-controls');
        const answer = document.getElementById(answerId);

        const isOpen = button.getAttribute('aria-expanded') === 'true';

        if (isOpen) {
            answer.style.maxHeight = '0';
            button.setAttribute('aria-expanded', 'false');
            button.querySelector('span').textContent = '+';
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            button.setAttribute('aria-expanded', 'true');
            button.querySelector('span').textContent = '−';
        }

    });

});
