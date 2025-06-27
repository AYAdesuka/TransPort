document.addEventListener('DOMContentLoaded', function() {

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.opacity = '0';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 + index * 100);
    });

    const animateOnScroll = () => {
        const sections = document.querySelectorAll('.section-header, .service-row, .service-card, .advantage-item, .intro-text');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.8) {
                section.classList.add('animate');
                
                if (section.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('fade-in');
                        }, index * 150);
                    });
                }
            }
        });
    };
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    const calcForm = document.getElementById('calc-form');
    const resultContent = document.querySelector('.result-content');
    
    if (calcForm) {
        calcForm.addEventListener('submit', function(e) {
            resultContent.classList.add('loading');
            
            setTimeout(() => {
                resultContent.classList.remove('loading');
            }, 1000);
        });
    }

    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });

    const modalBtns = document.querySelectorAll('.order-btn, .callback-btn');
    const modals = document.querySelectorAll('.modal');
    
    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetModal = btn.classList.contains('order-btn') ? 
                document.getElementById('orderModal') : 
                document.getElementById('callbackModal');
            
            if (targetModal) {
                targetModal.classList.add('active');
                targetModal.querySelector('.modal-content').style.transform = 'scale(1)';
                targetModal.querySelector('.modal-content').style.opacity = '1';
            }
        });
    });

    const cards3d = document.querySelectorAll('.card-3d');
    
    cards3d.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateX = mouseY / -10;
            const rotateY = mouseX / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.zIndex = '1';
            card.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.zIndex = '0';
            card.style.transition = 'transform 0.5s ease';
        });
    });

    const formInputs = document.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    const advantages = document.querySelectorAll('.advantage-item');
    
    advantages.forEach((advantage, index) => {
        setTimeout(() => {
            advantage.classList.add('fade-in');
        }, index * 200);
    });

    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            });
        });
    }

    const heroSlides = document.querySelectorAll('.slide-bg');
    
    heroSlides.forEach(slide => {
        slide.style.transition = 'transform 10s ease-in-out';
        slide.style.transform = 'scale(1.05)';
        
        setTimeout(() => {
            slide.style.transform = 'scale(1)';
        }, 300);
    });

    const pageLinks = document.querySelectorAll('a:not([href^="#"])');
    
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (link.getAttribute('href') && 
                link.getAttribute('href').startsWith('http') && 
                !link.getAttribute('href').includes(window.location.hostname)) {
                return;
            }
            
            e.preventDefault();
            const targetHref = this.getAttribute('href');
            
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                window.location.href = targetHref;
            }, 300);
        });
    });


    const particlesSections = document.querySelectorAll('.particles-bg');
    
    if (particlesSections.length > 0) {
        particlesSections.forEach(section => {
            const canvas = document.createElement('canvas');
            canvas.style.position = 'absolute';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.zIndex = '0';
            canvas.style.opacity = '0.2';
            
            section.style.position = 'relative';
            section.style.overflow = 'hidden';
            section.insertBefore(canvas, section.firstChild);
            
            const ctx = canvas.getContext('2d');
            canvas.width = section.offsetWidth;
            canvas.height = section.offsetHeight;
            
            const particles = [];
            
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 3 + 1,
                    speedX: Math.random() * 2 - 1,
                    speedY: Math.random() * 2 - 1
                });
            }
            
            function drawParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'white';
                
                particles.forEach(particle => {
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                    ctx.fill();
                    
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    
                    if (particle.x < 0 || particle.x > canvas.width) {
                        particle.speedX = -particle.speedX;
                    }
                    
                    if (particle.y < 0 || particle.y > canvas.height) {
                        particle.speedY = -particle.speedY;
                    }
                });
                

                particles.forEach((particle1, index) => {
                    for (let j = index + 1; j < particles.length; j++) {
                        const particle2 = particles[j];
                        const distance = Math.sqrt(
                            Math.pow(particle1.x - particle2.x, 2) + 
                            Math.pow(particle1.y - particle2.y, 2)
                        );
                        
                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance / 500})`;
                            ctx.lineWidth = 1;
                            ctx.moveTo(particle1.x, particle1.y);
                            ctx.lineTo(particle2.x, particle2.y);
                            ctx.stroke();
                        }
                    }
                });
                
                requestAnimationFrame(drawParticles);
            }
            
            drawParticles();
        });
    }
}); 