import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';

import About from './components/pages/About';
import Home from './components/pages/Home';
import Register from './components/user/Register';

import { ContactContextProvider } from './context/ContactContext';
import { UserContextProvider } from './context/UserContext';
import { AlertContextProvider } from './context/AlertContext';

import './App.css';

const App = () => {
  return (
    <UserContextProvider>
      <ContactContextProvider>
        <AlertContextProvider>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  {/* <PrivateRoute exact path='/' component={Home} /> */}
                  <Route exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertContextProvider>
      </ContactContextProvider>
    </UserContextProvider>
  );
};

export default App;
