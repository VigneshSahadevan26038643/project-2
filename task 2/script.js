document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Hamburger animation can be added here
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Smooth scroll offset for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            if(targetId === '#join') {
                openModal();
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Registration Modal Logic
    const modal = document.getElementById('registerModal');
    const closeModalBtn = document.getElementById('closeModal');
    const registerForm = document.getElementById('registerForm');
    const formSuccess = document.getElementById('formSuccess');

    function openModal() {
        if(navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        }
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
    }

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // re-enable scrolling
        
        // Reset form slightly after closing animation
        setTimeout(() => {
            registerForm.reset();
            registerForm.style.display = 'block';
            formSuccess.style.display = 'none';
        }, 300);
    }

    closeModalBtn.addEventListener('click', closeModal);

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle Form Submit
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would normally send data to a backend
        registerForm.style.display = 'none';
        formSuccess.style.display = 'block';
    });
});
