document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Background Floating Hearts ---
    const bgContainer = document.getElementById('background-hearts');
    
    function createHeart() {
        if (!bgContainer) return;
        const heart = document.createElement('div');
        heart.classList.add('bg-heart');
        heart.innerHTML = '❤️';
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        const duration = Math.random() * 3 + 2;
        
        bgContainer.appendChild(heart);
        
        if (typeof gsap !== "undefined") {
            gsap.fromTo(heart, 
                { y: '100vh', opacity: 0 }, 
                { y: '-10vh', opacity: 0.5, duration: duration, ease: "linear", 
                  onComplete: () => heart.remove() }
            );
        }
    }
    
    setInterval(createHeart, 300);

    // --- 2. Loading Screen Logic ---
    const progressBar = document.getElementById('progress');
    const loadingScreen = document.getElementById('loading-screen');
    const giftScreen = document.getElementById('gift-screen');
    
    let loadProgress = 0;
    const loadInterval = setInterval(() => {
        loadProgress += Math.random() * 15;
        if (loadProgress > 100) loadProgress = 100;
        
        if (progressBar) progressBar.style.width = loadProgress + '%';
        
        if (loadProgress === 100) {
            clearInterval(loadInterval);
            setTimeout(() => {
                if (loadingScreen && giftScreen) {
                    loadingScreen.classList.remove('active');
                    loadingScreen.classList.add('hidden');
                    
                    giftScreen.classList.remove('hidden');
                    giftScreen.classList.add('active');
                }
            }, 800);
        }
    }, 400);

    // --- 3. Gift Box Interaction ---
    const giftBox = document.getElementById('gift-box');
    const bgMusic = document.getElementById('bg-music');
    const mainContent = document.getElementById('main-content');
    
    if (giftBox) {
        giftBox.addEventListener('click', () => {
            if (bgMusic) {
                bgMusic.play().catch(e => console.log("Audio blocked:", e));
            }
            
            if (typeof confetti !== "undefined") {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#ff4d85', '#ffb3c6', '#ffffff']
                });
            }

            if (typeof gsap !== "undefined") {
                gsap.to(giftScreen, {
                    opacity: 0, 
                    duration: 1, 
                    onComplete: () => {
                        giftScreen.classList.remove('active');
                        giftScreen.classList.add('hidden');
                        
                        mainContent.classList.remove('hidden');
                        mainContent.classList.add('active');
                    }
                });
            }
        });
    }

    // --- 4. Password Screen Logic ---
    const submitBtn = document.getElementById('submit-password');
    const passwordInput = document.getElementById('secret-password');
    const errorText = document.getElementById('password-error');
    const passwordSection = document.getElementById('password-section');
    const protectedContent = document.getElementById('protected-content');
    
    const secretWord = "jannu"; // Strictly lowercase

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const userInput = passwordInput.value.toLowerCase().trim();
            
            if (userInput === secretWord) {
                if (typeof gsap !== "undefined") {
                    gsap.to(passwordSection, {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            passwordSection.classList.add('hidden-section');
                            protectedContent.classList.remove('hidden');
                            startTypingLetter(); 
                        }
                    });
                }
            } else {
                errorText.classList.remove('hidden');
                if (typeof gsap !== "undefined") {
                    gsap.fromTo(passwordSection, 
                        { x: -10 }, { x: 10, yoyo: true, repeat: 5, duration: 0.1 }
                    );
                }
            }
        });
    }

    // --- 5. Typing Love Letter ---
    function startTypingLetter() {
        const continueBtn = document.getElementById('continue-journey');
        
        if (typeof Typed !== "undefined") {
            new Typed('#typed-text', {
                strings: [`
                    Happy Birthday, My Pretty Little Baby ❤️ ^1000 <br><br> 
                    Every day with you has become my favorite memory. You make my ordinary days magical with your smile and your love. ^500 Thank you for always being by my side. I hope this birt[...]
                    Today, on your birthday, I also want to say something that's been in my heart. ^1000 <br><br> 
                    I know I haven't always been the boyfriend you deserve. ^500 There have been moments when I was rude, aggressive, stubborn, and let my ego get the better of me. ^500 Sometimes[...]
                    Looking back, I realize there were times when my attitude or the way I spoke was unfair to you. You deserved more patience, more understanding, and more kindness from me. ^100[...]
                    Please know that none of those moments came from a lack of love. ^500 My intentions have always been genuine, even when my actions didn't reflect them. ^500 That's not an excu[...]
                    Thank you for loving me even on the days when I made it difficult. ^500 Thank you for believing in us and for standing beside me through my imperfections. ^1000 <br><br> 
                    I promise to keep making beautiful memories with you, laughing with you, supporting you, respecting you, and loving you a little more every single day. ^500 I want to be someo[...]
                    Happy Birthday, Jannu. ❤️ ^1000 <br><br> 
                    No matter what tomorrow brings, I will always be grateful that you came into my life. ^500 You are my happiest place, my biggest blessing, and the most beautiful chapter of my[...]
                    I love you more than words could ever express. ^1000 <br><br> 
                    Forever yours. ❤️
                `],
                typeSpeed: 45, 
                backSpeed: 30,
                showCursor: true,
                cursorChar: '|',
                onComplete: () => {
                    continueBtn.classList.remove('hidden');
                    if (typeof gsap !== "undefined") {
                        gsap.fromTo(continueBtn, {opacity: 0}, {opacity: 1, duration: 1});
                    }
                }
            });
        }
    }

    // --- 6. Continue to Gallery ---
    const continueBtn = document.getElementById('continue-journey');
    const loveLetterSection = document.getElementById('love-letter-section');
    const gallerySection = document.getElementById('gallery-section');

    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            if (typeof gsap !== "undefined") {
                gsap.to(loveLetterSection, {
                    opacity: 0,
                    duration: 0.8,
                    onComplete: () => {
                        loveLetterSection.classList.remove('active-section');
                        loveLetterSection.classList.add('hidden-section');
                        
                        gallerySection.classList.remove('hidden-section');
                        gallerySection.classList.add('active-section');
                        
                        gsap.from(".polaroid", {
                            opacity: 0, 
                            y: 50, 
                            stagger: 0.2, 
                            duration: 0.8, 
                            ease: "back.out(1.7)"
                        });
                    }
                });
            }
        });
    }

    // --- 7. Navigation: Gallery to Timeline ---
    const toTimelineBtn = document.getElementById('to-timeline-btn');
    const timelineSection = document.getElementById('timeline-section');

    if (toTimelineBtn) {
        toTimelineBtn.addEventListener('click', () => {
            if (typeof gsap !== "undefined") {
                gsap.to(gallerySection, {
                    opacity: 0, duration: 0.8,
                    onComplete: () => {
                        gallerySection.classList.remove('active-section');
                        gallerySection.classList.add('hidden-section');
                        
                        timelineSection.classList.remove('hidden-section');
                        timelineSection.classList.add('active-section');
                        
                        gsap.from(".timeline-item", {
                            opacity: 0, 
                            x: (i) => i % 2 === 0 ? -50 : 50, 
                            stagger: 0.3, 
                            duration: 1,
                            ease: "power2.out"
                        });
                    }
                });
            }
        });
    }

    // --- 8. Navigation: Timeline to Reasons ---
    const toReasonsBtn = document.getElementById('to-reasons-btn');
    const reasonsSection = document.getElementById('reasons-section');
    const reasonsList = [
        "Your beautiful smile 😊", 
        "The way your eyes light up ❤️", 
        "Because you never gave up on me.", 
        "Your caring heart.",
        "The way you make me feel safe.",
        "Your cute voice when you're sleepy 😴",
        "Because you are my best friend."
    ];

    if (toReasonsBtn) {
        toReasonsBtn.addEventListener('click', () => {
            if (typeof gsap !== "undefined") {
                gsap.to(timelineSection, {
                    opacity: 0, duration: 0.8,
                    onComplete: () => {
                        timelineSection.classList.remove('active-section');
                        timelineSection.classList.add('hidden-section');
                        
                        reasonsSection.classList.remove('hidden-section');
                        reasonsSection.classList.add('active-section');
                        generateHearts();
                    }
                });
            }
        });
    }

    function generateHearts() {
        const container = document.getElementById('reasons-container');
        const reasonDisplay = document.getElementById('reason-display');
        const reasonText = document.getElementById('reason-text');
        const toStarsBtn = document.getElementById('to-stars-btn');
        let clickedHearts = 0;

        reasonsList.forEach((reason) => {
            const heart = document.createElement('div');
            heart.classList.add('interactive-heart');
            heart.innerHTML = '💖';
            
            heart.style.animationDelay = `${Math.random() * 2}s`;

            heart.addEventListener('click', () => {
                reasonText.innerHTML = reason;
                reasonDisplay.classList.add('show');
                
                clickedHearts++;
                if (clickedHearts >= 3 && toStarsBtn) {
                    toStarsBtn.classList.remove('hidden');
                    if (typeof gsap !== "undefined") {
                        gsap.to(toStarsBtn, {opacity: 1, duration: 1});
                    }
                }
            });
            container.appendChild(heart);
        });
        
        if (typeof gsap !== "undefined") {
            gsap.from(".interactive-heart", { opacity: 0, scale: 0, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)"});
        }
    }

    // --- 9. Navigation: Reasons to Stars ---
    const toStarsBtn = document.getElementById('to-stars-btn');
    const starsSection = document.getElementById('stars-section');
    const starMessages = [
        "You are my safe place ❤️",
        "I promise to be better for you.",
        "You're the best thing that ever happened to me.",
        "Forever and always. ✨"
    ];

    if (toStarsBtn) {
        toStarsBtn.addEventListener('click', () => {
            if (typeof gsap !== "undefined") {
                gsap.to(reasonsSection, {
                    opacity: 0, duration: 0.8,
                    onComplete: () => {
                        reasonsSection.classList.remove('active-section');
                        reasonsSection.classList.add('hidden-section');
                        
                        starsSection.classList.remove('hidden-section');
                        starsSection.classList.add('active-section');
                        generateStars();
                    }
                });
            }
        });
    }

    function generateStars() {
        const sky = document.getElementById('starry-sky');
        const msgDisplay = document.getElementById('star-message-display');
        const msgText = document.getElementById('star-message-text');
        const finaleBtn = document.getElementById('to-finale-btn');
        let clickedStars = 0;

        starMessages.forEach((msg) => {
            const star = document.createElement('div');
            star.classList.add('clickable-star');
            star.innerHTML = '⭐';
            
            star.style.left = `${Math.random() * 80 + 10}%`;
            star.style.top = `${Math.random() * 70 + 10}%`;
            star.style.animationDelay = `${Math.random() * 2}s`;

            star.addEventListener('click', () => {
                msgText.innerHTML = msg;
                msgDisplay.classList.add('show');
                star.style.color = "#ff4d85";
                
                clickedStars++;
                if (clickedStars === starMessages.length && finaleBtn) {
                    finaleBtn.classList.remove('hidden');
                    if (typeof gsap !== "undefined") {
                        gsap.to(finaleBtn, {opacity: 1, duration: 1, y: -20});
                    }
                }
            });
            sky.appendChild(star);
        });
        
        if (typeof gsap !== "undefined") {
            gsap.from(".clickable-star", { opacity: 0, scale: 0, stagger: 0.3, duration: 1});
        }
    }
});
