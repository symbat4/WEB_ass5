const form = document.getElementById('signupForm');
        const msg = document.getElementById('formMessage');
        const pw = document.getElementById('password');
        const cpw = document.getElementById('confirmPassword');
        const toggle = document.getElementById('togglePassword');

        // Show / hide password
        toggle.addEventListener('click', () => {
            const show = pw.type === 'password';
            pw.type = show ? 'text' : 'password';
            toggle.textContent = show ? 'Hide' : 'Show';
        });

        // Passwords must match
        function checkMatch() {
            cpw.setCustomValidity(pw.value !== cpw.value ? 'Passwords do not match' : '');
        }
        pw.addEventListener('input', checkMatch);
        cpw.addEventListener('input', checkMatch);

        // Bootstrap validation
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            checkMatch();

            if (!form.checkValidity()) {
                msg.textContent = 'Please fix the highlighted fields.';
                msg.className = 'form-message error text-center text-danger mt-3 mb-0';
                form.classList.add('was-validated');
                return;
            }

            msg.textContent = 'Account created successfully!';
            msg.className = 'form-message success text-center text-success mt-3 mb-0';

            form.reset();
            form.classList.remove('was-validated');

            // Reset password button
            pw.type = 'password';
            toggle.textContent = 'Show';
        });