document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.querySelector('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Reveal on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
        });
    });

    // Appointment Form
    const appointmentForm = document.querySelector('#appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = appointmentForm.querySelector('button[type="submit"]');
            btn.textContent = 'Processing...';
            btn.disabled = true;

            setTimeout(() => {
                appointmentForm.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--accent); margin-bottom: 1rem;"></i>
                        <h3>Request Submitted Successfully</h3>
                        <p>Thank you. Our clinic will contact you shortly.</p>
                        <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 1.5rem;">Send Another Request</button>
                    </div>
                `;
            }, 1500);
        });
    }
});
