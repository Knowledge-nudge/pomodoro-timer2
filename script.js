document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer-display');
    const statusDisplay = document.querySelector('.status');
    const startButton = document.getElementById('start-btn');
    const pauseButton = document.getElementById('pause-btn');
    const resetButton = document.getElementById('reset-btn');
    const focusTimeInput = document.getElementById('focus-time');
    const breakTimeInput = document.getElementById('break-time');

    let timer;
    let isRunning = false;
    let isFocus = true;
    let remainingTime = 25 * 60; // 25 minutes in seconds

    // Update timer display
    function updateDisplay() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Update status display
    function updateStatus() {
        statusDisplay.textContent = isFocus ? '集中時間' : '休憩時間';
    }

    // Start timer
    function startTimer() {
        if (!isRunning) {
            timer = setInterval(() => {
                if (remainingTime > 0) {
                    remainingTime--;
                    updateDisplay();
                } else {
                    playNotificationSound();
                    isFocus = !isFocus;
                    remainingTime = isFocus ? focusTimeInput.value * 60 : breakTimeInput.value * 60;
                    updateStatus();
                    updateDisplay();
                }
            }, 1000);
            isRunning = true;
        }
    }

    // Pause timer
    function pauseTimer() {
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
        }
    }

    // Reset timer
    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        isFocus = true;
        remainingTime = focusTimeInput.value * 60;
        updateStatus();
        updateDisplay();
    }

    // Play notification sound
    function playNotificationSound() {
        const audio = new Audio('notification.mp3');
        audio.play();
    }

    // Event listeners
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);

    // Update timer when settings change
    focusTimeInput.addEventListener('change', () => {
        if (!isRunning) {
            remainingTime = focusTimeInput.value * 60;
            updateDisplay();
        }
    });

    breakTimeInput.addEventListener('change', () => {
        if (!isRunning && !isFocus) {
            remainingTime = breakTimeInput.value * 60;
            updateDisplay();
        }
    });

    // Initialize display
    updateDisplay();
    updateStatus();
});
