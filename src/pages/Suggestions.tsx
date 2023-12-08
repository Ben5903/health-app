import React, { useState } from 'react';
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
    IonGrid
} from '@ionic/react';
import './Suggestions.css';

const Suggestions: React.FC = () => {

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
                  <IonCardContent>This is sample text to show recommendations and considerations to be thought about</IonCardContent>
                </IonCard>
              </IonCol>
  
              <IonCol size="6">
                <IonCard className='box2'>
                  <IonCardHeader>
                    <IonCardTitle>Nutritional Advice</IonCardTitle>
                    <IonCardSubtitle>Some things to consider</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>This is sample text to show recommendations on the user's diet and healthy eating habits</IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
  
            <IonRow>
              <IonCol size="6">
                <IonCard className='box3'>
                  <IonCardHeader>
                    <IonCardTitle>Reasons to consider health advice</IonCardTitle>
                    <IonCardSubtitle>Some things to consider</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>This area will show insights into the advice and why to consider it</IonCardContent>
                </IonCard>
              </IonCol>
  
              <IonCol size="6">
                <IonCard className='box4'>
                  <IonCardHeader>
                    <IonCardTitle>More information</IonCardTitle>
                    <IonCardSubtitle>Suggestions</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>Sample text to provide clarity on the purpose of displaying information</IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
  
        </IonContent>
      </IonPage>
    );
};

export default Suggestions;