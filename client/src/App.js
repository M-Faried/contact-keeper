import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import { ContactContextProvider } from './context/ContactContext';
import './App.css';
import Navbar from './components/layout/Navbar';

const App = () => {
  return (
    <ContactContextProvider>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ContactContextProvider>
  );
};

export default App;
