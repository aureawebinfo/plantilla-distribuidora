// script.js
// Licencia: Todos los derechos y el código están bajo el control de la agencia de desarrollo web Áurea Web (página: aurea-web.com).

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initMobileMenu();
    initScrollAnimations();
    initProductModals();
    initParticles();
    initContactForm();
    initFloatingCards();
});

// Menú móvil
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observar elementos que deben animarse al aparecer
    const animatedElements = document.querySelectorAll('.product-card, .advantage-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Efecto de header al hacer scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(13, 27, 42, 0.95)';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
            } else {
                header.style.backgroundColor = 'rgba(13, 27, 42, 0.9)';
                header.style.boxShadow = 'none';
            }
        });
    }
}

// Sistema de partículas para el hero
function initParticles() {
    const canvas = document.createElement('canvas');
    const container = document.getElementById('particles-js');
    
    if (!container) return;
    
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    
    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25,
            color: `rgba(173, 181, 189, ${Math.random() * 0.5 + 0.2})`
        });
    }
    
    // Animar partículas
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Rebote en los bordes
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX = -particle.speedX;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY = -particle.speedY;
            
            // Dibujar partícula
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Conectar partículas cercanas
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(173, 181, 189, ${0.2 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Redimensionar canvas al cambiar tamaño de ventana
    window.addEventListener('resize', function() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    });
}

// Modales para productos
function initProductModals() {
    const modal = document.getElementById('product-modal');
    const productButtons = document.querySelectorAll('.product-card .btn-secondary');
    const closeBtn = document.querySelector('.close');
    
    if (!modal) return;
    
    // Datos de ejemplo para los productos
    const productData = {
        'Taladro Industrial': {
            description: 'Taladro de alta potencia diseñado para trabajos industriales pesados. Ideal para perforaciones en metal, concreto y otros materiales resistentes.',
            specs: [
                'Potencia: 1200W',
                'Velocidad: 0-3000 RPM',
                'Capacidad de perforación: 13mm en acero, 40mm en madera',
                'Portabrocas: 13mm con llave',
                'Peso: 2.5kg'
            ],
            applications: 'Perfecto para talleres mecánicos, construcción y mantenimiento industrial. Compatible con brocas para metal, madera, concreto y más.',
            image: 'https://images.unsplash.com/photo-1572981779307-38f8b0456222?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        },
        'Cables Eléctricos': {
            description: 'Cables de cobre de alta conductividad y durabilidad, diseñados para instalaciones eléctricas residenciales e industriales.',
            specs: [
                'Material: Cobre electrolítico 99.9% puro',
                'Aislamiento: PVC de alta resistencia',
                'Temperatura de trabajo: -15°C a 70°C',
                'Tensión nominal: 750V',
                'Normativa: NTC 2050'
            ],
            applications: 'Ideal para instalaciones eléctricas en viviendas, comercios e industrias. Resistente a la humedad, productos químicos y condiciones adversas.',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25856cd63?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        },
        'Tornillería': {
            description: 'Amplia variedad de tornillos y tuercas para todo tipo de aplicaciones industriales y de construcción.',
            specs: [
                'Material: Acero inoxidable, acero al carbono y latón',
                'Tratamientos: Galvanizado, niquelado, bicromatado',
                'Medidas: Desde M3 hasta M20',
                'Longitudes: 10mm a 200mm',
                'Normas: DIN, ISO, ANSI'
            ],
            applications: 'Para ensamblaje de estructuras metálicas, maquinaria, muebles, equipos eléctricos y más. Disponible en diferentes cabezas y roscas.',
            image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        },
        'Tuberías': {
            description: 'Tuberías de PVC y metal para conducción de fluidos en aplicaciones industriales, residenciales y agrícolas.',
            specs: [
                'Material: PVC, CPVC, Hierro galvanizado, Cobre',
                'Diámetros: 1/2" hasta 12"',
                'Presión de trabajo: Hasta 150 PSI',
                'Temperatura: -10°C a 60°C (PVC)',
                'Normas: ASTM, NTC'
            ],
            applications: 'Para sistemas de agua potable, riego, drenaje, conducción de aire comprimido, productos químicos y más. Fácil instalación y mantenimiento.',
            image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        }
    };
    
    // Abrir modal al hacer clic en "Ver más"
    productButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            if (productData[productName]) {
                const data = productData[productName];
                
                document.getElementById('modal-title').textContent = productName;
                document.getElementById('modal-description').textContent = data.description;
                document.getElementById('modal-img').src = data.image;
                document.getElementById('modal-img').alt = productName;
                
                const specsList = document.getElementById('modal-specs');
                specsList.innerHTML = '';
                data.specs.forEach(spec => {
                    const li = document.createElement('li');
                    li.textContent = spec;
                    specsList.appendChild(li);
                });
                
                document.getElementById('modal-applications').textContent = data.applications;
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Cerrar modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Cerrar modal con tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envío del formulario
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('¡Gracias por su mensaje! Nos pondremos en contacto con usted pronto.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Efectos de tarjetas flotantes
function initFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateY = mouseX / 20;
            const rotateX = -mouseY / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});