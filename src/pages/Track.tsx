import React, { useState, useEffect } from 'react';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import './Track.css';

const Track: React.FC = () => {
    const [tracking, setTracking] = useState(false);
    const [temperatureData, setTemperatureData] = useState<{ x: number; y: number }[]>([]);
    const [currentTemperature, setCurrentTemperature] = useState<number | null>(null);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        const startTracking = () => {
            intervalId = setInterval(() => {
                fetchTemperature();
            }, 1000); // Adjust the interval as needed
        };

        const stopTracking = () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        };

        const fetchTemperature = async () => {
            try {
                const response = await fetch('http://192.168.1.25:5000/api/track');
                if (response.ok) {
                    const data = await response.json();
                    setTemperatureData(prevData => [...prevData, { x: temperatureData.length, y: data.temperature }]);
                    setCurrentTemperature(data.temperature);
                } else {
                    console.error('Failed to fetch temperature');
                }
            } catch (error) {
                console.error('Error fetching temperature:', error);
            }
        };

        if (tracking) {
            startTracking();
        } else {
            stopTracking();
            setTemperatureData([]); // Clear temperature data when tracking is stopped
            setCurrentTemperature(null);
        }

        return () => {
            stopTracking(); // Cleanup function to stop tracking when component unmounts
        };
    }, [tracking, temperatureData.length]);

    const toggleTracking = () => {
        setTracking(prevTracking => !prevTracking); // Toggle tracking state
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

                <div className="tracking-buttons">
                    <IonButton onClick={toggleTracking}>
                        {tracking ? 'Stop Tracking' : 'Track Body Temperature'}
                    </IonButton>
                    <div>
                      {temperatureData.length > 0 && (
                        <VictoryChart width={800} height={600} scale={{ x: 'linear', y: 'linear' }}>
                          <VictoryAxis />
                          {/* @ts-ignore */}
                          <VictoryAxis dependentAxis /> {/* Add dependentAxis prop here */}
                          <VictoryLine data={temperatureData} />
                        </VictoryChart>
                      )}
                    </div>
                    {currentTemperature !== null && (
                        <p className='temperature-display'>Current Temperature: {currentTemperature}</p>
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Track;