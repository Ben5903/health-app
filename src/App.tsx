import React, { useContext, useEffect, useState } from 'react';
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
import axios from 'axios';
import Settings from './pages/Settings';
import { ThemeContext } from './contexts/ThemeContext';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [theme, setTheme] = useState('dark');
  const [colorPreset, setColorPreset] = useState('preset1');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colorPreset, setColorPreset }}>
      <div className={`${theme} ${colorPreset}`}>
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
                  <Route path="/Settings" component={Settings} exact />
                  <Redirect exact from="/" to="/Login" />
                </IonRouterOutlet>
              </IonSplitPane>
            </IonReactRouter>
          </IonApp>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
