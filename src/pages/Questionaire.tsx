import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
} from '@ionic/react';

interface Question {
  id: number;
  question: string;
  options: string[];
  inputType?: 'text';
  response: string | null;
}

const Questionnaire: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: 'What is your gender',
      options: ['Male ', 'Female ', 'Other '],
      response: null,
    },

    {
      id: 2,
      question: 'What is your age range',
      options: ['Under 18 ', '18-24 ', '25-34 ', '35-44 ', '45-54 ', '55-64 ', '65-74 ', '75-84 ', 'Over 85 '  ],
      response: null,
    },

    {
      id: 3,
      question: 'How often do you exercise?',
      options: ['Rarely or Never', '1-2 times per week', '3-4 times per week', '5 or more times per week'],
      response: null,
    },

    {
      id: 4,
      question: 'How many hours of rest do you get each night?',
      options: ['Less than 5 hours', '5-7 hours', '8 hours', 'More than 8 hours'],
      response: null,
    },
  ]);

  const handleAnswer = (questionId: number, selectedOption: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === questionId ? { ...q, response: selectedOption } : q
      )
    );
  };

  const handleSubmit = () => {
    // Logic to handle the submitted responses
    console.log(questions);
  };

  return (
    <IonPage>
      <IonContent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Answer health related questions below!</IonTitle>
        </IonToolbar>
        <div className="ion-padding">
          <IonList>
            {questions.map((question) => (
              <IonItem key={question.id}>
                <IonLabel>
                  <h3>{question.question}</h3>
                  <IonSelect
                    placeholder="Select option here"
                    value={question.response}
                    onIonChange={(e) => handleAnswer(question.id, e.detail.value)}
                    interface="popover" 
                  >
                    {question.options.map((option) => (
                      <IonSelectOption key={option} >
                        {option}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
          <IonButton expand="full" onClick={handleSubmit}>
            Submit Answers
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Questionnaire;
