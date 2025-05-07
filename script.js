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
    const resultModal = document.getElementById('resultModal');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const userTypeSelect = document.getElementById('user-type');
    const schoolInfo = document.getElementById('school-info');
    
    // Show Login Modal
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showModal(loginModal);
    });
    
    // Show Register from Login
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        hideModal(loginModal);
        showModal(registerModal);
    });
    
    // Show Login from Register
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        hideModal(registerModal);
        showModal(loginModal);
    });
    
    // Close Modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            hideModal(modal);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            hideModal(e.target);
        }
    });
    
    function showModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function hideModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
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
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (email && password) {
            alert('Login berhasil!');
            hideModal(loginModal);
            // In a real app, you would handle authentication here
        } else {
            alert('Silakan isi semua field!');
        }
    });
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const userType = document.getElementById('user-type').value;
        
        // Validation
        if (!fullname || !email || !password || !confirmPassword || !userType) {
            alert('Silakan isi semua field yang wajib!');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak cocok!');
            return;
        }
        
        if (userType === 'school') {
            const schoolName = document.getElementById('school-name').value;
            if (!schoolName) {
                alert('Silakan isi nama sekolah!');
                return;
            }
        }
        
        alert('Pendaftaran berhasil! Silakan login dengan akun Anda.');
        hideModal(registerModal);
        showModal(loginModal);
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
    
    // Feature Card Click Handlers
    function openQuestionnaire() {
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById('questionnaire').classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function openFaceScanner() {
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById('faceScanner').classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    function openChatbot() {
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById('chatbot').classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Show register modal from "Bergabung Sekarang" button
    function showRegisterModal() {
        showModal(registerModal);
    }
    
    // Questionnaire Functionality
    const questionnaireForm = document.getElementById('questionnaireForm');
    const questions = document.querySelectorAll('.question');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressBar = document.getElementById('progressBar');
    
    let currentQuestion = 0;
    
    function showQuestion(index) {
        questions.forEach((question, i) => {
            question.classList.remove('active');
            if (i === index) {
                question.classList.add('active');
            }
        });
        
        // Update progress bar
        const progress = ((index + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        
        // Update button states
        prevBtn.disabled = index === 0;
        nextBtn.classList.toggle('hidden', index === questions.length - 1);
        submitBtn.classList.toggle('hidden', index !== questions.length - 1);
    }
    
    nextBtn.addEventListener('click', function() {
        // Validate current question
        const currentQuestionElement = questions[currentQuestion];
        const inputs = currentQuestionElement.querySelectorAll('input[type="radio"]');
        let answered = false;
        
        inputs.forEach(input => {
            if (input.checked) answered = true;
        });
        
        if (!answered) {
            alert('Silakan pilih salah satu jawaban sebelum melanjutkan!');
            return;
        }
        
        currentQuestion++;
        showQuestion(currentQuestion);
    });
    
    prevBtn.addEventListener('click', function() {
        currentQuestion--;
        showQuestion(currentQuestion);
    });
    
    questionnaireForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Calculate score
        let totalScore = 0;
        const radioGroups = document.querySelectorAll('input[type="radio"]:checked');
        
        radioGroups.forEach(radio => {
            totalScore += parseInt(radio.value);
        });
        
        // Determine risk level
        let riskLevel, message;
        if (totalScore <= 5) {
            riskLevel = "Rendah";
            message = "Hasil menunjukkan risiko rendah terhadap penggunaan narkoba. Tetap pertahankan gaya hidup sehat Anda!";
        } else if (totalScore <= 10) {
            riskLevel = "Sedang";
            message = "Hasil menunjukkan beberapa tanda yang perlu diperhatikan. Pertimbangkan untuk berbicara dengan konselor atau tenaga profesional.";
        } else {
            riskLevel = "Tinggi";
            message = "Hasil menunjukkan tanda-tanda yang mengkhawatirkan. Kami sangat menyarankan Anda untuk segera menghubungi profesional kesehatan mental atau lembaga terkait seperti BNN.";
        }
        
                // Show result modal
        const resultContent = document.getElementById('resultContent');
        resultContent.innerHTML = `
            <h3>Hasil Kuesioner Deteksi Dini</h3>
            <p>Total Skor: <span class="result-score">${totalScore}</span></p>
            <p>Tingkat Risiko: <strong>${riskLevel}</strong></p>
            <div class="result-message">${message}</div>
        `;
        
        showModal(resultModal);
        
        // Reset questionnaire
        currentQuestion = 0;
        showQuestion(currentQuestion);
        questionnaireForm.reset();
    });
    
    // Face Scanner Functionality
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const startScannerBtn = document.getElementById('startScanner');
    const captureBtn = document.getElementById('captureBtn');
    const retryBtn = document.getElementById('retryBtn');
    const saveResultBtn = document.getElementById('saveResult');
    const resultContainer = document.getElementById('resultContainer');
    const emotionResults = document.getElementById('emotionResults');
    
    let stream = null;
    let capturedImage = null;
    
    startScannerBtn.addEventListener('click', async function() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            startScannerBtn.classList.add('hidden');
            captureBtn.classList.remove('hidden');
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Tidak dapat mengakses kamera. Pastikan Anda memberikan izin akses kamera.");
        }
    });
    
    captureBtn.addEventListener('click', function() {
        // Draw video frame to canvas
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Stop video stream
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        
        capturedImage = canvas.toDataURL('image/png');
        
        // Simulate emotion detection (in a real app, this would call an AI API)
        const emotions = {
            "Kebahagiaan": Math.random() * 100,
            "Kesedihan": Math.random() * 100,
            "Kemarahan": Math.random() * 100,
            "Ketakutan": Math.random() * 100,
            "Netral": Math.random() * 100
        };
        
        // Display results
        emotionResults.innerHTML = '';
        for (const [emotion, value] of Object.entries(emotions)) {
            const emotionItem = document.createElement('div');
            emotionItem.className = 'emotion-item';
            emotionItem.innerHTML = `
                <span class="emotion-name">${emotion}</span>
                <span class="emotion-value">${value.toFixed(1)}%</span>
            `;
            emotionResults.appendChild(emotionItem);
        }
        
        captureBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        resultContainer.classList.remove('hidden');
    });
    
    retryBtn.addEventListener('click', function() {
        resultContainer.classList.add('hidden');
        retryBtn.classList.add('hidden');
        startScannerBtn.classList.remove('hidden');
        video.srcObject = null;
        capturedImage = null;
    });
    
    saveResultBtn.addEventListener('click', function() {
        alert("Hasil pemindaian wajah telah disimpan. Anda dapat melihatnya di dashboard Anda.");
        // In a real app, you would save the results to a database
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById('home').classList.remove('hidden');
    });
    
    // Chatbot Functionality
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    
    const botResponses = {
        "halo": "Halo! Ada yang bisa saya bantu terkait pencegahan narkoba?",
        "hi": "Halo! Ada yang bisa saya bantu terkait pencegahan narkoba?",
        "narkoba": "Narkoba adalah zat berbahaya yang dapat merusak kesehatan fisik dan mental. Apakah Anda ingin tahu tentang bahaya narkoba atau cara pencegahannya?",
        "bahaya": "Bahaya narkoba antara lain: kerusakan organ tubuh, gangguan mental, ketergantungan, masalah sosial, dan kematian. Mau tahu lebih detail tentang salah satunya?",
        "pencegahan": "Pencegahan narkoba bisa dilakukan dengan: 1) Memperkuat iman dan spiritualitas, 2) Memilih pergaulan yang baik, 3) Mengisi waktu dengan kegiatan positif, 4) Meningkatkan pengetahuan tentang bahaya narkoba. Mana yang ingin Anda tanyakan lebih lanjut?",
        "bantuan": "Kami bisa membantu dengan: 1) Deteksi dini risiko narkoba, 2) Konseling online, 3) Rujukan ke lembaga rehabilitasi, 4) Informasi pencegahan. Mana yang Anda butuhkan?",
        "rehabilitasi": "Jika Anda atau orang terdekat membutuhkan rehabilitasi, kami bisa merujuk ke BNN atau lembaga rehabilitasi terdekat. Apakah Anda ingin informasi kontak lembaga rehabilitasi di daerah Anda?",
        "terima kasih": "Sama-sama! Jangan ragu bertanya lagi jika ada yang ingin diketahui. Ingat, sayangi diri Anda dengan menjauhi narkoba!",
        "default": "Maaf, saya tidak mengerti pertanyaan Anda. Coba tanyakan tentang: bahaya narkoba, pencegahan, atau bantuan yang tersedia."
    };
    
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const now = new Date();
        const timeString = now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0');
        
        messageDiv.innerHTML = `
            <div class="message-content">${message}</div>
            <div class="message-time">${timeString}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        
        for (const [keyword, response] of Object.entries(botResponses)) {
            if (lowerCaseMessage.includes(keyword)) {
                return response;
            }
        }
        
        return botResponses.default;
    }
    
    sendMessageBtn.addEventListener('click', function() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            
            // Simulate typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'message bot-message';
            typingIndicator.innerHTML = `
                <div class="message-content"><i>SafeTeen Bot sedang mengetik...</i></div>
            `;
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Simulate delay for bot response
            setTimeout(() => {
                chatMessages.removeChild(typingIndicator);
                const botResponse = getBotResponse(message);
                addMessage(botResponse);
            }, 1000 + Math.random() * 2000);
        }
    });
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessageBtn.click();
        }
    });
    
    // Result Modal Actions
    const consultBtn = document.getElementById('consultBtn');
    const reportBtn = document.getElementById('reportBtn');
    
    consultBtn.addEventListener('click', function() {
        hideModal(resultModal);
        openChatbot();
    });
    
    reportBtn.addEventListener('click', function() {
        alert("Laporan Anda telah dikirim ke pihak berwenang. Terima kasih atas kewaspadaan Anda.");
        hideModal(resultModal);
    });
    
    // Initialize first question
    showQuestion(currentQuestion);
});
