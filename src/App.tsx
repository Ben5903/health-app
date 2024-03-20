import React, { useEffect } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Login from './pages/Login';
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import Questionaire from "./pages/Questionaire";
import Track from './pages/Track';
import Suggestions from './pages/Suggestions';
import Predicaments from './pages/Predicaments';
import ViewUsers from './pages/ViewUsers';
import axios from 'axios';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';


/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    
    <Router>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
            <Route path="/Create" component={Create} exact/>
            <Route path="/Suggestions" component={Suggestions} exact/>
            <Route path="/Predicaments" component={Predicaments} exact/>
            <Route path="/Track" component={Track} exact/>
            <Route path="/Questionaire" component={Questionaire} exact />
            <Route path="/Login" component={Login} exact />
            <Route path="/Profile" component={Profile} exact />
            <Route path="/ViewUsers" component={ViewUsers} exact />
            <Redirect exact from="/" to="/Login" />
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </Router>
  );
};

export default App;
