import React, { useState, useEffect } from 'react';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonMenuButton,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Track.css';

const Track: React.FC = () => {
  // declare state variables for tracking status and data
  const [isTemperatureTracking, setIsTemperatureTracking] = useState(false);
  const [isHeartRateTracking, setIsHeartRateTracking] = useState(false);
  const [isBloodPressureTracking, setIsBloodPressureTracking] = useState(false);
  const [temperatureData, setTemperatureData] = useState<{ x: number; y: number }[]>([]);
  const [heartRateData, setHeartRateData] = useState<{ x: number; y: number }[]>([]);
  const [bloodPressureData, setBloodPressureData] = useState<{ x: number; y: number }[]>([]);
  const [currentTemperature, setCurrentTemperature] = useState<number | null>(null);
  const [currentHeartRate, setCurrentHeartRate] = useState<number | null>(null);
  const [currentBloodPressure, setCurrentBloodPressure] = useState<{ systolic: number, diastolic: number } | null>(null);
  const [temperatureHistory, setTemperatureHistory] = useState<{ date: Date; value: number }[]>([]);
  const [heartRateHistory, setHeartRateHistory] = useState<{ date: Date; value: number }[]>([]);
  const [bloodPressureHistory, setBloodPressureHistory] = useState<{ date: Date; systolic: number; diastolic: number }[]>([]);

  // useEffect hook to run code on component load
  useEffect(() => {
    // declare intervalId variable to store the interval ID
    let intervalId: NodeJS.Timeout | null = null;
    // function to start tracking
    const startTracking = () => {
      intervalId = setInterval(() => {
        if (isTemperatureTracking) fetchTemperature();
        if (isHeartRateTracking) fetchHeartRate();
        if (isBloodPressureTracking) fetchBloodPressure();
      }, 1500); 
    };
    // function to stop tracking
    const stopTracking = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    // function to fetch temperature data
    const fetchTemperature = async () => {
      try {
        // fetch temperature data from the server
        const response = await fetch('http://192.168.1.25:5000/api/trackTemperature');
        if (response.ok) {
          // parse the response data
          const data = await response.json();
          
          // update the temperature data state variable
          setTemperatureData(prevData => [...prevData, { x: temperatureData.length, y: data.temperature }]);
          setCurrentTemperature(data.temperature);
          setTemperatureHistory(prevHistory => [...prevHistory, { date: new Date(), value: data.temperature }]);
        } else {
          console.error('Failed to fetch temperature');
        }
      } catch (error) {
        console.error('Error fetching temperature:', error);
      }
    };

    // function to fetch heart rate data
    const fetchHeartRate = async () => {
      try {
        // fetch heart rate data from  server
        const response = await fetch('http://192.168.1.25:5000/api/trackHeartRate');
        if (response.ok) {
          // parse the response data
          const data = await response.json();
          setHeartRateData(prevData => [...prevData, { x: heartRateData.length, y: data['heart rate'] }]);
          setCurrentHeartRate(data['heart rate']);
          setHeartRateHistory(prevHistory => [...prevHistory, { date: new Date(), value: data['heart rate'] }]);
        } else {
          console.error('Failed to fetch heart rate');
        }
      } catch (error) {
        console.error('Error fetching heart rate:', error);
      }
    };

    // function to fetch blood pressure data
    const fetchBloodPressure = async () => {
      try {
        // fetch blood pressure data from server
        const response = await fetch('http://192.168.1.25:5000/api/trackBloodPressure');
        if (response.ok) {
          const data = await response.json();
          setBloodPressureData(prevData => [...prevData, { x: bloodPressureData.length, y: data.systolic }]);
          setCurrentBloodPressure({ systolic: data.systolic, diastolic: data.diastolic });
          setBloodPressureHistory(prevHistory => [...prevHistory, { date: new Date(), systolic: data.systolic, diastolic: data.diastolic }]);
        } else {
          console.error('Failed to fetch blood pressure');
        }
      } catch (error) {
        console.error('Error fetching blood pressure:', error);
      }
    };

    // check if any of the tracking variables are true
    if (isTemperatureTracking || isHeartRateTracking || isBloodPressureTracking) {
      startTracking();
    } else {
      // stop tracking if none of the tracking variables are true
      stopTracking();

      // clear temperature data when tracking is stopped
      setTemperatureData([]); 
      
      // clear heart rate data when tracking is stopped
      setHeartRateData([]); 
      // clear blood pressure data when tracking is stopped
      setBloodPressureData([]); 

      // clear current temperature, heart rate, and blood pressure when tracking is stopped
      setCurrentTemperature(null);
      setCurrentHeartRate(null);
      setCurrentBloodPressure(null);
    }
    // return cleanup function to stop tracking when component unmounts
    return () => {
      stopTracking();
    };
  }, [isTemperatureTracking, isHeartRateTracking, isBloodPressureTracking, temperatureData.length, heartRateData.length, bloodPressureData.length]);

  const toggleTemperatureTracking = () => {
    setIsTemperatureTracking(prevTracking => !prevTracking);
  };

  const toggleHeartRateTracking = () => {
    setIsHeartRateTracking(prevTracking => !prevTracking);
  };

  const toggleBloodPressureTracking = () => {
    setIsBloodPressureTracking(prevTracking => !prevTracking);
  };

  return (
    <IonPage>
      <IonContent className="tracking-content">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Track your health here!</IonTitle>
        </IonToolbar>

        <IonText color="medium">
          <h2>Welcome to your health tracking dashboard!</h2>
          <p>Here you can track your temperature, heart rate, and blood pressure over time. Click the buttons below to start or stop tracking each metric.</p>
        </IonText>

        <IonAlert
          isOpen={isTemperatureTracking || isHeartRateTracking || isBloodPressureTracking}
          onDidDismiss={() => { }}
          header={'Tracking Alert'}
          message={'You are currently tracking one or more health metrics. Remember to stop tracking when you are done.'}
          buttons={['OK']}
        />

        <div className="tracking-buttons">
          <IonButton onClick={toggleTemperatureTracking}>
            {isTemperatureTracking ? 'Stop Temperature Tracking' : 'Start Temperature Tracking'}
          </IonButton>
          {temperatureData.length > 0 && (
            <div>
              <VictoryChart width={800} height={600} scale={{ x: 'linear', y: 'linear' }}>
                <VictoryAxis />
                {/* @ts-ignore */}
                <VictoryAxis dependentAxis />
                <VictoryLine data={temperatureData} />
              </VictoryChart>
              {currentTemperature !== null && (
                <p className='current-display'>Current Temperature: {currentTemperature}</p>
              )}
            </div>
          )}

          <IonButton onClick={toggleHeartRateTracking}>
            {isHeartRateTracking ? 'Stop Heart Rate Tracking' : 'Start Heart Rate Tracking'}
          </IonButton>
          {heartRateData.length > 0 && (
            <div>
              <VictoryChart width={800} height={600} scale={{ x: 'linear', y: 'linear' }}>
                <VictoryAxis />
                {/* @ts-ignore */}
                <VictoryAxis dependentAxis />
                <VictoryLine data={heartRateData} />
              </VictoryChart>
              {currentHeartRate !== null && (
                <p className='current-display'>Current Heart Rate: {currentHeartRate}</p>
              )}
            </div>
          )}

          <IonButton onClick={toggleBloodPressureTracking}>
            {isBloodPressureTracking ? 'Stop Blood Pressure Tracking' : 'Start Blood Pressure Tracking'}
          </IonButton>
          {bloodPressureData.length > 0 && (
            <div>
              <VictoryChart width={800} height={600} scale={{ x: 'linear', y: 'linear' }}>
                <VictoryAxis />
                {/* @ts-ignore */}
                <VictoryAxis dependentAxis />
                <VictoryLine data={bloodPressureData} />
              </VictoryChart>
              {currentBloodPressure !== null && (
                <p className='current-display'>Current Blood Pressure: {currentBloodPressure.systolic}/{currentBloodPressure.diastolic}</p>
              )}
            </div>
          )}
        </div>

        {temperatureHistory.length > 0 && (
          <IonCard>
            <IonCardContent>
              <h2>Temperature History</h2>
              <table style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Temperature</th>
                  </tr>
                </thead>
                <tbody>
                  {temperatureHistory.map((entry, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.date.toLocaleString()}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </IonCardContent>
          </IonCard>
        )}
        {heartRateHistory.length > 0 && (
          <IonCard>
            <IonCardContent>
              <h2>Heart Rate History</h2>
              <table style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Heart Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {heartRateHistory.map((entry, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.date.toLocaleString()}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </IonCardContent>
          </IonCard>
        )}

        {bloodPressureHistory.length > 0 && (
          <IonCard>
            <IonCardContent>
              <h2>Blood Pressure History</h2>
              <table style={{ width: '100%', textAlign: 'center', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Systolic</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Diastolic</th>
                  </tr>
                </thead>
                <tbody>
                  {bloodPressureHistory.map((entry, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.date.toLocaleString()}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.systolic}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.diastolic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Track;