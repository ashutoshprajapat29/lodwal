
(function() {
    const initCounter = () => {
        const counters = document.querySelectorAll('.counter-value');
        const duration = 2000; // Total animation time in milliseconds

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const startTime = performance.now();

            const updateNumber = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOutQuad = (t) => t * (2 - t);
                const currentCount = Math.floor(easeOutQuad(progress) * target);

                counter.innerText = currentCount;

                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    counter.innerText = target;
                }
            };

            requestAnimationFrame(updateNumber);
        });
    };

    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(counterSection);
    }
})();