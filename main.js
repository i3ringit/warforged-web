/**
 * Warforged Landing Page Scripts
 * ----------------------------
 * Handles staggered reveals and interactive feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial State Reveal
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('revealed');
        }, 100);
    }

    // 2. Intersection Observer for Scroll Reveals
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add "revealed" class to trigger CSS transition
                entry.target.classList.add('revealed');
                
                // Once revealed, unobserve to save performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to all elements with staggered-reveal class
    document.querySelectorAll('.staggered-reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 3. Button Click Interaction (Simple Toast)
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Visual Feedback
            const originalText = ctaButton.textContent;
            ctaButton.textContent = "Initiative Rolled!";
            ctaButton.style.backgroundColor = "hsl(145, 82%, 53%)"; // Success Green
            
            setTimeout(() => {
                ctaButton.textContent = originalText;
                ctaButton.style.backgroundColor = "";
            }, 3000);
        });
    }

    // 4. Subtle Parallax Effect for Hero
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        window.addEventListener('scroll', () => {
            const scrollPercent = window.scrollY / window.innerHeight;
            if (scrollPercent < 1.2) {
                // Subtle scale and shift
                const scale = 1.05 + (scrollPercent * 0.05);
                const translateY = scrollPercent * 20;
                heroImg.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            }
        });
    }
});
