import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonMenuButton,
} from '@ionic/react';
import './Login.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    // Implement your login logic here
    console.log('Username:', username);
    console.log('Password:', password);

    try {
      const response = await axios.post('http://127.0.0.1:8000/user/login/', { username, password });

      if (response.status === 200) {
        console.log('Login Successful');
        history.push('/Profile');
      } else {
        console.log('Login Failed');
      }
    } catch (error: any) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
      } else if (error.request) {
        console.error('No response received from the server');
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  }; 

  const CreateButton = () => {
    console.log('Navigating to /Create');
    history.push('/Create');
  };

  return (
    <IonPage>
      <IonContent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login below!</IonTitle>
        </IonToolbar>
        <IonGrid className="ion-text-center ion-margin-top">
          <IonRow className="login-row">
            <IonCol size="12" size-md="6" offsetMd="3">
              <div className="login-container">
                <IonItem className="ion-margin-bottom">
                  <IonLabel position="floating">Username</IonLabel>
                  <IonInput
                    type="text"
                    value={username}
                    onIonChange={(e) => setUsername(e.detail.value!)}
                  />
                </IonItem>

                <IonItem className="ion-margin-bottom">
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                  />
                </IonItem>
              </div>
              <IonButton expand="full" onClick={handleLogin} className="ion-margin-top login-button">
                Login
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div>
          <h3 className="create-text">Havent got an account? Create your account below to begin!</h3>
          <IonButton expand="full" onClick={CreateButton} className="ion-margin-top login-button">
            Create/Register
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;