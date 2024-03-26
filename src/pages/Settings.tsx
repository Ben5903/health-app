import React, { useState, useContext } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonToggle, IonSelect, IonSelectOption } from '@ionic/react';
import ThemeContext from '../contexts/ThemeContext';

const Settings: React.FC = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const { theme, setTheme, colorPreset, setColorPreset } = useContext(ThemeContext);
  
    const handleToggle = () => {
      setNotificationsEnabled(!notificationsEnabled);
    };
  
    const handleThemeSelect = (event: CustomEvent) => {
      setTheme(event.detail.value);
    };
  
    const handleColorPresetSelect = (event: CustomEvent) => {
      setColorPreset(event.detail.value);
    };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonLabel>Notifications</IonLabel>
              <IonToggle checked={notificationsEnabled} onIonChange={handleToggle} />
            </IonItem>
            <IonItem>
              <IonLabel>Theme</IonLabel>
              <IonSelect value={theme} placeholder="Select Theme" onIonChange={handleThemeSelect}>
                <IonSelectOption value="light">Light</IonSelectOption>
                <IonSelectOption value="dark">Dark</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel>Color Preset</IonLabel>
              <IonSelect value={colorPreset} placeholder="Select Color Preset" onIonChange={handleColorPresetSelect}>
                <IonSelectOption value="preset1">Blue</IonSelectOption>
                <IonSelectOption value="preset2">Pink</IonSelectOption>
                <IonSelectOption value="preset3">Green</IonSelectOption>
                <IonSelectOption value="preset4">Cyan</IonSelectOption>
                <IonSelectOption value="preset5">Dark Blue</IonSelectOption>
                <IonSelectOption value="preset6">Yellow</IonSelectOption>
                <IonSelectOption value="preset7">Red</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Settings;