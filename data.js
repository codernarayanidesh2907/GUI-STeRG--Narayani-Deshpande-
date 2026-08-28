// Telemetry update

let packet = 1;

let battery = 100;




// 🔋 BATTERY
function updateBattery() {
    battery -= 0.2;
    if (battery < 0) battery = 100;

    let batteryEl = document.getElementById("battery");
    batteryEl.innerText = battery.toFixed(0) + "%";

    // color change
    if (battery > 60) batteryEl.style.borderColor = "#33ff33";
    else if (battery > 30) batteryEl.style.borderColor = "yellow";
    else batteryEl.style.borderColor = "red";
}


function updateMeta() {
    /*document.getElementById("id").innerText = "CANSAT-" + packet;*/
    document.getElementById("packet-count").innerText = packet;
    document.getElementById("time").innerText = new Date().toLocaleTimeString();
}


function updateTelemetry() {
    document.getElementById("pressure").innerText = (100 + Math.random()*10).toFixed(1) + " Pa";
    document.getElementById("temp").innerText = (30 + Math.random()*10).toFixed(1) + " °C";
    document.getElementById("current").innerText = (15 + Math.random()*5).toFixed(1) + " mA";
        document.getElementById("altitude").innerText = (100 + Math.random()*20).toFixed(1) + " m";
        document.getElementById("velocity").innerText = (5 + Math.random()*2).toFixed(1) + " m/s";
    //document.getElementById("xbee").innerText = (20 + Math.random()*5).toFixed(1) + " dBm";
    //document.getElementById("lora").innerText = (-60 + Math.random()*10).toFixed(1) + " dBm";
}


function updateAcc() {
    document.getElementById("acc-x").innerText = (Math.random()*10).toFixed(2) + " m/s²";
    document.getElementById("acc-y").innerText = (Math.random()*10).toFixed(2) + " m/s²";
    document.getElementById("acc-z").innerText = (Math.random()*10).toFixed(2) + " m/s²";
}


function updateGyro() {
    document.getElementById("gyro-x").innerText = (Math.random()*200).toFixed(1) + " °/s";
    document.getElementById("gyro-y").innerText = (Math.random()*200).toFixed(1) + " °/s";
    document.getElementById("gyro-z").innerText = (Math.random()*200).toFixed(1) + " °/s";
}


function updateMag() {
    document.getElementById("magnetometer-x").innerText = (Math.random()*50).toFixed(1) + " uT";
    document.getElementById("magnetometer-y").innerText = (Math.random()*50).toFixed(1) + " uT";
    document.getElementById("magnetometer-z").innerText = (Math.random()*50).toFixed(1) + " uT";
}


function updateGNSS() {
    document.getElementById("lat").innerText = (18.5 + Math.random()*0.01).toFixed(5);
    document.getElementById("long").innerText = (73.8 + Math.random()*0.01).toFixed(5);
    document.getElementById("sat").innerText = Math.floor(5 + Math.random()*10);
}


function updateAll() {
    
   /* updateBattery();*/
    updateMeta();
    updateTelemetry();
    updateAcc();
    updateGyro();
    updateMag();
    updateGNSS();

    packet++;
}
function updateRawData() {
    const rawContainer = document.getElementById("raw-stream-output");
    
    // 1. Collect current values from the UI
    const time = document.getElementById("time").innerText;
    const pkt = document.getElementById("packet-count").innerText;
    const press = document.getElementById("pressure").innerText;
    const temp = document.getElementById("temp").innerText;
    const lat = document.getElementById("lat").innerText;
    const long = document.getElementById("long").innerText;
    
    // 2. Format the string (CSV style is standard for CanSat)
    // Format: [TIME] PKT, PRESS, TEMP, LAT, LONG
    const rawString = `[${time}] ; DATA: ${pkt}, ${press}, ${temp}, ${lat}, ${long}\n`;

    // 3. Append to the terminal
    rawContainer.textContent += rawString;

    // 4. Auto-scroll to the bottom to keep the latest data visible
    const parentDiv = rawContainer.parentElement;
    parentDiv.scrollTop = parentDiv.scrollHeight;

    // 5. Optional: Limit the number of lines to prevent memory lag
    const lines = rawContainer.textContent.split('\n');
    if (lines.length > 50) {
        rawContainer.textContent = lines.slice(lines.length - 50).join('\n');
    }
}
const originalUpdateAll = updateAll;
updateAll = function() {
    originalUpdateAll();
    updateRawData();
};


setInterval(updateAll, 1000);