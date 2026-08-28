/// ACCELERATION GRAPH 
const accLabels = [];

const accXData = [];
const accYData = [];
const accZData = [];

let sampleNumber = 0;

const accCtx =
    document.getElementById('accelerationChart').getContext('2d');

const accelerationChart = new Chart(accCtx, {

    type: 'line',

    data: {

        labels: accLabels,

        datasets: [

            {
                label: 'Acc X',
                data: accXData,
                borderColor: '#ff3333',
                tension: 0.3
            },

            {
                label: 'Acc Y',
                data: accYData,
                borderColor: '#00ffcc',
                tension: 0.3
            },

            {
                label: 'Acc Z',
                data: accZData,
                borderColor: '#ffff00',
                tension: 0.3
            }
        ]
    },

    options: {

        responsive: true,
        maintainAspectRatio: false,
        animation: false,

        scales: {

            x: {
                ticks: {
                    color: 'white'
                }
            },

            y: {
                ticks: {
                    color: 'white'
                }
            }
        },

        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        }
    }
});


/// MAIN UPDATE

async function updateDashboard() {
    try {
        const response = await fetch('telemetry_data.json?t=' + Date.now());
        const data = await response.json();

        /// Update the DOM elements
       /* document.getElementById('id').innerText = data.id;*/
        /*document.getElementById('packet-count').innerText = data['packet-count'];*/
       /* document.getElementById('time').innerText = data.time;*/


         document.getElementById('acc-x').innerText = data.acc.x + " m/s^2";
        document.getElementById('acc-y').innerText = data.acc.y + " m/s^2";
        document.getElementById('acc-z').innerText = data.acc.z + " m/s^2"; 

        // Update the acceleration graph
        sampleNumber++;

        accLabels.push(sampleNumber);

        accXData.push(data.acc.x);
        accYData.push(data.acc.y);
        accZData.push(data.acc.z);

         if (accLabels.length > 25) {

            accLabels.shift();

            accXData.shift();
            accYData.shift();
            accZData.shift();
        }
        accelerationChart.update();


        document.getElementById('gyro-x').innerText = data.gyro.x + " deg/s";
        document.getElementById('gyro-y').innerText = data.gyro.y + " deg/s";
        document.getElementById('gyro-z').innerText = data.gyro.z + " deg/s";


       /* document.getElementById('current').innerText = data.current + " mA";
        document.getElementById('xbee').innerText = data.xbee;
        document.getElementById('lora').innerText = data.lora;*/
         document.getElementById('temp').innerText = data.temp + " C";

        document.getElementById('pressure').innerText = data.pressure + " Pa";
        

      


        document.getElementById('magnetometer-x').innerText = data.magnetometer.x + " uT";
        document.getElementById('magnetometer-y').innerText = data.magnetometer.y + " uT";
        document.getElementById('magnetometer-z').innerText = data.magnetometer.z + " uT";


       /* document.getElementById('lat').innerText = data.gnss.lat + "°";
        document.getElementById('long').innerText = data.gnss.long + "°";
        document.getElementById('sat').innerText = data.gnss.sat;*/


        const rawBox = document.getElementById("raw-stream-output");

const rawLine =
` ${data.acc.x},${data.acc.y},${data.acc.z},${data.gyro.x},${data.gyro.y},${data.gyro.z},${data.temp}, ${data.pressure},${data.magnetometer.x},${data.magnetometer.y},${data.magnetometer.z} )\n`;

rawBox.textContent += rawLine;
rawBox.scrollTop = rawBox.scrollHeight;

        
    } 
    catch (err) {
        console.error(err);
    }
}

// Check for updates every 500ms
setInterval(updateDashboard, 500);