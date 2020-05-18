import React, { useState, createContext } from 'react';
import * as uuid from 'uuid';

export const AlertContext = createContext();

export const AlertContextProvider = (props) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = (msg, type, timeout = 4000) => {
    const alert = { id: uuid.v4(), msg, type };
    setAlerts([...alerts, alert]);
    setTimeout(
      () => setAlerts(alerts.filter((a) => a.id !== alert.id)),
      timeout
    );
  };

  const services = { alerts, showAlert };
  return (
    <AlertContext.Provider value={services}>
      {props.children}
    </AlertContext.Provider>
  );
};
