import React, { useEffect, useState } from 'react';
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
  IonText,
  IonAlert
} from '@ionic/react';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { LoginUser } from '../components/userService';
import axios from 'axios';

const Login: React.FC = () => {
  const history = useHistory();
  // declare state variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // declare state variable for alert
  const [showAlert, setShowAlert] = useState(false);

  // useEffect hook to run code on component load
  useEffect(() => {
    // Check if the user is already logged in
    localStorage.removeItem('token');
    localStorage.removeItem('responses');
    axios.defaults.headers.common['Authorization'] = undefined;
  }, []);

  // function to handle login
  const handleLogin = async () => {
    console.log(`Logging in with username: ${username} and password: ${password}`);
    try {
      // call the LoginUser function from userService.tsx
      const response = await LoginUser({ username, password });
      console.log('Server response data:', response.data);
      // Check the success property of the response
      if (!response.data.success) {
        throw new Error(response.data.error);
      }
      // If the token is in the response body, you might access it like this
      const token = response.data.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // navigate to the Profile page
      history.push('/Profile');
    } catch (error) {
      // log the error to the console
      console.error('Login failed:', error);
      setShowAlert(true);
    }
  };
  // function to navigate to the Create page
  const CreateButton = () => {
    console.log('Navigating to /Create');
    history.push('/Create');
  };
  // return element
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
            <IonCol size="15" size-md="6" offsetMd="3">
              <div className="login-container">
                <IonText color="medium">
                  <p>Login to begin!</p>
                </IonText>
                <IonText color="medium" className="text-spacing">
                  <p>Please enter your username and password to login.</p>
                </IonText>
                <IonItem className="ion-margin-bottom input-field">
                  <IonLabel position="floating">Username</IonLabel>
                  <IonInput value={username} onIonChange={(e) => setUsername(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem className="ion-margin-bottom input-field">
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)}></IonInput>
                </IonItem>
              </div>
              <IonButton expand="full" onClick={handleLogin} className="ion-margin-top login-button button-hover">
                Login
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <div>
          <h3 className="create-text">Haven't got an account? Create your account below to begin!</h3>
          <IonText color="medium" className="responsive-text text-spacing">
            <p>By creating an account, you'll be able to access personalised health recommendations, track your health, and connect with other users. Join us today and start your health journey!</p>
          </IonText>
          <IonButton expand="full" onClick={CreateButton} className="ion-margin-top login-button button-hover">
            Create/Register
          </IonButton>
        </div>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Login Failed'}
          message={'Your username or password is incorrect.'}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;