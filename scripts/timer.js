const play = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");

let timerInterval;
let paused = false;
let currentTime;

let spacePressed = false;

play.addEventListener('click', () => {
    handleButtonClick();
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (!spacePressed) {
            spacePressed = true;
            handleButtonClick();
        } else {
            spacePressed = false;
            pauseTimer();
        }
    }
});

const handleButtonClick = () => {
    const json = localStorage.getItem('playerData');
    const playerData = JSON.parse(json);
    const initialTime = playerData.timeNumber;

    // If not paused, we initialize currentTime with the value from localStorage
    if (!paused) {
        currentTime = initialTime;
    }

    startCountdown(currentTime);
};

pause.addEventListener('click', () => {
    pauseTimer();
});

reset.addEventListener('click', () => {
    resetTimer();
});

const startCountdown = (initialTime) => {
    play.disabled = true;
    pause.disabled = false;

    currentTime = initialTime;

    const updateCountdown = () => {
        document.getElementById("timerDisplay").innerHTML = currentTime;

        if (currentTime === 0) {
            clearInterval(timerInterval);
            document.getElementById("timerDisplay").style.color = "red";
        } else {
            currentTime--;
        }
    };

    updateCountdown();

    timerInterval = setInterval(updateCountdown, 1000);
};

const pauseTimer = () => {
    clearInterval(timerInterval);
    paused = true;
    pause.disabled = true;
    play.disabled = false;
};

const resetTimer = () => {
    const json = localStorage.getItem('playerData');
    const playerData = JSON.parse(json);
    const timeSet = playerData.timeNumber;

    document.getElementById("timerDisplay").style.color = "black";
    document.querySelector('#timerDisplay').textContent = timeSet;

    play.disabled = false;
    pause.disabled = false;
    clearInterval(timerInterval);
    paused = false;
};