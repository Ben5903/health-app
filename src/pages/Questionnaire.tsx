import React, { useEffect, useState } from 'react';
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
import './Questionnaire.css';

interface Question {
  id: number;
  question: string;
  options: string[];
  inputType?: 'text';
  response: string | null;
  explanation?: string;
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
      options: ['Under 18 ', '18-24 ', '25-34 ', '35-44 ', '45-54 ', '55-64 ', '65-74 ', '75-84 ', 'Over 85 '],
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

  const [responses, setResponses] = useState<Question[]>([]);

  useEffect(() => {
    const savedResponses = localStorage.getItem('responses');
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
  }, []);

  const handleSubmit = () => {


    const allQuestionsAnswered = questions.every((q) => q.response !== null);
    const explanations: { [key: number]: string } = {
      1: 'Understanding your gender can help us provide more personalised health recommendations.',
      2: 'Your age range can influence the types of exercises and diet that are most beneficial for you.',
      3: 'Your exercise frequency can help us understand your current fitness level and suggest appropriate workouts.',
      4: 'The amount of rest you get each night is crucial for your overall health and well-being.',
    };

    const data: Question[] = questions.map((question) => ({
      ...question,
      explanation: explanations[question.id],
    }));

    if (!allQuestionsAnswered) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setResponses(data);

    localStorage.setItem('responses', JSON.stringify(data));
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
              <IonItem key={question.id} className="ion-item">
                <IonLabel>
                  <h3>{question.question}</h3>
                  <IonSelect
                    placeholder="Select option here"
                    value={question.response}
                    onIonChange={(e) => handleAnswer(question.id, e.detail.value)}
                    interface="popover"
                    className="ion-select"
                  >
                    {question.options.map((option) => (
                      <IonSelectOption key={option}>
                        {option}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
          <IonButton expand="full" className='submit' onClick={handleSubmit} fill='outline'>
            Submit Answers
          </IonButton>
        </div>
        {responses.length > 0 && (
          <div>
            <h2>Responses:</h2>
            {responses.map((response) => (
              <div key={response.id} className="response">
                <p>
                  Question {response.id}: {response.response}
                </p>
                <p>
                  <i>{response.explanation}</i>
                </p>
              </div>
            ))}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}
export default Questionnaire;