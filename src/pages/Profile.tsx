import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSpinner,
  IonAvatar,
} from '@ionic/react';
import './Profile.css';
import { GetUserProfile } from '../components/userService';
import { useHistory } from 'react-router-dom';

const Profile: React.FC = () => {
  const [user, setUser] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userProfile = await GetUserProfile(token);
          setUser(userProfile);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  

  const handleEditProfile = () => {
    setEditing(true);
  };

  const handleSaveChanges = () => {
    console.log(user);
    setEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    if (user && typeof user === 'object') {
      setUser({ ...user, [field]: value });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  if (loading) {
    return <IonSpinner name="crescent" />;
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
              <IonAvatar>
                <img src="https://via.placeholder.com/150" alt="Profile" />
              </IonAvatar>
              <IonText color="medium">
                <h2>Welcome, User!</h2>
                <p>We're glad to have you here. Here's your profile information:</p>
              </IonText>
            </IonCol>
          </IonRow>
          {['firstname', 'surname', 'username', 'email', 'phone_number'].map((field) => (
            <IonRow key={field}>
              <IonCol>
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{field.charAt(0).toUpperCase() + field.slice(1)}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {editing ? (
                      <IonInput value={user && (user as any)[field]} onIonChange={e => handleChange(field, e.detail.value!)}></IonInput>
                    ) : (
                      user ? (user as any)[field] || 'Sample Text' : 'Loading...'
                    )}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
        {editing ? (
          <IonButton className='profile-button' expand="full" onClick={handleSaveChanges} fill='outline'>
            Save Changes
          </IonButton>
        ) : (
          <IonButton className='profile-button' expand="full" onClick={handleEditProfile} fill='outline'>
            Edit Profile
          </IonButton>
        )}
        <IonButton className='profile-button' color="danger" expand="full" onClick={handleLogout} fill='outline'>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Profile;