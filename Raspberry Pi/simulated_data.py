from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  


# simulate temperature
def simulate_temperature():
    temperature = round(random.uniform(36.5, 37.5), 1)
    return temperature

# simulate heart rate
def simulate_heart_rate():
    heart_rate = random.randint(60, 100)
    return heart_rate
   
   

# simulate blood pressure
def simulate_blood_pressure():
    systolic_pressure = random.randint(110, 130)
    diastolic_pressure = random.randint(70, 90)
    return {'systolic': systolic_pressure, 'diastolic': diastolic_pressure}


# endpoint to fetch readings
@app.route('/api/trackTemperature')
def get_temperature():
    temperature = simulate_temperature()
    return jsonify({'temperature': temperature})
   
@app.route('/api/trackHeartRate')
def get_heart_rate():
    heart_rate = simulate_heart_rate()
    return jsonify({'heart rate': heart_rate})

@app.route('/api/trackBloodPressure')
def get_blood_pressure():
    blood_pressure = simulate_blood_pressure()
    return jsonify(blood_pressure)
   
temperature = simulate_temperature()
heart_rate = simulate_heart_rate()
blood_pressure = simulate_blood_pressure()

print("Simulated Data:")
print(f"Temperature: {temperature}°C")
print(f"Heart Rate: {heart_rate} bpm")
print(f"Blood Pressure: {blood_pressure['systolic']}/{blood_pressure['diastolic']} mmHg")    

# server
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)