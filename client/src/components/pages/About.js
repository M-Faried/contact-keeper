import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About This App</h1>
      <p className='my-1'>
        This is a full stack REACT app for keeping contacts.
      </p>
      <p>
        Developer's Portfolio & Contacts:{' '}
        <a href='https://m-faried.github.io/m-faried-portfolio/' target='blank'>
          https://m-faried.github.io/m-faried-portfolio/
        </a>
      </p>
      <br />
      <p>
        <strong>Version:</strong> 1.0.0
      </p>
    </div>
  );
};

export default About;
