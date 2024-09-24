let timerElement = document.getElementById('timer');
        let startStopBtn = document.getElementById('startStopBtn');
        let resetBtn = document.getElementById('resetBtn');
        let interval;
        let isRunning = false;
        let time = 0;

        // Fonction pour démarrer le chronomètre
        function startTimer() {
            interval = setInterval(() => {
                time++;
                let hours = Math.floor(time / 3600);
                let minutes = Math.floor((time % 3600) / 60);
                let seconds = time % 60;

                timerElement.textContent = 
                    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            }, 1000);
        }

        // Fonction pour arrêter le chronomètre
        function stopTimer() {
            clearInterval(interval);
        }

        // Gestion du bouton Démarrer/Arrêter
        startStopBtn.addEventListener('click', function() {
            if (isRunning) {
                stopTimer();
                startStopBtn.innerHTML = '<i class="fas fa-play"></i>'; // Change en Démarrer
            } else {
                startTimer();
                startStopBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Change en Arrêter
            }
            isRunning = !isRunning; // Inverse l'état du chronomètre
        });