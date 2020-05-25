import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt='Loading...'
      style={{
        width: '200px',
        margin: 'auto',
        display: 'block',
        marginTop: '2rem',
      }}
    />
  </Fragment>
);

export default Spinner;
