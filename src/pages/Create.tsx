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
  IonText,
  IonToast
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { AddUser } from '../components/userService';
import './Create.css';

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

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isValidEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.includes('@') && re.test(email);
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.length === 10;
  };

  const registerUser = async () => {
    if (!user.firstname || !user.surname || !user.username || !user.email || !user.phone_number || !user.password) {
      setErrorMessage('All fields must be filled out');
      return;
    }

    if (!isValidEmail(user.email)) {
      setErrorMessage('Invalid email');
      return;
    }

    if (!isValidPhoneNumber(user.phone_number)) {
      setErrorMessage('Invalid phone number');
      return;
    }

    try {
      await AddUser(user);
      history.push('/Profile');
    } catch (error) {
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
      <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px', margin: '20px' }}>
    <IonToast
        isOpen={!!errorMessage}
        onDidDismiss={() => setErrorMessage('')}
        message={errorMessage}
        duration={2000}
    />
    <IonText color="medium">
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome to our community!</h2>
        <p>Please fill in the form below to create your profile.</p>
    </IonText>
    <IonItem className="input-field" lines="full" style={{ marginTop: '20px' }}>
        <IonLabel position="floating">First Name</IonLabel>
        <IonInput required value={user.firstname} onIonChange={(e) => setUser({ ...user, firstname: e.detail.value! })}></IonInput>
    </IonItem>
    <IonItem className="input-field" lines="full">
        <IonLabel position="floating">Surname</IonLabel>
        <IonInput required value={user.surname} onIonChange={(e) => setUser({ ...user, surname: e.detail.value! })}></IonInput>
    </IonItem>
    <IonItem className="input-field" lines="full">
        <IonLabel position="floating">Username</IonLabel>
        <IonInput required value={user.username} onIonChange={(e) => setUser({ ...user, username: e.detail.value! })}></IonInput>
    </IonItem>
    <IonItem className="input-field" lines="full">
        <IonLabel position="floating">Email</IonLabel>
        <IonInput required value={user.email} onIonChange={(e) => setUser({ ...user, email: e.detail.value! })}></IonInput>
    </IonItem>
    <IonItem className="input-field" lines="full">
        <IonLabel position="floating">Phone Number</IonLabel>
        <IonInput required value={user.phone_number} onIonChange={(e) => setUser({ ...user, phone_number: e.detail.value! })}></IonInput>
    </IonItem>
</div>

        <IonItem className="input-field">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput required type={showPassword ? "text" : "password"} value={user.password} onIonChange={(e) => setUser({ ...user, password: e.detail.value! })}></IonInput>
          <IonButton fill="clear" slot="end" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</IonButton>
        </IonItem>

        <IonButton expand="full" onClick={registerUser} className="register-button">Register</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Create;