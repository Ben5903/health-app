import React, { useState, useEffect } from 'react';
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
  IonMenuButton,
  IonTitle,
  IonText,
} from '@ionic/react';
import './Profile.css';
import { GetUserProfile } from '../components/userService';

const Profile: React.FC = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Declare the loading state variable here

  useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const userProfile = await GetUserProfile();
      setUser(userProfile);
      console.log('User profile:', userProfile); // Log the user profile to the console
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  fetchUserProfile();
}, []);

  const handleEditProfile = () => {
    console.log('Edit Profile Clicked');
  };

  if (loading) {
    return <div>Loading...</div>;  // show a loading message while the user profile is being fetched
  }

  return (
    <IonPage>
      <IonContent className="profile-content">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>View your profile below!</IonTitle>
        </IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonText color="medium">
                <h2>Welcome, {(user as any) ? (user as any).firstname : ''}!</h2>
                <p>We're glad to have you here. Here's your profile information:</p>
              </IonText>
            </IonCol>
          </IonRow>
          {['firstname', 'surname', 'username', 'email', 'phone_number'].map((field) => (
            <IonRow key={field}>
              <IonCol>
                <IonItem>
                  <IonLabel>{field.charAt(0).toUpperCase() + field.slice(1)}: </IonLabel>
                  <IonInput value={user ? user[field] : ''} readonly />
                </IonItem>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
        <IonButton className='edit' expand="full" onClick={handleEditProfile}>
          Edit Profile
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Profile;