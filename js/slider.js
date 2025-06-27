document.addEventListener('DOMContentLoaded', function() {
    const heroSlides = document.querySelectorAll('.slide');
    const heroDots = document.querySelectorAll('.dot');
    const prevSlideBtn = document.querySelector('.prev-slide');
    const nextSlideBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let heroSlideInterval;

    function showHeroSlide(index) {
        heroSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        heroDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        heroSlides[index].classList.add('active');
        heroDots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextHeroSlide() {
        let nextIndex = currentSlide + 1;
        
        if (nextIndex >= heroSlides.length) {
            nextIndex = 0;
        }
        
        showHeroSlide(nextIndex);
    }
    
    function prevHeroSlide() {
        let prevIndex = currentSlide - 1;
        
        if (prevIndex < 0) {
            prevIndex = heroSlides.length - 1;
        }
        
        showHeroSlide(prevIndex);
    }
    
    function startSlideInterval() {
        heroSlideInterval = setInterval(nextHeroSlide, 5000);
    }
    
    function stopSlideInterval() {
        clearInterval(heroSlideInterval);
    }
    
    if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', function() {
            stopSlideInterval();
            prevHeroSlide();
            startSlideInterval();
        });
    }
    
    if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', function() {
            stopSlideInterval();
            nextHeroSlide();
            startSlideInterval();
        });
    }
    
    if (heroDots.length > 0) {
        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopSlideInterval();
                showHeroSlide(index);
                startSlideInterval();
            });
        });
    }
    
    if (heroSlides.length > 0) {
        startSlideInterval();
    }
    
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevTestimonialBtn = document.querySelector('.testimonial-prev');
    const nextTestimonialBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    let testimonialInterval;
    
    function showTestimonial(index) {
        testimonialItems.forEach(item => {
            item.classList.remove('active');
        });
        
        testimonialDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonialItems[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        
        currentTestimonial = index;
    }
    
    function nextTestimonial() {
        let nextIndex = currentTestimonial + 1;
        
        if (nextIndex >= testimonialItems.length) {
            nextIndex = 0;
        }
        
        showTestimonial(nextIndex);
    }
    
    function prevTestimonial() {
        let prevIndex = currentTestimonial - 1;
        
        if (prevIndex < 0) {
            prevIndex = testimonialItems.length - 1;
        }
        
        showTestimonial(prevIndex);
    }
    
    function startTestimonialInterval() {
        testimonialInterval = setInterval(nextTestimonial, 6000);
    }
    
    function stopTestimonialInterval() {
        clearInterval(testimonialInterval);
    }
    
    if (prevTestimonialBtn) {
        prevTestimonialBtn.addEventListener('click', function() {
            stopTestimonialInterval();
            prevTestimonial();
            startTestimonialInterval();
        });
    }
    
    if (nextTestimonialBtn) {
        nextTestimonialBtn.addEventListener('click', function() {
            stopTestimonialInterval();
            nextTestimonial();
            startTestimonialInterval();
        });
    }
    
    if (testimonialDots.length > 0) {
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopTestimonialInterval();
                showTestimonial(index);
                startTestimonialInterval();
            });
        });
    }
    
    if (testimonialItems.length > 0) {
        startTestimonialInterval();
    }
}); 