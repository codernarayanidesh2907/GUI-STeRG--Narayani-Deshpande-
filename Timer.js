//Timer
    let seconds = 0;

function updateTimer(){

seconds++;

let mins = Math.floor(seconds / 60);
let secs = seconds % 60;

mins = mins.toString().padStart(2,'0');
secs = secs.toString().padStart(2,'0');

document.getElementById("timer").innerText = "T-" + mins + ":" + secs;

}
setInterval(updateTimer, 1000);