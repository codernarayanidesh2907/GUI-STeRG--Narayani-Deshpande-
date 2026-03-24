function random(min,max){
    return (Math.random()*(max-min)+min).toFixed(2);
}


function updateTelemetry(){
    

// Acceleration
document.getElementById("accX").innerText = random(-5,5) + " m/s²";
document.getElementById("accY").innerText = random(-5,5) + " m/s²";
document.getElementById("accZ").innerText = random(8,12) + " m/s²";

// Gyroscope
document.getElementById("gyroX").innerText = random(-180,180) + " °";
document.getElementById("gyroY").innerText = random(-180,180) + " °";
document.getElementById("gyroZ").innerText = random(-180,180) + " °";


// Magnetometer
document.getElementById("magX").innerText = random(-50,50) + " uT";
document.getElementById("magY").innerText = random(-50,50) + " uT";
document.getElementById("magZ").innerText = random(-50,50) + " uT";

// GNSS
document.getElementById("lat").innerText = random(-90,90);
document.getElementById("long").innerText = random(-180,180);
document.getElementById("sat").innerText = Math.floor(random(0,20));

// Altitude
document.getElementById("altitude").innerText = random(100,1200) + " m";

// Temperature
document.getElementById("temp").innerText = random(18,40) + " °C";

// Pressure
let pressure = random(98,102);
document.getElementById("pressure").innerText = pressure + " Pa";

// Current
let current = random(1,5);
document.getElementById("current").innerText = current + " mA";

}

setInterval(updateTelemetry,1000);