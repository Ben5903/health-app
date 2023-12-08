import React from 'react';
import {
  IonButtons,
  IonContent,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from '@ionic/react';
import './Predicaments.css';

const Predicaments: React.FC = () => {
    return (
        <IonPage>
          <IonContent className="Predictions-content">
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton></IonMenuButton>
              </IonButtons>
              <IonTitle>Health Predictions</IonTitle>
            </IonToolbar>
    
            <IonCard className="prediction-card">
              <IonCardHeader>
                <IonCardSubtitle>Prediction Date: January 1, 2024</IonCardSubtitle>
                <IonCardTitle>Body Temperature</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Based on your historical data, we predict that your body temperature will remain within the normal range.
              </IonCardContent>
            </IonCard>
    
            <IonCard className="prediction-card">
              <IonCardHeader>
                <IonCardSubtitle>Prediction Date: January 1, 2024</IonCardSubtitle>
                <IonCardTitle>Heart Rate</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                Our prediction suggests that your heart rate will stay within the healthy range in the coming months.
              </IonCardContent>
            </IonCard>
    
            <IonCard className="prediction-card">
              <IonCardHeader>
                <IonCardSubtitle>Prediction Date: January 1, 2024</IonCardSubtitle>
                <IonCardTitle>Blood Pressure</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                We anticipate that your blood pressure will remain stable and within healthy levels based on your historical data.
              </IonCardContent>
            </IonCard>
    
          </IonContent>
        </IonPage>
      );
    };

export default Predicaments;