import {
  IonButton,
  IonPopover,
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
import {
  bookmarkOutline,
  heartOutline,
  heartSharp,
  personCircleOutline,
  personCircleSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  arrowForward,
  arrowForwardCircleOutline,
  arrowBackCircleOutline,
  arrowBackCircleSharp,
  help,
  helpCircle,
  albumsOutline,
  albumsSharp,
  menuOutline,
  cogOutline,
  cogSharp,
} from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './Menu.css';

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
    title: 'View Users',
    url: '/ViewUsers',
    iosIcon: albumsOutline,
    mdIcon: albumsSharp
  },
  {
    title: 'Logout/Create Profile',
    url: '/Login',
    iosIcon: arrowBackCircleOutline,
    mdIcon: arrowBackCircleSharp
  },
  {
    title: 'Settings',
    url: '/settings',
    iosIcon: cogOutline,
    mdIcon: cogSharp
  }
];

const labels = [' Pulse Rate', ' Body Temperature', ' Blood Pressure'];

const Menu: React.FC = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showPopover, setShowPopover] = useState({ isOpen: false, event: undefined });
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
              ))
            }
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