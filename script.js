let isWorking = true; // true pour travail, false pour pause
let timer = null; // Variable pour le timer
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

    // Remettre le temps à celui du travail
    isWorking = true; // Assurer que l'état est travail
    timeLeft = workTime; // Réinitialiser à 2 minutes (ou ce que vous avez défini)
    
    // Mettre à jour l'affichage pour le mode travail
    document.getElementById("travail").style.color = "yellow"; // Couleur du texte pour le mode travail
    document.getElementById("Pause").style.color = "white"; // Couleur du texte pour le mode pause
    changeColor("red"); // Changer la couleur de fond pour le mode travail
    updateTimerDisplay(); // Met à jour l'affichage immédiatement

    // Mettre à jour l'icône du bouton
    const playPauseButton = document.querySelector(".playpause");
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>'; // Icône pour démarrer le timer
}

// Démarrer le timer
function launchTimer() {
    if (!timer) { // Si le timer n'est pas déjà en cours
        startTimer(); // Démarre le timer
        const playPauseButton = document.querySelector(".playpause");
        playPauseButton.innerHTML = '<i class="fa-solid fa-clock-rotate-left"></i>'; // Icône pour pause
    }
}

// Écouteurs d'événements pour le bouton
const playPauseButton = document.querySelector(".playpause");
playPauseButton.addEventListener("click", () => {
    if (timer) {
        resetTimer(); // Si le timer est en cours, le réinitialise
    } else {
        launchTimer(); // Si le timer est arrêté, le lance
    }
});

// Initialiser l'affichage du timer au démarrage
updateTimerDisplay();