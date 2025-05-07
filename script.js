document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    navLinkItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Scroll Behavior
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Modal Functionality
    const loginBtn = document.querySelector('.btn-login');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const userTypeSelect = document.getElementById('user-type');
    const schoolInfo = document.getElementById('school-info');
    
    // Show Login Modal
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Show Register from Login
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.remove('active');
        registerModal.classList.add('active');
    });
    
    // Show Login from Register
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.classList.remove('active');
        loginModal.classList.add('active');
    });
    
    // Close Modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            loginModal.classList.remove('active');
            registerModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Show school info when school is selected
    userTypeSelect.addEventListener('change', function() {
        if (this.value === 'school') {
            schoolInfo.classList.remove('hidden');
        } else {
            schoolInfo.classList.add('hidden');
        }
    });
    
    // Form Submissions
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add login logic here
        alert('Login functionality will be implemented soon!');
        loginModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add registration logic here
        alert('Registration functionality will be implemented soon!');
        registerModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in, .slide-in-right, .slide-in-left').forEach(el => {
        observer.observe(el);
    });
    
    // Simulate loading for demo purposes
    setTimeout(() => {
        document.querySelectorAll('.fade-in, .slide-in-right, .slide-in-left').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translate(0)';
        });
    }, 300);
});