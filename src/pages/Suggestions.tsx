import React, { useEffect, useState } from 'react';
import {
  IonButtons,
  IonContent,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonRow,
  IonGrid,
  IonText
} from '@ionic/react';
import './Suggestions.css';



const Suggestions: React.FC = () => {
  const [currentTemperature, setCurrentTemperature] = useState(0);
  const [currentHeartRate, setCurrentHeartRate] = useState(0);
  const [currentBloodPressure, setCurrentBloodPressure] = useState({ systolic: 0, diastolic: 0 });

  const generateInsights = () => {
    let insights = [];

    if (currentTemperature !== null) {
      if (currentTemperature > 37.5) {
        insights.push('Your temperature is above normal. You might have a fever.');
      } else if (currentTemperature < 36.5) {
        insights.push('Your temperature is below normal. You might be feeling cold.');
      }
    }

    if (currentHeartRate !== null) {
      if (currentHeartRate > 100) {
        insights.push('Your heart rate is above normal. You might be experiencing stress or anxiety.');
      } else if (currentHeartRate < 60) {
        insights.push('Your heart rate is below normal. You might be very relaxed or have a heart condition.');
      }
    }

    if (currentBloodPressure !== null) {
      if (currentBloodPressure.systolic > 140 || currentBloodPressure.diastolic > 90) {
        insights.push('Your blood pressure is high. You might have hypertension.');
      } else if (currentBloodPressure.systolic < 90 || currentBloodPressure.diastolic < 60) {
        insights.push('Your blood pressure is low. You might have hypotension.');
      }
    }

    return insights;
  };

  return (
    <IonPage>
      <IonContent class="Suggestion-content">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>View Your Suggestions</IonTitle>
        </IonToolbar>

        <IonGrid class="ion-no-padding ion-align-items-center ion-justify-content-center">
          <IonRow>
            <IonCol size="6">
              <IonCard className='box1'>
                <IonCardHeader>
                  <IonCardTitle>Health considerations</IonCardTitle>
                  <IonCardSubtitle>Some key tips</IonCardSubtitle>
                </IonCardHeader>
                <IonText color="medium">
                  <h2>Health Insights</h2>
                  {generateInsights().map((insight, index) => (
                    <p key={index}>{insight}</p>
                  ))}
                </IonText>
              </IonCard>
            </IonCol>
          </IonRow>
          {/* Other components */}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Suggestions;