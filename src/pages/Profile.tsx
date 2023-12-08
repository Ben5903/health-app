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
} from '@ionic/react';
import './Profile.css';
import { GetUserProfile } from '../components/userService';

const Profile: React.FC = () => {
  const [user, setUser] = useState({
    firstname: 'Test',
    surname: 'User',
    username: 'TestUser',
    email: 'TestUser@sample.com',
    phone_number: '0811111111',
    // Add more user data as needed
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Call  service method to get the user profile
        const userProfile = await GetUserProfile(); 

        // Update the state with the retrieved user profile
        setUser(userProfile);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        // Handle error, show error message, etc.
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    // Handle the edit profile action, e.g., navigate to an edit page or modal
    console.log('Edit Profile Clicked');
  };

  return (
    <IonPage>
      <IonContent className="profile-content">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>View your profile below!</IonTitle>
        </IonToolbar>
        <div>


          {/* User Information */}
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Firstname: </IonLabel>
                  <IonInput value={user.firstname} readonly />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Surname: </IonLabel>
                  <IonInput value={user.surname} readonly />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Username: </IonLabel>
                  <IonInput value={user.username} readonly />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Email: </IonLabel>
                  <IonInput value={user.email} readonly />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Phone Number: </IonLabel>
                  <IonInput value={user.phone_number} readonly />
                </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Edit Profile Button */}
          <IonButton className='edit' expand="full" onClick={handleEditProfile}>
            Edit Profile
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;