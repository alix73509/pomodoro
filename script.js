let isWorking = true; // true pour travail, false pour pause
let timer; // Variable pour stocker le timer
let timeLeft = 25 * 60; // 25 minutes en secondes

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").innerText = 
        `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft < 0) {
            clearInterval(timer);
            isWorking = !isWorking; // Alterne entre travail et pause
            timeLeft = isWorking ? 25 * 60 : 5 * 60; // 25 minutes ou 5 minutes
            updateTimerDisplay();
            alert(isWorking ? "Retour au travail !" : "Temps de pause !");
            startTimer(); // Démarre le nouveau timer
        }
    }, 1000);
}

function toggleTimer() {
    const playPauseButton = document.querySelector(".playpause");
    
    if (timer) {
        clearInterval(timer);
        timer = null; // Arrête le timer
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>'; // Change l'icône en "Play"
    } else {
        startTimer(); // Démarre le timer
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // Change l'icône en "Pause"
    }
}

document.querySelector(".playpause").addEventListener("click", toggleTimer);

// Initialise l'affichage
updateTimerDisplay();
