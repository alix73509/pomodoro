let isWorking = true; // true pour travail, false pour pause
let timer;
let workTime = 5 * 2;  // Temps de travail (pour test : 2 minutes)
let breakTime = 5 * 2; // Temps de pause (pour test : 2 minutes)
let timeLeft = workTime; // Temps initial pour le travail
let totalTime = timeLeft; // Temps total courant

// Mise à jour de l'affichage du timer
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerElement = document.getElementById("timer");
    timerElement.textContent = 
        `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Mise à jour de la progression du cercle
    const progressCircle = document.getElementById("progress-circle");
    const circumference = 2 * Math.PI * 150; // Circonférence du cercle 
    const offset = circumference - (timeLeft / totalTime) * circumference; // Calculer l'offset
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = offset;
}

// Changement de couleur selon le mode travail/pause
function changeColor(color) {
    document.body.style.backgroundColor = color;
    document.querySelector(".playpause").style.backgroundColor = color;
    document.querySelector(".travailpause").style.backgroundColor = color;
}

function startTimer() {
    document.getElementById("travail").style.color = isWorking ? "yellow" : "white";
    document.getElementById("Pause").style.color = !isWorking ? "yellow" : "white";

    // Mettre à jour le temps total (travail ou pause)
    totalTime = isWorking ? workTime : breakTime;

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft < 0) {
            clearInterval(timer); // Arrête le timer
            isWorking = !isWorking; // Alterner entre travail et pause
            timeLeft = isWorking ? workTime : breakTime; // Réinitialise le temps
            updateTimerDisplay();

            // Changer les couleurs en fonction du mode
            if (isWorking) {
                changeColor("red"); 
            } else {
                changeColor("blue"); 
            }

            // Redémarrer le timer après changement de mode
            startTimer();
        }
    }, 1000); // Intervalle de 1 seconde
}

// Réinitialiser le timer lorsqu'on clique sur le bouton
function resetTimer() {
    clearInterval(timer); // Arrêter le timer actuel (si en cours)
    timer = null; // Réinitialiser la variable timer

    // Réinitialiser le temps en fonction du mode actuel
    timeLeft = isWorking ? workTime : breakTime;
    updateTimerDisplay(); // Met à jour l'affichage immédiatement
    startTimer(); // Redémarrer le timer depuis le début

    // Mettre à jour l'icône du bouton (peut être ajusté)
    const playPauseButton = document.querySelector(".playpause");
    playPauseButton.innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i>'; // Icône reset/restart
}


document.querySelector(".playpause").addEventListener("click", resetTimer);

// Initialiser l'affichage du timer au démarrage
updateTimerDisplay();
