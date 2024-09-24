let isWorking = true; // true pour travail, false pour pause
let timer; // Variable pour stocker le timer
let timeLeft = 60; // 25 minutes en secondes
const totalTime = timeLeft; // Pourcentage total du temps

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").innerText = 
        `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Calculer la progression du cercle
    const progressCircle = document.getElementById("progress-circle");
    const circumference = 2 * Math.PI * 150; // Circonférence du cercle (150 est le rayon)
    const offset = circumference - (timeLeft / totalTime) * circumference; // Calculer l'offset
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = offset; // Appliquer l'offset
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
