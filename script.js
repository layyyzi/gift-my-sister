document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    createFireworks();
    initializePhotoGallery();
    addConfettiEffect();
    initializeScrollAnimations();
    
    // 🎉 Запускаємо конфетті при завантаженні сторінки
    setTimeout(() => {
        launchWelcomeConfetti();
    }, 1000);
});

function launchWelcomeConfetti() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#00d2d3', '#ff9f43'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-20px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            document.body.appendChild(confetti);
            
            let position = -20;
            let rotation = Math.random() * 360;
            let opacity = 1;
            let velocityX = (Math.random() - 0.5) * 2;
            let velocityY = Math.random() * 3 + 2;
            
            const fall = setInterval(() => {
                position += velocityY;
                rotation += 5;
                opacity -= 0.005;
                velocityX *= 0.99;
                
                const currentLeft = parseFloat(confetti.style.left);
                confetti.style.left = (currentLeft + velocityX) + '%';
                confetti.style.top = position + 'px';
                confetti.style.transform = `rotate(${rotation}deg)`;
                confetti.style.opacity = opacity;
                
                if (position > window.innerHeight || opacity <= 0) {
                    clearInterval(fall);
                    confetti.remove();
                }
            }, 20);
        }, i * 30);
    }
}

function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💘', '💓'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out`;
        heart.style.opacity = '0.7';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 2000);
}

function createFireworks() {
    const fireworksContainer = document.querySelector('.fireworks');
    
    setInterval(() => {
        createFirework(fireworksContainer);
    }, 3000);
}

function createFirework(container) {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = Math.random() * 100 + 50;
        particle.style.setProperty('--x', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--y', Math.sin(angle) * velocity + 'px');
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}


function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.background = color;
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = '50%';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    
    document.body.appendChild(confetti);
    
    let position = -10;
    let rotation = 0;
    let opacity = 1;
    
    const fall = setInterval(() => {
        position += 5;
        rotation += 10;
        opacity -= 0.02;
        
        confetti.style.top = position + 'px';
        confetti.style.transform = `rotate(${rotation}deg)`;
        confetti.style.opacity = opacity;
        
        if (position > window.innerHeight || opacity <= 0) {
            clearInterval(fall);
            confetti.remove();
        }
    }, 20);
}

function initializePhotoGallery() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            showPhotoModal(index);
        });
        
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

function showPhotoModal(index) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 500px;
        animation: slideIn 0.5s ease;
    `;
    
    const messages = [
        "Твій найщасливіший момент! 🌟",
        "Святковий настрій! 🎉",
        "Прекрасна посмішка! 😊",
        "Незабутні спогади! 💖"
    ];
    
    content.innerHTML = `
        <h2 style="color: #ff6b6b; margin-bottom: 20px;">Фото спогад #${index + 1}</h2>
        <p style="font-size: 1.2rem; color: #666; margin-bottom: 20px;">${messages[index]}</p>
        <div style="font-size: 4rem; margin-bottom: 20px;">📸</div>
        <button onclick="this.parentElement.parentElement.remove()" style="
            background: linear-gradient(45deg, #ff6b6b, #feca57);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 1.1rem;
        ">Закрити</button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function addConfettiEffect() {
    const wishCards = document.querySelectorAll('.wish-card');
    
    wishCards.forEach(card => {
        card.addEventListener('click', function() {
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
                    createConfetti(colors[Math.floor(Math.random() * colors.length)]);
                }, i * 50);
            }
        });
    });
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

function createBirthdaySong() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [262, 294, 330, 262, 262, 294, 330, 262, 330, 349, 392, 330, 349, 392];
    const duration = 0.5;
    
    notes.forEach((frequency, index) => {
        setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        }, index * duration * 1000);
    });
}

document.addEventListener('click', function(e) {
    if (e.target.closest('.age-badge')) {
        createBirthdaySong();
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];
                createConfetti(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 30);
        }
    }
});

setInterval(() => {
    const randomCard = document.querySelectorAll('.wish-card')[Math.floor(Math.random() * document.querySelectorAll('.wish-card').length)];
    randomCard.style.transform = 'scale(1.1)';
    setTimeout(() => {
        randomCard.style.transform = 'scale(1)';
    }, 500);
}, 5000);
