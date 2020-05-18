import React, { useContext, Fragment } from 'react';
import { AlertContext } from '../../context/AlertContext';

const Alerts = () => {
  const { alerts } = useContext(AlertContext);

  return (
    <Fragment>
      {alerts.length > 0 &&
        alerts.map((item) => (
          <div key={item.id} className={`alert alert-${item.type}`}>
            <i className='fas fa-info-circle' /> {item.msg}
          </div>
        ))}
    </Fragment>
  );
};

export default Alerts;
