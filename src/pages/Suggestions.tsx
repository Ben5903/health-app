import React, { useState } from 'react';
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
  IonCol,
  IonRow,
  IonGrid,
  IonText,
  IonCardContent
} from '@ionic/react';
import './Suggestions.css';
import Track from './Track';

interface SuggestionsProps {
  questionnaireData: {
    question: string;
    answer: string | null;
  }[];
}

const Suggestions: React.FC<SuggestionsProps> = ({ questionnaireData }) => {
  const generateInsights = () => {
    let insights = [];
  
    if (questionnaireData) {
      questionnaireData.forEach(question => {
        if (question.answer === null) {
          insights.push(`You haven't answered the question: "${question.question}" yet.`);
        } else {
          insights.push(`Your answer to "${question.question}" is: "${question.answer}".`);
        }
      });
    } else {
      insights.push('No questionnaire data available.');
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
          <IonRow class="grid-row">
            <IonCol size="10">
              <IonCard className='box1'>
                <IonCardHeader>
                  <IonCardTitle>Questionnaire Insights</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {generateInsights().map((insight, index) => (
                    <p key={index}>{insight}</p>
                  ))}
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="10">
              <IonCard className='box2'>
                <IonCardHeader>
                  <IonCardTitle>Dietary Suggestions</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>Consider incorporating more fruits and vegetables into your diet for better nutrition.</p>
                  <p>Try to reduce your intake of processed foods and sugary snacks.</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow class="grid-row">
            <IonCol size="10">
              <IonCard className='box3'>
                <IonCardHeader>
                  <IonCardTitle>Exercise Tips</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>Find physical activities you enjoy, like walking, swimming, or dancing, and aim to do them regularly.</p>
                  <p>Set achievable fitness goals to help you stay motivated and track your progress.</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="10">
              <IonCard className='box4'>
                <IonCardHeader>
                  <IonCardTitle>General Health Advice</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>Ensure you're getting enough sleep each night to support overall health and well-being.</p>
                  <p>Stay hydrated by drinking plenty of water throughout the day.</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default Suggestions;