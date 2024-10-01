let isWorking = true; // true pour travail, false pour pause
let timer = null; // Variable pour le timer
let workTime = 25 * 60;  // Temps de travail par défaut en secondes
let breakTime = 5 * 60; // Temps de pause par défaut en secondes
let timeLeft = workTime; // Temps initial pour le travail
let totalTime = timeLeft; // Temps total courant

// Paramètres pour le cercle de progression
const progressCircle = document.getElementById("progress-circle");
const circleRadius = progressCircle.r.baseVal.value;  // Récupère le rayon du cercle
const circumference = 2 * Math.PI * circleRadius; // Circonférence du cercle

// Configuration initiale du cercle
progressCircle.style.strokeDasharray = `${circumference}`;
progressCircle.style.strokeDashoffset = `${circumference}`;

// Mise à jour de l'affichage du timer
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerElement = document.getElementById("timer");
    timerElement.textContent = 
        `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Mise à jour de la progression du cercle
    updateProgressCircle();
}

// Fonction pour mettre à jour la progression du cercle
function updateProgressCircle() {
    const offset = circumference - (timeLeft / totalTime) * circumference; // Calculer l'offset
    progressCircle.style.strokeDashoffset = offset;
}

// Fonction pour récupérer le temps choisi dans le menu déroulant
function getSelectedTime() {
    const minutes = parseInt(document.getElementById("minutes").value);
    const seconds = parseInt(document.getElementById("seconds").value);
    return (minutes * 60) + seconds; // Convertir en secondes
}

// Fonction pour récupérer le temps de pause choisi
function getSelectedTimePause() {
    const minutes = parseInt(document.getElementById("pauseMinutes").value);
    const seconds = parseInt(document.getElementById("pauseSeconds").value);
    return (minutes * 60) + seconds; // Convertir en secondes
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

            // Mise à jour du temps restant
            timeLeft = isWorking ? getSelectedTime() : getSelectedTimePause(); // Obtenir le temps sélectionné
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

    // Remettre le temps à celui du travail défini par l'utilisateur
    isWorking = true; // Assurer que l'état est travail
    workTime = getSelectedTime(); // Obtenir le temps de travail sélectionné
    breakTime = getSelectedTimePause(); // Obtenir le temps de pause sélectionné
    timeLeft = workTime; // Réinitialiser à la valeur choisie par l'utilisateur

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
        workTime = getSelectedTime(); // Obtenir le temps de travail sélectionné
        breakTime = getSelectedTimePause(); // Obtenir le temps de pause sélectionné
        timeLeft = workTime; // Mettre à jour le temps restant pour le travail
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

// Fonction pour peupler les options du menu déroulant
function populateSelectOptions(selectElement) {
    for (let i = 0; i <= 59; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i < 10 ? `0${i}` : i;  // Affiche 01, 02, ... 59
        selectElement.appendChild(option);
    }
}

// Sélection des éléments du DOM pour le temps de travail
const minutesSelect = document.getElementById("minutes");
const secondsSelect = document.getElementById("seconds");

// Sélection des éléments du DOM pour le temps de pause
const pauseMinutesSelect = document.getElementById("pauseMinutes");
const pauseSecondsSelect = document.getElementById("pauseSeconds");

// Ajouter les options dynamiquement pour le temps de travail
populateSelectOptions(minutesSelect);
populateSelectOptions(secondsSelect);

// Ajouter les options dynamiquement pour le temps de pause
populateSelectOptions(pauseMinutesSelect);
populateSelectOptions(pauseSecondsSelect);

// Initialiser l'affichage du timer au démarrage
updateTimerDisplay();
