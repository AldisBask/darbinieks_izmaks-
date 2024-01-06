let timer;
let costPerMinute = 0.20;
let totalCost = 0;

// Izmaksu sākums plkst. 8:00
let startTime = new Date();
startTime.setHours(8, 0, 0, 0);

// Izmaksu beigas plkst. 19:00
let endTime = new Date();
endTime.setHours(17, 0, 0, 0);

// Pārbauda, vai pašreizējais laiks ir izņēmuma laikā
function checkExcludedTime(currentTime) {
    let excludedTimes = [
        { start: '10:00', end: '10:15' },
        { start: '12:00', end: '12:30' },
        { start: '15:00', end: '15:15' }
    ];

    for (let i = 0; i < excludedTimes.length; i++) {
        let { start, end } = excludedTimes[i];
        let startTime = new Date(currentTime);
        startTime.setHours(parseInt(start.split(':')[0]), parseInt(start.split(':')[1]), 0, 0);
        let endTime = new Date(currentTime);
        endTime.setHours(parseInt(end.split(':')[0]), parseInt(end.split(':')[1]), 0, 0);

        if (currentTime >= startTime && currentTime <= endTime) {
            return true;
        }
    }

    return false;
}

function updateCost() {
    document.getElementById('cost').innerText = `Izmaksas: €${totalCost.toFixed(2)}`;
}

function updateTimer(currentTime) {
    let formattedTime = formatTime(currentTime);
    document.getElementById('timer').innerText = formattedTime;
}

function formatTime(time) {
    let hours = time.getHours().toString().padStart(2, '0');
    let minutes = time.getMinutes().toString().padStart(2, '0');
    let seconds = time.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Sāk taimeri
startTimer();

function startTimer() {
    let currentTime = new Date();

    if (currentTime >= startTime && currentTime <= endTime) {
        // Iegūst minūšu atlikumu no 8:00
        let minutesRemaining = (currentTime - startTime) / 60000;

        // Aprēķina jau nostrādātās izmaksas
        totalCost = minutesRemaining * costPerMinute;

        // Atjauno laiku un izmaksas ik pēc sekundes
        timer = setInterval(function () {
            currentTime = new Date();

            if (currentTime >= startTime && currentTime <= endTime && !checkExcludedTime(currentTime)) {
                updateTimer(currentTime);
                totalCost += costPerMinute / 60; // Pievienots dalījums ar 60, lai iegūtu izmaksu par minūti
                updateCost();
            }
        }, 1000); // Intervalu mainījām uz 1000 milisekundēm (1 sekunde)
    }
}
