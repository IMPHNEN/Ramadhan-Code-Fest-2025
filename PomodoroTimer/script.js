document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.querySelector('.timer-display');
    const modeIndicator = document.querySelector('.mode-indicator');
    const startBtn = document.getElementById('start');
    const pauseBtn = document.getElementById('pause');
    const resetBtn = document.getElementById('reset');
    const skipBtn = document.getElementById('skip');
    const focusTimeInput = document.getElementById('focusTime');
    const breakTimeInput = document.getElementById('breakTime');
    const longBreakTimeInput = document.getElementById('longBreakTime');
    const progressBar = document.getElementById('progress');
    const completedCounter = document.getElementById('completed');
    const animeGirlPopup = document.getElementById('animeGirlPopup');
    const animeGirlMessage = document.getElementById('animeGirlMessage');
    const closePopupBtn = document.getElementById('closePopup');
    
    let timer;
    let minutes;
    let seconds;
    let isRunning = false;
    let currentMode = 'focus';
    let pomodorosCompleted = 0;
    let timeLeft;
    let totalTime;
    let popupTimer;
    
    // edgy quotes buat si paling motivasi
    const animeQuotes = [
        "I'll take a potato chip... and eat it!",
        "You should enjoy the little detours to the fullest. - Hunter x Hunter",
        "The only ones who should kill are those prepared to be killed. - Code Geass",
        "If you don't take risks, you can't create a future! - One Piece",
        "Whatever happens, happens. - Cowboy Bebop",
        "The world isn't perfect. But it's there for us, doing the best it can. - Fullmetal Alchemist",
        "Hard work betrays none. - Oregairu",
        "Sometimes, the questions are complicated and the answers are simple. - Durarara!!",
    ];
    
    const motivationMessages = [
        "Ganbare! Don't give up!",
        "You're doing great! Keep it up!",
        "Stay focused, you're making progress!",
        "Remember your goals! You can do this!",
        "Just a little more effort! You got this!",
        "Take a deep breath and keep going!",
        "Your dedication is inspiring!",
        "Focus on the present moment!",
        "I believe in you! Keep pushing forward!",
        "Hard work now means success later!",
        "Every minute of focus brings you closer to your goals!",
        "You're stronger than you think!",
        "Victory comes to those who persevere!",
        "One more step forward is one step closer to success!",
        "Your future self will thank you for this effort!"
    ];
    
    const breakEmojis = ['🎉', '✨', '🌟', '💫', '🍜', '🍙', '🍣', '🎌', '🏮', '🍵'];
    
    const setTimer = (mins) => {
        clearInterval(timer);
        minutes = mins;
        seconds = 0;
        timeLeft = minutes * 60 + seconds;
        totalTime = timeLeft;
        displayTime();
        updateProgress();
    };
    
    const displayTime = () => {
        const displayMins = minutes < 10 ? `0${minutes}` : minutes;
        const displaySecs = seconds < 10 ? `0${seconds}` : seconds;
        timerDisplay.textContent = `${displayMins}:${displaySecs}`;
    };
    
    // update progress bar
    const updateProgress = () => {
        const percentage = ((totalTime - timeLeft) / totalTime) * 100;
        progressBar.style.width = `${percentage}%`;
    };
    
    // Ssart timer
    const startTimer = () => {
        if (isRunning) return;
        
        isRunning = true;
        scheduleRandomPopups();
        timer = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timer);
                    isRunning = false;
                    
                    if (currentMode === 'focus') {
                        pomodorosCompleted++;
                        completedCounter.textContent = pomodorosCompleted;
                        showEmojiCelebration();
                        
                        if (pomodorosCompleted % 4 === 0) {
                            currentMode = 'longBreak';
                            modeIndicator.textContent = 'Long Break';
                            setTimer(parseInt(longBreakTimeInput.value));
                        } else {
                            currentMode = 'break';
                            modeIndicator.textContent = 'Break Time';
                            setTimer(parseInt(breakTimeInput.value));
                        }
                        
                        showRandomQuote();
                    } else {
                        currentMode = 'focus';
                        modeIndicator.textContent = 'Focus Mode';
                        setTimer(parseInt(focusTimeInput.value));
                    }
                    
                    // auto start mode
                    startTimer();
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            
            timeLeft--;
            updateProgress();
            displayTime();
        }, 1000);
    };
    
    // pause timer
    const pauseTimer = () => {
        clearInterval(timer);
        clearTimeout(popupTimer);
        isRunning = false;
    };
    
    // reset timer
    const resetTimer = () => {
        pauseTimer();
        if (currentMode === 'focus') {
            setTimer(parseInt(focusTimeInput.value));
        } else if (currentMode === 'break') {
            setTimer(parseInt(breakTimeInput.value));
        } else {
            setTimer(parseInt(longBreakTimeInput.value));
        }
    };
    
    // skip mode
    const skipToNext = () => {
        pauseTimer();
        
        if (currentMode === 'focus') {
            pomodorosCompleted++;
            completedCounter.textContent = pomodorosCompleted;
            
            if (pomodorosCompleted % 4 === 0) {
                currentMode = 'longBreak';
                modeIndicator.textContent = 'Long Break';
                setTimer(parseInt(longBreakTimeInput.value));
            } else {
                currentMode = 'break';
                modeIndicator.textContent = 'Break Time';
                setTimer(parseInt(breakTimeInput.value));
            }
        } else {
            currentMode = 'focus';
            modeIndicator.textContent = 'Focus Mode';
            setTimer(parseInt(focusTimeInput.value));
        }
    };
    
    // random quote
    const showRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * animeQuotes.length);
        const quote = animeQuotes[randomIndex];
        
        const quoteElement = document.createElement('div');
        quoteElement.textContent = quote;
        quoteElement.style.position = 'fixed';
        quoteElement.style.top = '50%';
        quoteElement.style.left = '50%';
        quoteElement.style.transform = 'translate(-50%, -50%)';
        quoteElement.style.background = 'rgba(0, 0, 0, 0.7)';
        quoteElement.style.padding = '20px';
        quoteElement.style.borderRadius = '10px';
        quoteElement.style.zIndex = '100';
        quoteElement.style.fontSize = '18px';
        quoteElement.style.textAlign = 'center';
        quoteElement.style.maxWidth = '80%';
        quoteElement.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        
        document.body.appendChild(quoteElement);
        
        setTimeout(() => {
            quoteElement.style.opacity = '0';
            quoteElement.style.transition = 'opacity 1s ease';
            
            setTimeout(() => {
                document.body.removeChild(quoteElement);
            }, 1000);
        }, 3000);
    };
    
    // emoji when finished
    const showEmojiCelebration = () => {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                const randomEmoji = breakEmojis[Math.floor(Math.random() * breakEmojis.length)];
                
                emoji.textContent = randomEmoji;
                emoji.classList.add('emoji');
                emoji.style.left = Math.random() * 100 + 'vw';
                emoji.style.fontSize = (Math.random() * 20 + 20) + 'px';
                emoji.style.animationDuration = (Math.random() * 3 + 3) + 's';
                
                document.body.appendChild(emoji);
                
                setTimeout(() => {
                    document.body.removeChild(emoji);
                }, 6000);
            }, i * 300);
        }
    };
    
    const showAnimeGirlPopup = () => {
        const randomIndex = Math.floor(Math.random() * motivationMessages.length);
        animeGirlMessage.textContent = motivationMessages[randomIndex];
        
        animeGirlPopup.style.bottom = '20px';
        
        setTimeout(() => {
            hideAnimeGirlPopup();
        }, 5000);
    };
    
    const hideAnimeGirlPopup = () => {
        animeGirlPopup.style.bottom = '-300px';
    };
    
    const scheduleRandomPopups = () => {
        if (!isRunning || currentMode !== 'focus') return;
        const minTime = 30000;
        const maxTime = 50000; 
        const randomTime = Math.floor(Math.random() * (maxTime - minTime)) + minTime;
        
        popupTimer = setTimeout(() => {
            showAnimeGirlPopup();
            scheduleRandomPopups();
        }, randomTime);
    };
    
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    skipBtn.addEventListener('click', skipToNext);
    closePopupBtn.addEventListener('click', hideAnimeGirlPopup);
    
    focusTimeInput.addEventListener('change', () => {
        if (currentMode === 'focus' && !isRunning) {
            setTimer(parseInt(focusTimeInput.value));
        }
    });
    
    breakTimeInput.addEventListener('change', () => {
        if (currentMode === 'break' && !isRunning) {
            setTimer(parseInt(breakTimeInput.value));
        }
    });
    
    longBreakTimeInput.addEventListener('change', () => {
        if (currentMode === 'longBreak' && !isRunning) {
            setTimer(parseInt(longBreakTimeInput.value));
        }
    });
    
    setTimer(parseInt(focusTimeInput.value));
});