import React, { useState } from 'react';
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
    const TrackMetric = (metric: string) => {
        
        console.log(`Tracking ${metric}`);
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
              <IonButton onClick={() => TrackMetric('Heart Rate')}>
                Track Heart Rate
              </IonButton>
              <IonButton onClick={() => TrackMetric('Body Temperature')}>
                Track Body Temperature
              </IonButton>
              <IonButton onClick={() => TrackMetric('Blood Pressure')}>
                Track Blood Pressure
              </IonButton>
            </div>
          </IonContent>
        </IonPage>
      );
    };

export default Track;