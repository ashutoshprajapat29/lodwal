document.addEventListener('DOMContentLoaded', () => {
    console.log("Lodwal Construction Script: Fully Loaded");

    // --- 1. NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-sm');
            } else {
                navbar.classList.remove('shadow-sm');
            }
        });
    }

    // --- 2. SMOOTH SCROLLING FOR NAV LINKS ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. BUDGET CALCULATOR LOGIC ---
    const sqftInput = document.getElementById('sqftInput');
    const packageSelect = document.getElementById('packageSelect');
    const totalDisplay = document.getElementById('totalDisplay');

    if (sqftInput && packageSelect && totalDisplay) {
        const calculateBudget = () => {
            const area = parseFloat(sqftInput.value) || 0;
            const rate = parseFloat(packageSelect.value) || 0;
            const total = area * rate;
            totalDisplay.innerText = total.toLocaleString('en-IN');
        };

        sqftInput.addEventListener('input', calculateBudget);
        packageSelect.addEventListener('change', calculateBudget);
    }

    // --- 4. PHONE INPUT MASKING (Numbers only, Max 10) ---
    const phoneInput = document.getElementById('phoneInput');
    if (phoneInput) {
        phoneInput.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, ''); // Remove non-digits
            if (this.value.length > 10) {
                this.value = this.value.slice(0, 10);
            }
        });
    }

    // --- 5. FORM VALIDATION & PREMIUM POPUP STATE ---
    const form = document.getElementById('contactForm');
    const formContainer = document.getElementById('form-container');

    if (form && formContainer) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Stop default reload

            // Strict Bootstrap Validation Check
            if (!form.checkValidity()) {
                event.stopPropagation();
                form.classList.add('was-validated');
                return; // Stop if invalid
            }

            // If valid, start submission
            form.classList.add('was-validated');
            const submitBtn = document.getElementById('submitBtn');
            const formData = new FormData(form);

            // UI Feedback
            submitBtn.disabled = true;
            submitBtn.innerText = "SENDING...";

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                const data = await response.json();

                if (response.ok) {
                    // LUXURY SUCCESS STATE
                    formContainer.style.opacity = '0';
                    formContainer.style.transition = 'opacity 0.4s ease';

                    setTimeout(() => {
                        formContainer.innerHTML = `
                            <div class="py-5 animate-in" style="animation: fadeInUp 0.6s ease forwards;">
                                <i class="bi bi-check2-all text-dark mb-4" style="font-size: 4rem;"></i>
                                <h2 class="brand-font mb-3">Inquiry Received.</h2>
                                <p class="text-muted mb-5">Thank you for choosing Lodwal Construction. <br> Our architectural team will contact you shortly.</p>
                                <button onclick="location.reload()" class="btn btn-outline-dark btn-sm rounded-0 px-4">SEND NEW MESSAGE</button>
                            </div>
                        `;
                        formContainer.style.opacity = '1';
                    }, 400);

                } else {
                    // Handle specific Formspree errors (like the email error)
                    const errorDetails = data.errors ? data.errors.map(e => e.message).join(", ") : "Check your connection.";
                    alert("Form Error: " + errorDetails);
                    submitBtn.disabled = false;
                    submitBtn.innerText = "SEND MESSAGE";
                }

            } catch (error) {
                alert("Network error. Please try again.");
                submitBtn.disabled = false;
                submitBtn.innerText = "SEND MESSAGE";
            }
        });
    }
});


