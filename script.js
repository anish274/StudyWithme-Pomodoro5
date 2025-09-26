document.addEventListener('DOMContentLoaded', () => {
    // Default settings
    const defaultSettings = {
        focus: 25,
        sb: 5,
        lb: 15,
        pomodoro: 4,
        autoStart: 0,
        chime: 1,
        volume: 0.5,
        text: 'Welcome to my Task',
        color: 'black',
        bgcolor: 'transparent',
        font: 1
    };

    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Apply settings from URL parameters or use defaults
    const settings = {
        focus: parseInt(urlParams.get('focus')) || defaultSettings.focus,
        sb: parseInt(urlParams.get('sb')) || defaultSettings.sb,
        lb: parseInt(urlParams.get('lb')) || defaultSettings.lb,
        pomodoro: parseInt(urlParams.get('pomodoro')) || defaultSettings.pomodoro,
        autoStart: parseInt(urlParams.get('autoStart')) || defaultSettings.autoStart,
        chime: parseInt(urlParams.get('chime')) || defaultSettings.chime,
        volume: parseFloat(urlParams.get('volume')) || defaultSettings.volume,
        text: urlParams.get('text') || defaultSettings.text,
        color: urlParams.get('color') || defaultSettings.color,
        bgcolor: urlParams.get('bgcolor') || defaultSettings.bgcolor,
        font: parseInt(urlParams.get('font')) || defaultSettings.font
    };

    // State variables
    let state = loadState() || {
        currentMode: 'focus', // 'focus', 'shortBreak', 'longBreak'
        timeRemaining: settings.focus * 60,
        totalTime: settings.focus * 60,
        isRunning: false,
        completedPomodoros: 0,
        soundEnabled: settings.chime === 1
    };

    // DOM elements
    const timerElement = document.getElementById('timer');
    const progressBar = document.getElementById('progress-bar');
    const playPauseButton = document.getElementById('play-pause');
    const playPauseIcon = document.getElementById('play-pause-icon');
    const nextButton = document.getElementById('next');
    const resetButton = document.getElementById('reset');
    const soundToggle = document.getElementById('sound-toggle');
    const soundIcon = document.getElementById('sound-icon');
    const chimeAudio = document.getElementById('chime');
    const pomodoroCount = document.getElementById('pomodoro-count');
    const customText = document.getElementById('custom-text');
    const focusIndicator = document.getElementById('focus-indicator');
    const shortBreakIndicator = document.getElementById('short-break-indicator');
    const longBreakIndicator = document.getElementById('long-break-indicator');

    // Apply visual settings
    function applyVisualSettings() {
        document.documentElement.style.setProperty('--text-color', settings.color);
        document.documentElement.style.setProperty('--bg-color', settings.bgcolor);
        document.documentElement.style.setProperty('--font-family', getFontFamily(settings.font));
        customText.textContent = settings.text;
        chimeAudio.volume = settings.volume;
        soundIcon.src = state.soundEnabled ? 'icons/bell.svg' : 'icons/bell-off.svg';
        updatePomodoroCount();
        updateModeIndicators();
    }

    function getFontFamily(fontNumber) {
        const fonts = [
            'Arial, sans-serif',
            'Helvetica, sans-serif',
            'Times New Roman, serif',
            'Courier New, monospace',
            'Georgia, serif',
            'Verdana, sans-serif',
            'Tahoma, sans-serif',
            'Trebuchet MS, sans-serif',
            'Impact, sans-serif'
        ];
        return fonts[Math.min(fontNumber - 1, fonts.length - 1)];
    }

    // Timer functions
    function updateTimer() {
        const minutes = Math.floor(state.timeRemaining / 60);
        const seconds = state.timeRemaining % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update progress bar
        const progress = (state.totalTime - state.timeRemaining) / state.totalTime * 100;
        progressBar.style.width = `${progress}%`;
        
        // Save state
        saveState();
    }

    let timerInterval;

    function startTimer() {
        if (!state.isRunning) {
            state.isRunning = true;
            playPauseIcon.src = 'icons/pause.svg';
            
            timerInterval = setInterval(() => {
                if (state.timeRemaining > 0) {
                    state.timeRemaining--;
                    updateTimer();
                } else {
                    clearInterval(timerInterval);
                    playSound();
                    handleSessionComplete();
                }
            }, 1000);
        } else {
            pauseTimer();
        }
    }

    function pauseTimer() {
        state.isRunning = false;
        playPauseIcon.src = 'icons/play.svg';
        clearInterval(timerInterval);
        saveState();
    }

    function resetTimer() {
        pauseTimer();
        setTimerForCurrentMode();
        updateTimer();
    }

    function nextSession() {
        pauseTimer();
        handleSessionComplete();
    }

    function handleSessionComplete() {
        if (state.currentMode === 'focus') {
            state.completedPomodoros++;
            updatePomodoroCount();
            
            if (state.completedPomodoros % settings.pomodoro === 0) {
                switchMode('longBreak');
            } else {
                switchMode('shortBreak');
            }
        } else {
            switchMode('focus');
        }
        
        if (settings.autoStart === 1) {
            startTimer();
        }
    }

    function switchMode(mode) {
        state.currentMode = mode;
        setTimerForCurrentMode();
        updateModeIndicators();
        updateTimer();
    }

    function setTimerForCurrentMode() {
        switch (state.currentMode) {
            case 'focus':
                state.timeRemaining = settings.focus * 60;
                state.totalTime = settings.focus * 60;
                break;
            case 'shortBreak':
                state.timeRemaining = settings.sb * 60;
                state.totalTime = settings.sb * 60;
                break;
            case 'longBreak':
                state.timeRemaining = settings.lb * 60;
                state.totalTime = settings.lb * 60;
                break;
        }
    }

    function updateModeIndicators() {
        focusIndicator.classList.remove('active');
        shortBreakIndicator.classList.remove('active');
        longBreakIndicator.classList.remove('active');
        
        switch (state.currentMode) {
            case 'focus':
                focusIndicator.classList.add('active');
                break;
            case 'shortBreak':
                shortBreakIndicator.classList.add('active');
                break;
            case 'longBreak':
                longBreakIndicator.classList.add('active');
                break;
        }
    }

    function updatePomodoroCount() {
        pomodoroCount.textContent = (state.completedPomodoros + 1).toString().padStart(2, '0');
    }

    function playSound() {
        if (state.soundEnabled) {
            chimeAudio.currentTime = 0;
            chimeAudio.play();
        }
    }

    function toggleSound() {
        state.soundEnabled = !state.soundEnabled;
        soundIcon.src = state.soundEnabled ? 'icons/bell.svg' : 'icons/bell-off.svg';
        saveState();
    }

    // Local storage functions
    function saveState() {
        localStorage.setItem('pomodoroState', JSON.stringify(state));
    }

    function loadState() {
        const savedState = localStorage.getItem('pomodoroState');
        return savedState ? JSON.parse(savedState) : null;
    }

    // Event listeners
    playPauseButton.addEventListener('click', startTimer);
    resetButton.addEventListener('click', resetTimer);
    nextButton.addEventListener('click', nextSession);
    soundToggle.addEventListener('click', toggleSound);

    // Initialize
    applyVisualSettings();
    setTimerForCurrentMode();
    updateTimer();
});