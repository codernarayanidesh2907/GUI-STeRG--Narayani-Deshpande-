# GUI STeRG 
GUI (Graphical User Interface) Helps us to understand real-time telemetry data of the Rocket/CanSat including plotting real-time graphs on it 
✨ Features
📊 Real-time Telemetry Graphs
Temperature
Pressure
Accelerometer data
Gyroscope data
Magnetometer data
🛰️ GNSS Monitoring
Latitude
Longitude
Altitude
Time
Position tracking on map
🚀 Mission Phase Monitoring
Displays the current phase of the mission
Helps track the vehicle throughout flight
⚠️ Error & Status Flags
Provides visual indication of abnormal sensor/system conditions
📡 Raw Telemetry Data
Displays incoming telemetry packets for debugging and monitoring
🧊 3D Visualization
3D model of the vehicle
Used for visualizing the orientation/state of the CANSAT
🛠️ Tech Stack
Frontend
HTML
CSS
JavaScript
Chart.js
Three.js
MapLibre (For connecting map)
## Backend & Simulation 🛠️
Python
CSV (Comma Seperated Files)/ JSON 
PySerial

🏗️ System Architecture
Sensors / Telemetry Source
          ↓
   Serial Communication
          ↓
     Python Backend
          ↓
      JSON / CSV Telemetry
          ↓
      Web Dashboard
          ↓
 ┌────────┬─────────┬─────────┐
 │ Graphs │   Map   │ 3D View │
 └────────┴─────────┴─────────┘
##  ▶️ How to Run
1. Install Python dependencies
  ## pip install pyserial
2. Start the telemetry simulator
## python simulation.py
3. Open the dashboard
## Open index.html in a browser or run it using a local development server.
 ## Make Sure the JSON/ CSV file is connected to your JS script !!


