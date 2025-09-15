 // Modal functionality
        const modal = document.getElementById("loginModal");
        const btn = document.getElementById("loginBtn");
        const span = document.getElementById("closeModal");

        btn.onclick = function() {
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        }

        span.onclick = function() {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        }

        // Enhanced form submit with better UX
        document.querySelector(".login-form").addEventListener("submit", function(e) {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            
            if (username && password) {
                // Simulate loading
                const submitBtn = e.target.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ingresando...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert(`¡Bienvenido, ${username}! Inicio de sesión exitoso.`);
                    modal.style.display = "none";
                    document.body.style.overflow = "auto";
                    
                    // Reset form and button
                    e.target.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Add hover effects to cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Enhanced methodology step interactions
        document.querySelectorAll('.methodology-step').forEach((step, index) => {
            step.style.animationDelay = `${index * 0.1}s`;
            
            step.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.05)';
                this.style.zIndex = '10';
            });
            
            step.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.zIndex = '1';
            });
        });

        // Color swatch interactive effects
        document.querySelectorAll('.color-swatch').forEach(swatch => {
            swatch.addEventListener('click', function() {
                // Copy color to clipboard if possible
                const style = window.getComputedStyle(this);
                const bgColor = style.backgroundColor;
                
                // Create temporary tooltip
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Color copiado!';
                tooltip.style.cssText = `
                    position: absolute;
                    background: var(--black);
                    color: var(--white);
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    font-size: 0.9rem;
                    pointer-events: none;
                    z-index: 1000;
                    transform: translateX(-50%);
                    left: 50%;
                    top: -40px;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                
                this.style.position = 'relative';
                this.appendChild(tooltip);
                
                // Show tooltip
                setTimeout(() => tooltip.style.opacity = '1', 10);
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    setTimeout(() => tooltip.remove(), 300);
                }, 2000);
            });
        });

        // Add subtle parallax effect to background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.bg-animation');
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        });

        // Service items stagger animation on scroll
        const serviceItems = document.querySelectorAll('.service-item');
        const serviceObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        serviceItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            serviceObserver.observe(item);
        });

        // Add loading animation when page loads
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Easter egg: Konami code
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                // Easter egg activated
                document.body.style.filter = 'hue-rotate(180deg)';
                setTimeout(() => {
                    document.body.style.filter = 'none';
                    alert('🎉 ¡Easter egg activado! SwiftSolve siempre tiene sorpresas para los desarrolladores curiosos.');
                }, 1000);
                konamiCode = [];
            }
        });