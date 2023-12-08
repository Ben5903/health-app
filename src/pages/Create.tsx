import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
} from '@ionic/react';
import { useHistory } from 'react-router';
import { AddUser } from '../components/userService';

const Create: React.FC = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    firstname: '',
    surname: '',
    username: '',
    email: '',
    phone_number: '',
    password: '',
  });

  const registerUser = async () => {
    try {
      // call service method to add the user
      await AddUser(user);

      // Redirect to the profile page 
      history.push('/Profile');
    } catch (error) {
      // Handle error
      console.error('Registration failed:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Create your profile here!</IonTitle>
          </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">First Name</IonLabel>
          <IonInput value={user.firstname} onIonChange={(e) => setUser({ ...user, firstname: e.detail.value! })}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Surname</IonLabel>
          <IonInput value={user.surname} onIonChange={(e) => setUser({ ...user, surname: e.detail.value! })}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Username</IonLabel>
          <IonInput value={user.username} onIonChange={(e) => setUser({ ...user, username: e.detail.value! })}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput value={user.email} onIonChange={(e) => setUser({ ...user, email: e.detail.value! })}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Phone Number</IonLabel>
          <IonInput value={user.phone_number} onIonChange={(e) => setUser({ ...user, phone_number: e.detail.value! })}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" value={user.password} onIonChange={(e) => setUser({ ...user, password: e.detail.value! })}></IonInput>
        </IonItem>

        <IonButton expand="full" onClick={registerUser}>Register</IonButton>
      </IonContent>
    </IonPage>
  );
};


export default Create;