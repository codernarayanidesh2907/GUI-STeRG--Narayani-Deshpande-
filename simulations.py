import serial
import json
import time

# --- CONFIGURATION ---
SERIAL_PORT = 'COM3'  # Update according to COM port
BAUD_RATE = 115200     
OUTPUT_FILE = 'telemetry_data.json'

# TELEMETRY FORMAT:
# ACCX, ACCY, ACCZ, GYROX, GYROY, GYROZ
# TEMP, PRESSURE, MAGX, MAGY, MAGZ




def parse_telemetry(raw_line):
   
    try:
        parts = raw_line.split(',')
        
        telemetry = {
            "acc": {
                "x": float(parts[0]),
                "y": float(parts[1]),
                "z": float(parts[2])
            },
            "gyro": {
                "x": float(parts[3]),
                "y": float(parts[4]),
                "z": float(parts[5])
            },

            "temp": float(parts[6]),
            "pressure": float(parts[7]),
            "magnetometer": {
                "x": float(parts[8]),
                "y": float(parts[9]),
                "z": float(parts[10])
            },
        }
        return telemetry
    except (IndexError, ValueError):
        return None

def run_bridge():
    try:
        ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
        #print(f"Connected to {SERIAL_PORT}. Waiting for CanSat data...")

        while True:
            if ser.in_waiting > 0:
                line = ser.readline().decode('utf-8').strip()
                
                if line:
                    data = parse_telemetry(line)
                    if data:
                        # For JSON file
                        with open(OUTPUT_FILE, 'w') as f:
                            json.dump(data, f)
                        print(f'Received Packet : Acc: {data["acc"]} | Gyro: {data["gyro"]} |  Temp: {data["temp"]}°C | Pressure: {data["pressure"]} Pa | Mag: {data["magnetometer"]}')

            time.sleep(0.1) 

   # except serial.SerialException as e:
        #print(f"Serial Error: {e}")
    #except KeyboardInterrupt:
        #print("Stopping Telemetry Bridge.")
    finally:
        if 'ser' in locals(): ser.close()

if __name__ == "__main__":
    run_bridge()