document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. PROFESSIONAL CANVAS PARTICLE ENGINE
    // ==========================================
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    let mouse = { x: null, y: null, radius: 120 };

    window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
    window.addEventListener('touchmove', (e) => { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; });
    window.addEventListener('mouseout', () => { mouse.x = undefined; mouse.y = undefined; });
    window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; initParticles(); });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1; 
            this.baseSize = this.size;
            this.speedX = (Math.random() * 1) - 0.5;
            this.speedY = -(Math.random() * 1.5 + 0.5); 
            const colors = ['rgba(255, 77, 133, 0.7)', 'rgba(255, 179, 198, 0.6)', 'rgba(255, 255, 255, 0.8)'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.y < 0 - this.size) {
                this.y = canvas.height + this.size;
                this.x = Math.random() * canvas.width;
            }
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x -= forceDirectionX * force * 3;
                    this.y -= forceDirectionY * force * 3;
                    if (this.size < this.baseSize * 2.5) this.size += 0.2;
                } else if (this.size > this.baseSize) {
                    this.size -= 0.1;
                }
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.width * canvas.height) / 9000;
        if (numberOfParticles > 150) numberOfParticles = 150; 
        for (let i = 0; i < numberOfParticles; i++) particlesArray.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }
    initParticles();
    animateParticles();

    // ==========================================
    // 2. MAGNETIC BUTTONS (Simple Interaction)
    // ==========================================
    const magneticButtons = document.querySelectorAll('.glow-btn');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        });
    });

    // ==========================================
    // 3. STORYLINE & PROGRESSION LOGIC
    // ==========================================
    const progressBar = document.getElementById('progress');
    const loadingScreen = document.getElementById('loading-screen');
    const giftScreen = document.getElementById('gift-screen');
    const bgMusic = document.getElementById('bg-music');
    const mainContent = document.getElementById('main-content');
    const giftContainer = document.querySelector('.gift-container');
    
    // Loading Screen
    let loadProgress = 0;
    const loadInterval = setInterval(() => {
        loadProgress += Math.random() * 15;
        if (loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(loadInterval);
            progressBar.style.width = '100%';
            setTimeout(() => {
                loadingScreen.classList.remove('active');
                loadingScreen.classList.add('hidden');
                giftScreen.classList.remove('hidden');
                giftScreen.classList.add('active');
            }, 800);
        } else {
            progressBar.style.width = loadProgress + '%';
        }
    }, 400);

    // Gift Box (Mobile & Desktop Friendly)
    ['click', 'touchstart'].forEach(evt => {
        giftContainer.addEventListener(evt, (e) => {
            e.preventDefault(); 
            if(bgMusic) bgMusic.play().catch(err => console.log("Audio blocked:", err));
            
            if (typeof gsap !== "undefined") {
                gsap.to(giftScreen, { opacity: 0, duration: 0.8, onComplete: () => {
                    giftScreen.classList.remove('active');
                    giftScreen.classList.add('hidden');
                    mainContent.classList.remove('hidden');
                    mainContent.classList.add('active');
                    mainContent.style.opacity = 1;
                }});
            } else {
                giftScreen.classList.remove('active');
                giftScreen.classList.add('hidden');
                mainContent.classList.remove('hidden');
                mainContent.classList.add('active');
            }
        }, { once: true });
    });

    // Password Lock
    const submitBtn = document.getElementById('submit-password');
    const passwordInput = document.getElementById('secret-password');
    const passwordSection = document.getElementById('password-section');
    const protectedContent = document.getElementById('protected-content');
    
    submitBtn.addEventListener('click', () => {
        const pass = passwordInput.value.toLowerCase().trim();
        if (pass === "jannu" || pass === "baby") {
            gsap.to(passwordSection, { opacity: 0, duration: 0.5, onComplete: () => {
                passwordSection.classList.add('hidden-section');
                protectedContent.classList.remove('hidden');
                startTypingLetter(); 
            }});
        } else {
            document.getElementById('password-error').classList.remove('hidden');
            gsap.fromTo(passwordSection, { x: -10 }, { x: 10, yoyo: true, repeat: 5, duration: 0.1 });
        }
    });

    // Letter Typing
    function startTypingLetter() {
        new Typed('#typed-text', {
            strings: [`Happy Birthday, My Pretty Little Baby ❤️ ^1000 <br><br>
            Every day with you has become my favorite memory. You make my ordinary days magical with your smile and your love. ^500 Thank you for always being by my side. I hope this birthday brings you as much happiness as you bring into my life. ^1000 <br><br>
            Today, on your birthday, I also want to say something that's been in my heart. ^1000 <br><br>
            I know I haven't always been the boyfriend you deserve. ^500 There have been moments when I was rude, aggressive, stubborn, and let my ego get the better of me. ^500 Sometimes my words have hurt you, and for that, I am truly sorry. ^1000 <br><br>
            Please know that none of those moments came from a lack of love. ^500 My intentions have always been genuine, even when my actions didn't reflect them. ^500 That's not an excuse—it's simply my promise that I want to become a better person, not just for us, but because you inspire me to be better every day. ^1500 <br><br>
            Thank you for loving me even on the days when I made it difficult. ^500 Thank you for believing in us and for standing beside me through my imperfections. ^1000 <br><br>
            I promise to keep making beautiful memories with you, laughing with you, supporting you, respecting you, and loving you a little more every single day. ^500 I want to be someone who gives you peace, happiness, and countless reasons to smile. ^1000 <br><br>
            Happy Birthday, Jannu. ❤️ ^1000 <br><br>
            Forever yours. ❤️`],
            typeSpeed: 45, backSpeed: 30, showCursor: true, cursorChar: '|',
            onComplete: () => {
                const btn = document.getElementById('continue-journey');
                btn.classList.remove('hidden');
                gsap.fromTo(btn, {opacity: 0}, {opacity: 1, duration: 1});
            }
        });
    }

    // Navigation: Letter -> Gallery (Confetti & 3D Polaroids)
    const continueBtn = document.getElementById('continue-journey');
    const loveLetterSection = document.getElementById('love-letter-section');
    const gallerySection = document.getElementById('gallery-section');

    continueBtn.addEventListener('click', () => {
        gsap.to(loveLetterSection, { opacity: 0, duration: 0.8, onComplete: () => {
            loveLetterSection.classList.remove('active-section');
            loveLetterSection.classList.add('hidden-section');
            gallerySection.classList.remove('hidden-section');
            gallerySection.classList.add('active-section');
            
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ff4d85', '#ffb3c6', '#ffffff']});
            gsap.from(".polaroid", { opacity: 0, y: 50, stagger: 0.2, duration: 0.8, ease: "back.out(1.7)" });

            // Initialize 3D Hover Physics for Polaroids
            const polaroids = document.querySelectorAll('.polaroid');
            polaroids.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const rotateX = ((y - (rect.height / 2)) / (rect.height / 2)) * -15; 
                    const rotateY = ((x - (rect.width / 2)) / (rect.width / 2)) * 15;
                    
                    gsap.to(card, { rotationX: rotateX, rotationY: rotateY, transformPerspective: 1000, duration: 0.3, scale: 1.1, zIndex: 10, ease: "power2.out" });
                });
                card.addEventListener('mouseleave', () => {
                    const isEven = Array.from(polaroids).indexOf(card) % 2 === 0;
                    gsap.to(card, { rotationX: 0, rotationY: 0, rotationZ: isEven ? 3 : -3, scale: 1, zIndex: 1, duration: 0.5, ease: "power2.out" });
                });
            });
        }});
    });

    // Navigation: Gallery -> Timeline
    document.getElementById('to-timeline-btn').addEventListener('click', () => {
        const timeline = document.getElementById('timeline-section');
        gsap.to(gallerySection, { opacity: 0, duration: 0.8, onComplete: () => {
            gallerySection.classList.add('hidden-section');
            timeline.classList.remove('hidden-section');
            timeline.classList.add('active-section');
            gsap.from(".timeline-item", { opacity: 0, x: (i) => i % 2 === 0 ? -50 : 50, stagger: 0.3, duration: 1, ease: "power2.out" });
        }});
    });

    // Navigation: Timeline -> Reasons
    const reasonsList = [
        "Your beautiful smile 😊", "The way your eyes light up ❤️", "Because you never gave up on me.",
        "Your caring heart.", "The way you make me feel safe.", "Your cute voice when you're sleepy 😴",
        "Because you are my best friend."
    ];
    document.getElementById('to-reasons-btn').addEventListener('click', () => {
        const reasonsSec = document.getElementById('reasons-section');
        gsap.to(document.getElementById('timeline-section'), { opacity: 0, duration: 0.8, onComplete: () => {
            document.getElementById('timeline-section').classList.add('hidden-section');
            reasonsSec.classList.remove('hidden-section');
            reasonsSec.classList.add('active-section');
            generateHearts();
        }});
    });

    function generateHearts() {
        const container = document.getElementById('reasons-container');
        const display = document.getElementById('reason-display');
        const text = document.getElementById('reason-text');
        const toStarsBtn = document.getElementById('to-stars-btn');
        let clicked = 0;

        reasonsList.forEach(reason => {
            const heart = document.createElement('div');
            heart.classList.add('interactive-heart');
            heart.innerHTML = '💖';
            heart.style.animationDelay = `${Math.random() * 2}s`;

            heart.addEventListener('click', () => {
                text.innerHTML = reason;
                display.classList.add('show');
                clicked++;
                if (clicked >= 3) {
                    toStarsBtn.classList.remove('hidden');
                    gsap.to(toStarsBtn, {opacity: 1, duration: 1});
                }
            });
            container.appendChild(heart);
        });
        gsap.from(".interactive-heart", { opacity: 0, scale: 0, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)"});
    }

    // Navigation: Reasons -> Stars
    const starMessages = [
        "You are my safe place ❤️", "I promise to be better for you.",
        "You're the best thing that ever happened to me.", "Forever and always. ✨"
    ];
    document.getElementById('to-stars-btn').addEventListener('click', () => {
        const starsSec = document.getElementById('stars-section');
        gsap.to(document.getElementById('reasons-section'), { opacity: 0, duration: 0.8, onComplete: () => {
            document.getElementById('reasons-section').classList.add('hidden-section');
            starsSec.classList.remove('hidden-section');
            starsSec.classList.add('active-section');
            generateStars();
        }});
    });

    function generateStars() {
        const sky = document.getElementById('starry-sky');
        const display = document.getElementById('star-message-display');
        const text = document.getElementById('star-message-text');
        const finaleBtn = document.getElementById('to-finale-btn');
        let clicked = 0;

        starMessages.forEach(msg => {
            const star = document.createElement('div');
            star.classList.add('clickable-star');
            star.innerHTML = '⭐';
            star.style.left = `${Math.random() * 80 + 10}%`;
            star.style.top = `${Math.random() * 70 + 10}%`;
            star.style.animationDelay = `${Math.random() * 2}s`;

            star.addEventListener('click', () => {
                text.innerHTML = msg;
                display.classList.add('show');
                star.style.color = "#ff4d85";
                clicked++;
                if (clicked === starMessages.length) {
                    finaleBtn.classList.remove('hidden');
                    gsap.to(finaleBtn, {opacity: 1, duration: 1, y: -20});
                }
            });
            sky.appendChild(star);
        });
        gsap.from(".clickable-star", { opacity: 0, scale: 0, stagger: 0.3, duration: 1});
    }
});
