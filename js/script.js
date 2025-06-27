document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(e.target) && 
                !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mainNav.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mainNav.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }

    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const calcForm = document.getElementById('calc-form');
    const resultContent = document.querySelector('.result-content');

    if (calcForm) {
        calcForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const from = document.getElementById('from').value;
            const to = document.getElementById('to').value;
            const weight = parseFloat(document.getElementById('weight').value);
            const volume = parseFloat(document.getElementById('volume').value);
            const cargoType = document.getElementById('cargo-type').value;
            const serviceType = document.getElementById('service-type').value;

            const baseCost = Math.floor(Math.random() * 5000) + 5000;

            const cargoTypeCoefficients = {
                'standard': 1,
                'fragile': 1.3,
                'dangerous': 1.5,
                'oversize': 1.7
            };

            const serviceTypeCoefficients = {
                'auto': 1,
                'rail': 0.8,
                'sea': 0.7,
                'combined': 1.2
            };

            let totalCost = baseCost;        
            totalCost += weight * 10;
            totalCost += volume * 1000; 
            totalCost *= cargoTypeCoefficients[cargoType] || 1;
            totalCost *= serviceTypeCoefficients[serviceType] || 1;
            totalCost = Math.round(totalCost);

            resultContent.innerHTML = `
                <div class="result-item">
                    <span>Маршрут:</span>
                    <strong>${from} — ${to}</strong>
                </div>
                <div class="result-item">
                    <span>Тип груза:</span>
                    <strong>${getCargoTypeTitle(cargoType)}</strong>
                </div>
                <div class="result-item">
                    <span>Вес:</span>
                    <strong>${weight} кг</strong>
                </div>
                <div class="result-item">
                    <span>Объем:</span>
                    <strong>${volume} м³</strong>
                </div>
                <div class="result-item">
                    <span>Тип перевозки:</span>
                    <strong>${getServiceTypeTitle(serviceType)}</strong>
                </div>
                <div class="result-total">
                    <span>Стоимость:</span>
                    <strong>${totalCost.toLocaleString()} ₽</strong>
                </div>
                <div class="result-note">
                    <p>* Точную стоимость уточняйте у менеджера</p>
                </div>
            `;
        });
    }

    function getCargoTypeTitle(type) {
        const titles = {
            'standard': 'Стандартный',
            'fragile': 'Хрупкий',
            'dangerous': 'Опасный',
            'oversize': 'Негабаритный'
        };
        return titles[type] || type;
    }

    function getServiceTypeTitle(type) {
        const titles = {
            'auto': 'Автомобильная',
            'rail': 'Железнодорожная',
            'sea': 'Морская',
            'combined': 'Мультимодальная'
        };
        return titles[type] || type;
    }

    const orderBtn = document.querySelector('.order-btn');
    const callbackBtn = document.querySelector('.callback-btn');
    const orderModal = document.getElementById('orderModal');
    const callbackModal = document.getElementById('callbackModal');
    const closeModals = document.querySelectorAll('.close-modal');
    const successMessage = document.getElementById('success-message');
    const closeSuccess = document.querySelector('.close-success');

    if (orderBtn && orderModal) {
        orderBtn.addEventListener('click', function() {
            orderModal.classList.add('active');
        });
    }

    if (callbackBtn && callbackModal) {
        callbackBtn.addEventListener('click', function() {
            callbackModal.classList.add('active');
        });
    }

    if (closeModals) {
        closeModals.forEach(btn => {
            btn.addEventListener('click', function() {
                if (orderModal) orderModal.classList.remove('active');
                if (callbackModal) callbackModal.classList.remove('active');
            });
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === orderModal) {
            orderModal.classList.remove('active');
        }
        if (e.target === callbackModal) {
            callbackModal.classList.remove('active');
        }
        if (e.target === successMessage) {
            successMessage.classList.remove('active');
        }
    });

    if (closeSuccess) {
        closeSuccess.addEventListener('click', function() {
            successMessage.classList.remove('active');
        });
    }

    const orderForm = document.getElementById('order-form');
    const callbackForm = document.getElementById('callback-form');

    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            setTimeout(function() {
                orderModal.classList.remove('active');
                successMessage.classList.add('active');
                orderForm.reset();
            }, 1000);
        });
    }

    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            setTimeout(function() {
                callbackModal.classList.remove('active');
                successMessage.classList.add('active');
                callbackForm.reset();
            }, 1000);
        });
    }

    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 