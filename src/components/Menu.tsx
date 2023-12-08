import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {  bookmarkOutline, heartOutline, heartSharp, personCircleOutline, personCircleSharp, paperPlaneOutline, paperPlaneSharp, arrowForward, arrowForwardCircleOutline, arrowBackCircleOutline, arrowBackCircleSharp, help, helpCircle } from 'ionicons/icons';
import { menuOutline } from 'ionicons/icons';
import { isMobile } from 'mobile-device-detect'; 
import './Menu.css';
import { useEffect, useRef, useState } from 'react';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Profile',
    url: '/Profile',
    iosIcon: personCircleOutline,
    mdIcon: personCircleSharp
  },
  {
    title: 'Suggestions',
    url: '/Suggestions',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Questionaire',
    url: '/Questionaire',
    iosIcon: help,
    mdIcon: helpCircle
  },
  {
    title: 'Track your health',
    url: '/track',
    iosIcon: heartOutline,
    mdIcon: heartSharp
  },
  {
    title: 'Predicaments',
    url: '/predicaments',
    iosIcon: arrowForward,
    mdIcon: arrowForwardCircleOutline
  },
  {
    title: 'Logout/Create Profile',
    url: '/Login',
    iosIcon: arrowBackCircleOutline,
    mdIcon: arrowBackCircleSharp
  }
];

const labels = [' Pulse Rate', ' Body Temperature', ' Blood Pressure'];

const Menu: React.FC = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const menuToggleRef = useRef<HTMLIonMenuElement>(null);

  const toggleMenu = () => {
    if (menuToggleRef.current) {
      menuToggleRef.current.toggle();
    }
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isMobile && (
        <div onClick={toggleMenu} className="menu-toggle-icon">
        <IonIcon icon={menuOutline} />
      </div>
      )}
      <IonMenu contentId="main" type="overlay" ref={menuToggleRef}>
        <IonContent>
          <IonList id="inbox-list">
            <IonListHeader>Welcome!</IonListHeader>
            <IonNote>To your personal health assitant</IonNote>
            {
            appPages.map((appPage, index) => (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname === appPage.url ? 'selected' : ''}
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            ))}
          </IonList>

          <IonList id="labels-list">
            <IonListHeader>Reminders</IonListHeader>
            {labels.map((label, index) => (
              <IonItem lines="none" key={index}>
                <IonIcon aria-hidden="true" slot="start" icon={bookmarkOutline} />
                <IonLabel>{label}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonMenu>
    </>
  );
};

export default Menu;
