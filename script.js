document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Floating tech icons background
    function createTechBackground() {
        const container = document.createElement('div');
        container.className = 'tech-background';
        document.body.insertBefore(container, document.body.firstChild);

        const icons = [
            'fa-python', 'fa-java', 'fa-aws', 'fa-react', 
            'fa-database', 'fa-cloud', 'fa-code', 'fa-brain',
            'fa-microchip', 'fa-chart-line', 'fa-terminal'
        ];

        function createIcon() {
            const icon = document.createElement('i');
            icon.className = `fa-solid ${icons[Math.floor(Math.random() * icons.length)]} tech-icon`;
            icon.style.left = `${Math.random() * 100}%`;
            icon.style.animationDelay = `${Math.random() * 5}s`;
            icon.style.animationDuration = `${8 + Math.random() * 4}s`;
            container.appendChild(icon);

            // Remove the icon after animation completes
            icon.addEventListener('animationend', () => {
                icon.remove();
                createIcon(); // Create a new icon to replace it
            });
        }

        // Initially create 15 icons
        for (let i = 0; i < 15; i++) {
            createIcon();
        }
    }

    createTechBackground();

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                navbar.style.padding = '0.5rem 2rem';
            } else {
                navbar.style.background = 'rgba(15, 23, 42, 0.9)';
                navbar.style.padding = '1rem 2rem';
            }
        });
    }

    // Active Navigation Link Highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Enhanced Animation System
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    // Add animation classes to elements
    const projectCards = document.querySelectorAll('.project-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const contactItems = document.querySelectorAll('.contact-item');
    const homeText = document.querySelector('.home-text');
    const homeImage = document.querySelector('.home-image');

    projectCards.forEach((card, index) => {
        card.classList.add('fade-in-up');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    timelineItems.forEach((item, index) => {
        item.classList.add('fade-in-left');
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
        const details = item.querySelectorAll('.achievements-details');
        details.forEach((detail, detailIndex) => {
            detail.classList.add('fade-in-left');
            detail.style.transitionDelay = `${(index * 0.2) + (detailIndex * 0.1)}s`;
            observer.observe(detail);
        });
    });

    contactItems.forEach((item, index) => {
        item.classList.add('fade-in-up');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    if (homeText) {
        homeText.classList.add('fade-in-up');
        observer.observe(homeText);
    }

    if (homeImage) {
        homeImage.classList.add('fade-in-right');
        observer.observe(homeImage);
    }

    // Typing Animation for Home Title
    function typeWriter(element, prefixText, highlightText, speed = 50) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < prefixText.length + highlightText.length) {
                const currentText = (i < prefixText.length) 
                    ? prefixText.slice(0, i + 1) 
                    : prefixText + highlightText.slice(0, i + 1 - prefixText.length);
                if (i >= prefixText.length) {
                    const highlightPortion = highlightText.slice(0, i + 1 - prefixText.length);
                    element.innerHTML = `${prefixText}<span class="highlight">${highlightPortion}</span><span class="typing-cursor">|</span>`;
                } else {
                    element.innerHTML = `${currentText}<span class="typing-cursor">|</span>`;
                }
                i++;
                setTimeout(type, speed);
            } else {
                element.innerHTML = `${prefixText}<span class="highlight">${highlightText}</span>`;
            }
        }

        type();
    }

    const homeTitle = document.querySelector('.home-title');
    if (homeTitle) {
        const prefixText = "Hello, I'm ";
        const highlightText = "Haniya Akhtar";
        typeWriter(homeTitle, prefixText, highlightText, 50);
    }

    // Parallax Effect for Home Section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const homeSection = document.querySelector('.home-section');
        if (homeSection) {
            const rate = scrolled * -0.5;
            homeSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add Loading Animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Smooth Reveal Animation for Sections
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.section');
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    document.addEventListener('DOMContentLoaded', revealOnScroll);
});

// Add CSS for animations and effects
const style = document.createElement('style');
style.textContent = `
    .section {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .section.active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-links a.active {
        color: #60a5fa;
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
    
    .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in-up.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .fade-in-left {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.6s ease;
    }
    
    .fade-in-left.visible {
        opacity: 1;
        transform: translateX(0);
    }
    
    .fade-in-right {
        opacity: 0;
        transform: translateX(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in-right.visible {
        opacity: 1;
        transform: translateX(0);
    }
    
    .project-card:hover {
        transform: translateY(-10px) scale(1.02);
    }
    
    .timeline-content:hover {
        transform: translateY(-5px);
    }
    
    .typing-cursor {
        animation: blink 1s step-end infinite;
    }
    
    @keyframes blink {
        50% { opacity: 0; }
    }
`;
document.head.appendChild(style);